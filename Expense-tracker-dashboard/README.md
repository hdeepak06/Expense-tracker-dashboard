# Expense Tracker Dashboard 💰

A clean, responsive, and beginner-friendly **Expense Tracker Dashboard** built using pure **HTML5, CSS3, and Vanilla JavaScript**.

Designed specifically as a personal portfolio project demonstrating core web fundamentals, DOM manipulation, responsive layouts, and browser storage.

---

## 🌟 Key Features

1. **Dashboard Summary Cards**:
   - **Total Balance**: Dynamically calculated as `Total Income - Total Expenses`.
   - **Total Income**: Sum of all incoming funds.
   - **Total Expenses**: Sum of all outgoing expenditures.
2. **Add & Edit Transactions**:
   - Add new transactions with title, amount, type (Income/Expense), category, and date.
   - Edit existing transactions with prefilled form data and a "Cancel Edit" option.
3. **Delete Transactions**:
   - Remove transactions with a confirmation prompt.
4. **Search & Real-time Filter**:
   - Search transactions by title (case-insensitive).
   - Filter by transaction type: *All Types*, *Income*, or *Expense*.
   - Filter by category: *Food*, *Travel*, *Shopping*, *Bills*, *Salary*, and *Other*.
5. **Persistent Storage (LocalStorage)**:
   - Data persists across browser refreshes and tabs.
   - Automatically loads initial sample transactions for first-time visitors.
6. **Form Validation**:
   - Ensures title is not empty.
   - Ensures amount is a positive number.
   - Requires valid selection for type, category, and date.
7. **Empty State Display**:
   - Shows a clean "No transactions found" card when no records match.
8. **100% Responsive Design**:
   - Handcrafted CSS Grid and Flexbox layouts.
   - Optimized for mobile screens, tablets, and desktop displays.

---

## 📁 Project Structure

```text
Expense Tracker Dashboard/
│
├── index.html          # Semantic HTML5 layout
├── css/
│   └── style.css       # Clean, modern CSS3 styling & responsive media queries
├── js/
│   └── script.js       # Vanilla JavaScript logic (CRUD, LocalStorage, filters)
├── images/
│   └── logo.svg        # Clean vector brand logo
└── README.md           # Project documentation
```

---

## 🚀 How to Run the Project

1. Simply locate and double-click `index.html` in your file explorer to open it directly in any modern browser (Google Chrome, Microsoft Edge, Firefox, Safari).
2. Alternatively, if using VS Code, right-click `index.html` and choose **"Open with Live Server"**.

---

## 💡 Concepts Used & Interview Talking Points

- **HTML5**: Semantic tags (`<nav>`, `<main>`, `<section>`, `<table>`, `<footer>`), forms, accessible input types.
- **CSS3**: CSS Custom Properties (`:root`), Flexbox for navigation and alignment, CSS Grid for dashboard cards and responsive layout, media queries (`@media`).
- **Vanilla JavaScript**:
  - `document.getElementById()` and `querySelector()` for DOM access.
  - `addEventListener()` for form submission, button clicks, search typing, and dropdown changes.
  - JavaScript array methods: `.filter()`, `.find()`, `.findIndex()`, `.unshift()`.
  - Browser `localStorage` API (`getItem` and `setItem`) with `JSON.stringify()` and `JSON.parse()`.
