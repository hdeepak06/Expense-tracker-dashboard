/* ==========================================================
   Expense Tracker Dashboard - Vanilla JavaScript
   Beginner-friendly, clean and well-commented code
   ========================================================== */

// 1. DOM Elements Selection
const balanceEl = document.getElementById('total-balance');
const incomeEl = document.getElementById('total-income');
const expenseEl = document.getElementById('total-expense');

const transactionForm = document.getElementById('transaction-form');
const editIdInput = document.getElementById('edit-id');
const titleInput = document.getElementById('title');
const amountInput = document.getElementById('amount');
const typeInput = document.getElementById('type');
const categoryInput = document.getElementById('category');
const dateInput = document.getElementById('date');

const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const formHeading = document.getElementById('form-heading');

const transactionList = document.getElementById('transaction-list');
const emptyState = document.getElementById('empty-state');
const transactionCount = document.getElementById('transaction-count');

const searchInput = document.getElementById('search-input');
const filterType = document.getElementById('filter-type');
const filterCategory = document.getElementById('filter-category');

// Error message elements
const titleError = document.getElementById('title-error');
const amountError = document.getElementById('amount-error');
const typeError = document.getElementById('type-error');
const categoryError = document.getElementById('category-error');
const dateError = document.getElementById('date-error');

// 2. Initial Sample Data (for first-time visitors)
const sampleTransactions = [
    {
        id: 1,
        title: 'Monthly Salary',
        amount: 2500,
        type: 'income',
        category: 'Salary',
        date: '2026-09-01'
    },
    {
        id: 2,
        title: 'Grocery Supermarket',
        amount: 145.50,
        type: 'expense',
        category: 'Food',
        date: '2026-09-05'
    },
    {
        id: 3,
        title: 'Electricity Bill',
        amount: 85.00,
        type: 'expense',
        category: 'Bills',
        date: '2026-09-12'
    },
    {
        id: 4,
        title: 'Train Pass',
        amount: 60.00,
        type: 'expense',
        category: 'Travel',
        date: '2026-09-18'
    }
];

// 3. Transactions Array State
// Load from LocalStorage if available; otherwise use sample data
let transactions = [];
const storedTransactions = localStorage.getItem('expense_tracker_transactions');

if (storedTransactions !== null) {
    try {
        transactions = JSON.parse(storedTransactions);
    } catch (e) {
        transactions = [];
    }
} else {
    // First time opening app: load sample transactions
    transactions = sampleTransactions;
    saveToLocalStorage();
}

// 4. Save to LocalStorage Helper
function saveToLocalStorage() {
    localStorage.setItem('expense_tracker_transactions', JSON.stringify(transactions));
}

// Set today's date as default in date input
function setDefaultDate() {
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
}

// 5. Calculate and Update Dashboard Summary (Balance, Income, Expense)
function updateSummary() {
    let totalIncome = 0;
    let totalExpense = 0;

    for (let i = 0; i < transactions.length; i++) {
        const item = transactions[i];
        if (item.type === 'income') {
            totalIncome += parseFloat(item.amount);
        } else if (item.type === 'expense') {
            totalExpense += parseFloat(item.amount);
        }
    }

    const totalBalance = totalIncome - totalExpense;

    // Display formatted amounts
    incomeEl.textContent = `+$${totalIncome.toFixed(2)}`;
    expenseEl.textContent = `-$${totalExpense.toFixed(2)}`;

    if (totalBalance >= 0) {
        balanceEl.textContent = `$${totalBalance.toFixed(2)}`;
        balanceEl.style.color = '#1e293b';
    } else {
        balanceEl.textContent = `-$${Math.abs(totalBalance).toFixed(2)}`;
        balanceEl.style.color = '#ef4444';
    }
}

// 6. Clear All Validation Errors
function clearErrors() {
    titleError.textContent = '';
    amountError.textContent = '';
    typeError.textContent = '';
    categoryError.textContent = '';
    dateError.textContent = '';
}

// 7. Form Validation
function validateForm(title, amount, type, category, date) {
    clearErrors();
    let isValid = true;

    if (!title || title.trim() === '') {
        titleError.textContent = 'Transaction title is required';
        isValid = false;
    }

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
        amountError.textContent = 'Please enter a valid amount greater than 0';
        isValid = false;
    }

    if (!type) {
        typeError.textContent = 'Please select a transaction type';
        isValid = false;
    }

    if (!category) {
        categoryError.textContent = 'Please select a category';
        isValid = false;
    }

    if (!date) {
        dateError.textContent = 'Please select a valid date';
        isValid = false;
    }

    return isValid;
}

