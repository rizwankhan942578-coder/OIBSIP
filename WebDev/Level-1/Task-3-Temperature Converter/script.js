/* ==========================================================================
   Temperature Converter - Vanilla JavaScript Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Element References ---
  const tempInput = document.getElementById('temp-input');
  const unitSelect = document.getElementById('unit-select');
  const inputUnitBadge = document.getElementById('input-unit-badge');
  const converterForm = document.getElementById('converter-form');
  const errorMessage = document.getElementById('error-message');
  const errorText = document.getElementById('error-text');
  const convertBtn = document.getElementById('convert-btn');
  const clearBtn = document.getElementById('clear-btn');

  // Result Elements
  const celsiusResult = document.getElementById('celsius-result');
  const fahrenheitResult = document.getElementById('fahrenheit-result');
  const kelvinResult = document.getElementById('kelvin-result');

  const cardCelsius = document.getElementById('card-celsius');
  const cardFahrenheit = document.getElementById('card-fahrenheit');
  const cardKelvin = document.getElementById('card-kelvin');

  // State Tracking
  let hasInteracted = false;

  // --- Constants & Thresholds ---
  const UNIT_SYMBOLS = {
    celsius: '°C',
    fahrenheit: '°F',
    kelvin: 'K'
  };

  const ABSOLUTE_ZERO = {
    celsius: -273.15,
    fahrenheit: -459.67,
    kelvin: 0
  };

  /**
   * Updates the unit badge inside the temperature input field
   * and highlights the corresponding result card.
   */
  function updateUnitBadge() {
    const selectedUnit = unitSelect.value;
    inputUnitBadge.textContent = UNIT_SYMBOLS[selectedUnit] || '°C';
    updateActiveCardHighlight(selectedUnit);
  }

  /**
   * Highlights the card matching the current selected input unit.
   * @param {string} selectedUnit 
   */
  function updateActiveCardHighlight(selectedUnit) {
    [cardCelsius, cardFahrenheit, cardKelvin].forEach(card => {
      if (card) {
        if (card.dataset.unit === selectedUnit) {
          card.classList.add('active-unit');
        } else {
          card.classList.remove('active-unit');
        }
      }
    });
  }

  /**
   * Validates temperature input against emptiness, numeric format, and absolute zero threshold.
   * @param {string} rawValue - Raw text from input
   * @param {string} unit - Current unit ('celsius' | 'fahrenheit' | 'kelvin')
   * @returns {{ valid: boolean, error?: string, value?: number }}
   */
  function validateInput(rawValue, unit) {
    const trimmed = rawValue.trim();

    // Check if input is empty
    if (trimmed === '') {
      return {
        valid: false,
        error: 'Please enter a temperature.'
      };
    }

    // Check if input is a valid number
    const num = Number(trimmed);
    if (isNaN(num) || !isFinite(num)) {
      return {
        valid: false,
        error: 'Please enter a valid numeric temperature.'
      };
    }

    // Check absolute zero limit
    const minTemp = ABSOLUTE_ZERO[unit];
    if (minTemp !== undefined && num < minTemp) {
      return {
        valid: false,
        error: 'Temperature cannot be below absolute zero.'
      };
    }

    return {
      valid: true,
      value: num
    };
  }

  /**
   * Converts a valid numeric temperature from a given unit to Celsius, Fahrenheit, and Kelvin.
   * @param {number} value 
   * @param {string} fromUnit 
   * @returns {{ celsius: string, fahrenheit: string, kelvin: string }}
   */
  function convertTemperature(value, fromUnit) {
    let celsius, fahrenheit, kelvin;

    switch (fromUnit) {
      case 'celsius':
        celsius = value;
        fahrenheit = (value * 9 / 5) + 32;
        kelvin = value + 273.15;
        break;

      case 'fahrenheit':
        celsius = (value - 32) * 5 / 9;
        fahrenheit = value;
        kelvin = (value - 32) * 5 / 9 + 273.15;
        break;

      case 'kelvin':
        celsius = value - 273.15;
        fahrenheit = (value - 273.15) * 9 / 5 + 32;
        kelvin = value;
        break;

      default:
        celsius = 0;
        fahrenheit = 0;
        kelvin = 0;
    }

    return {
      celsius: formatTemperature(celsius),
      fahrenheit: formatTemperature(fahrenheit),
      kelvin: formatTemperature(kelvin)
    };
  }

  /**
   * Formats numbers to 2 decimal places and handles negative zero precision edge cases.
   * @param {number} val 
   * @returns {string}
   */
  function formatTemperature(val) {
    // Correct -0.00 rounding issues from float precision
    let rounded = Math.abs(val) < 1e-9 ? 0 : val;
    let formatted = rounded.toFixed(2);
    if (formatted === '-0.00') {
      formatted = '0.00';
    }
    return formatted;
  }

  /**
   * Displays validation error message and updates accessibility attributes.
   * @param {string} message 
   */
  function showError(message) {
    errorText.textContent = message;
    errorMessage.classList.remove('hidden');
    tempInput.classList.add('input-error');
    tempInput.setAttribute('aria-invalid', 'true');
    resetResultsDisplay();
  }

  /**
   * Clears error message box and resets input error styles.
   */
  function clearError() {
    errorMessage.classList.add('hidden');
    tempInput.classList.remove('input-error');
    tempInput.setAttribute('aria-invalid', 'false');
  }

  /**
   * Updates result cards with converted values and triggers update animation.
   * @param {{ celsius: string, fahrenheit: string, kelvin: string }} results 
   */
  function displayResults(results) {
    updateResultValue(celsiusResult, results.celsius);
    updateResultValue(fahrenheitResult, results.fahrenheit);
    updateResultValue(kelvinResult, results.kelvin);
  }

  /**
   * Helper to set text and apply micro-animation to result value elements.
   * @param {HTMLElement} element 
   * @param {string} value 
   */
  function updateResultValue(element, value) {
    if (element) {
      element.textContent = value;
      element.classList.remove('updated');
      // Trigger reflow to restart CSS animation
      void element.offsetWidth;
      element.classList.add('updated');
    }
  }

  /**
   * Resets result cards to placeholder state '--'.
   */
  function resetResultsDisplay() {
    [celsiusResult, fahrenheitResult, kelvinResult].forEach(el => {
      if (el) el.textContent = '--';
    });
  }

  /**
   * Performs conversion process if validation succeeds, or displays appropriate error.
   */
  function processConversion() {
    const rawValue = tempInput.value;
    const unit = unitSelect.value;
    const validation = validateInput(rawValue, unit);

    if (!validation.valid) {
      showError(validation.error);
    } else {
      clearError();
      const results = convertTemperature(validation.value, unit);
      displayResults(results);
    }
  }

  // --- Event Listeners ---

  // Real-time input typing handler
  tempInput.addEventListener('input', () => {
    hasInteracted = true;
    const rawValue = tempInput.value;

    if (rawValue.trim() === '') {
      // Clear errors & results when user completely clears input field
      clearError();
      resetResultsDisplay();
      return;
    }

    // Live validation & conversion as user types
    processConversion();
  });

  // Unit dropdown selection change handler
  unitSelect.addEventListener('change', () => {
    updateUnitBadge();
    
    // If input is non-empty or user has interacted, re-run conversion
    if (tempInput.value.trim() !== '' || hasInteracted) {
      if (tempInput.value.trim() !== '') {
        processConversion();
      }
    }
  });

  // Form submission handler (Convert Button / Enter key)
  converterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    hasInteracted = true;
    processConversion();
  });

  // Secondary Clear Button handler
  clearBtn.addEventListener('click', () => {
    tempInput.value = '';
    unitSelect.value = 'celsius';
    hasInteracted = false;

    updateUnitBadge();
    clearError();
    resetResultsDisplay();
    tempInput.focus();
  });

  // --- Initial Setup ---
  updateUnitBadge();
});
