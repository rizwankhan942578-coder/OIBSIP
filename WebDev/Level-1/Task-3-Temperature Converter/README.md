# 🌡️ Temperature Converter

A modern, fast, and responsive web application built using **HTML5**, **CSS3**, and **Vanilla JavaScript**. The application allows users to convert temperatures seamlessly between **Celsius (°C)**, **Fahrenheit (°F)**, and **Kelvin (K)** with real-time input validation and absolute zero safeguards.

---

## ✨ Features

- **Multi-Unit Conversions**: Simultaneously calculates and displays results for Celsius, Fahrenheit, and Kelvin.
- **Real-Time Calculation**: Results update dynamically as you type.
- **Input Validation & Error Alerts**:
  - Handles empty inputs with helpful prompt messages.
  - Rejects non-numeric/invalid input strings.
  - Enforces physical **Absolute Zero** boundaries for all temperature units.
- **Modern & Responsive UI**:
  - Centered card layout with custom CSS styling and ambient background glow.
  - Visual badges for active input units and dynamic highlight cards.
  - Responsive design optimized for mobile phones, tablets, and desktop displays.
- **Accessibility & UX**:
  - Accessible ARIA live regions (`aria-live="polite"`, `aria-live="assertive"`).
  - Screen reader friendly forms with explicit labels and focus indicators.
  - Keyboard accessible with `Tab` and `Enter` key support.
- **Zero Dependencies**: Pure web standards without React, Next.js, Bootstrap, Tailwind, jQuery, or external libraries. Works completely offline.

---

## 📁 Project Structure

```
temperature-converter/
│
├── index.html     # Semantic HTML5 markup and accessibility structure
├── style.css      # Custom CSS design system, typography, and layout styling
├── script.js      # Vanilla JavaScript conversion logic & validation rules
└── README.md      # Comprehensive project documentation
```

---

## 📐 Conversion Formulas

| From | To | Formula |
|---|---|---|
| **Celsius (°C)** | **Fahrenheit (°F)** | `°F = (°C × 9/5) + 32` |
| **Celsius (°C)** | **Kelvin (K)** | `K = °C + 273.15` |
| **Fahrenheit (°F)** | **Celsius (°C)** | `°C = (°F - 32) × 5/9` |
| **Fahrenheit (°F)** | **Kelvin (K)** | `K = (°F - 32) × 5/9 + 273.15` |
| **Kelvin (K)** | **Celsius (°C)** | `°C = K - 273.15` |
| **Kelvin (K)** | **Fahrenheit (°F)** | `°F = (K - 273.15) × 9/5 + 32` |

---

## ❄️ Absolute Zero Thresholds

The physical lower limit of temperature is Absolute Zero. Inputs lower than these values trigger an error message (`"Temperature cannot be below absolute zero."`):

- **Celsius**: `-273.15 °C`
- **Fahrenheit**: `-459.67 °F`
- **Kelvin**: `0 K`

---

## 🚀 Getting Started

No installation or build steps are required.

### Quick Start:
1. Clone or download this repository.
2. Open `index.html` directly in any standard browser (Chrome, Firefox, Edge, Safari).

### Running via Local HTTP Server (Optional):
```bash
# Using Python
python -m http.server 8080

# Or using Node serve
npx serve .
```
Navigate to `http://localhost:8080` in your web browser.

---

## 🧪 Test Cases

| Input Value | Unit Selected | Celsius (°C) | Fahrenheit (°F) | Kelvin (K) |
|---|---|---|---|---|
| `0` | Celsius | `0.00 °C` | `32.00 °F` | `273.15 K` |
| `25` | Celsius | `25.00 °C` | `77.00 °F` | `298.15 K` |
| `100` | Celsius | `100.00 °C` | `212.00 °F` | `373.15 K` |
| `-273.15` | Celsius | `-273.15 °C` | `-459.67 °F` | `0.00 K` |
| `32` | Fahrenheit | `0.00 °C` | `32.00 °F` | `273.15 K` |
| `0` | Kelvin | `-273.15 °C` | `-459.67 °F` | `0.00 K` |

---

## 🛠️ Built With

- **HTML5**: Semantic elements and ARIA attributes
- **CSS3**: CSS Custom Properties (variables), Flexbox, CSS Grid, and Keyframe animations
- **Vanilla JavaScript (ES6+)**: Event listeners, DOM manipulation, float formatting, and validation handling