// 8. Render Transactions List (Handles Search & Filter)
function renderTransactions() {
    // 1. Update summary cards
    updateSummary();

    // 2. Get filter and search values
    const searchTerm = searchInput.value.trim().toLowerCase();
    const selectedType = filterType.value;
    const selectedCategory = filterCategory.value;

    // 3. Filter transactions
    const filtered = transactions.filter(function (item) {
        // Search by title
        const matchesSearch = item.title.toLowerCase().includes(searchTerm);

        // Filter by type
        const matchesType = (selectedType === 'all') || (item.type === selectedType);

        // Filter by category
        const matchesCategory = (selectedCategory === 'all') || (item.category === selectedCategory);

        return matchesSearch && matchesType && matchesCategory;
    });

    // 4. Update count badge
    transactionCount.textContent = `${filtered.length} item${filtered.length === 1 ? '' : 's'}`;

    // 5. Clear current table rows
    transactionList.innerHTML = '';

    // 6. Check for empty state
    if (filtered.length === 0) {
        emptyState.classList.add('active');
    } else {
        emptyState.classList.remove('active');

        // 7. Loop through and create table rows
        filtered.forEach(function (item) {
            const row = document.createElement('tr');

            // Format amount display with + or -
            const isIncome = item.type === 'income';
            const sign = isIncome ? '+' : '-';
            const amountClass = isIncome ? 'amount-income' : 'amount-expense';
            const typeBadgeClass = isIncome ? 'type-income' : 'type-expense';

            row.innerHTML = `
                <td><strong>${escapeHtml(item.title)}</strong></td>
                <td><span class="category-badge">${escapeHtml(item.category)}</span></td>
                <td>${item.date}</td>
                <td><span class="type-badge ${typeBadgeClass}">${item.type}</span></td>
                <td class="${amountClass}">${sign}$${parseFloat(item.amount).toFixed(2)}</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-edit" onclick="editTransaction(${item.id})">Edit</button>
                    <button class="btn btn-sm btn-delete" onclick="deleteTransaction(${item.id})">Delete</button>
                </td>
            `;

            transactionList.appendChild(row);
        });
    }
}

// Helper to escape HTML and prevent simple XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 9. Add or Update Transaction
function handleFormSubmit(e) {
    e.preventDefault();

    const title = titleInput.value;
    const amount = amountInput.value;
    const type = typeInput.value;
    const category = categoryInput.value;
    const date = dateInput.value;
    const editId = editIdInput.value;

    // Validate inputs
    if (!validateForm(title, amount, type, category, date)) {
        return;
    }

    if (editId) {
        // --- EDIT EXISTING TRANSACTION ---
        const idToFind = Number(editId);
        const index = transactions.findIndex(item => item.id === idToFind);

        if (index !== -1) {
            transactions[index] = {
                id: idToFind,
                title: title.trim(),
                amount: parseFloat(amount),
                type: type,
                category: category,
                date: date
            };
        }
        resetForm();
    } else {
        // --- ADD NEW TRANSACTION ---
        const newTransaction = {
            id: Date.now(), // Simple unique ID using timestamp
            title: title.trim(),
            amount: parseFloat(amount),
            type: type,
            category: category,
            date: date
        };

        // Add to beginning of array so newest shows first
        transactions.unshift(newTransaction);
        resetForm();
    }

    // Save and re-render
    saveToLocalStorage();
    renderTransactions();
}

// 10. Edit Transaction
function editTransaction(id) {
    const transaction = transactions.find(item => item.id === id);
    if (!transaction) return;

    // Fill form with existing values
    editIdInput.value = transaction.id;
    titleInput.value = transaction.title;
    amountInput.value = transaction.amount;
    typeInput.value = transaction.type;
    categoryInput.value = transaction.category;
    dateInput.value = transaction.date;

    // Change UI to Edit Mode
    formHeading.textContent = 'Edit Transaction';
    submitBtn.textContent = 'Update Transaction';
    cancelBtn.classList.remove('hidden');

    // Scroll to form smoothly
    document.getElementById('add-transaction').scrollIntoView({ behavior: 'smooth' });
}

// 11. Cancel Edit Mode
function resetForm() {
    transactionForm.reset();
    editIdInput.value = '';
    setDefaultDate();
    clearErrors();

    // Reset UI to Add Mode
    formHeading.textContent = 'Add New Transaction';
    submitBtn.textContent = 'Add Transaction';
    cancelBtn.classList.add('hidden');
}

// 12. Delete Transaction
function deleteTransaction(id) {
    const shouldDelete = confirm('Are you sure you want to delete this transaction?');
    if (!shouldDelete) return;

    // Filter out the selected transaction
    transactions = transactions.filter(item => item.id !== id);

    // If currently editing this item, cancel edit mode
    if (Number(editIdInput.value) === id) {
        resetForm();
    }

    // Save and re-render
    saveToLocalStorage();
    renderTransactions();
}

// 13. Event Listeners
document.addEventListener('DOMContentLoaded', function () {
    setDefaultDate();
    renderTransactions();
});

transactionForm.addEventListener('submit', handleFormSubmit);
cancelBtn.addEventListener('click', resetForm);

// Search and filter event listeners
searchInput.addEventListener('input', renderTransactions);
filterType.addEventListener('change', renderTransactions);
filterCategory.addEventListener('change', renderTransactions);
