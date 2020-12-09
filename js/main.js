"use strict";

let start = document.getElementById('start'),
    data = document.querySelector('.data'),
    cancel = document.getElementById('cancel'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = document.querySelector('.income_add'),
    expensesPlus = document.querySelector('.expenses_add'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    depositCheck = document.querySelector('#deposit-check'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    accumulatedMonthValue = document.getElementsByClassName('accumulated_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpenses = document.querySelector('.additional-expenses'),
    periodSelect = document.querySelector('.period-select'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    incomeItems = document.querySelectorAll('.income-items'),
    periodAmount = document.querySelector('.period-amount');

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

const AppData = function () {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.incomeMonth = 0;
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.expensesMonth = 0;
    this.addExpenses = [];
    this.deposit = false;
    this.persentDeposit = 0;
    this.moneyDeposit = 0;
};

AppData.prototype.start = function () {
    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.showResult();
};

AppData.prototype.showResult = function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.ceil(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();

    periodSelect.addEventListener('input', function () {
        incomePeriodValue.value = this.calcPeriod();
    });
};

AppData.prototype.addExpensesBlock = function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelector('.expenses-title').value = '';
    cloneExpensesItem.querySelector('.expenses-amount').value = '';
    expensesPlus.insertAdjacentElement('beforebegin', cloneExpensesItem);
    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
        expensesPlus.style.display = 'none'
    }
};

AppData.prototype.addIncomeBlock = function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.querySelector('.income-title').value = '';
    cloneIncomeItem.querySelector('.income-amount').value = '';
    incomePlus.insertAdjacentElement('beforebegin', cloneIncomeItem);
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
        incomePlus.style.display = 'none'
    }
};

AppData.prototype.getExpenses = function () {
    expensesItems.forEach(item => {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashEppenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashEppenses !== '') {
            this.expenses[itemExpenses] = cashEppenses;
        }
    })
};

AppData.prototype.getIncome = function () {
    incomeItems.forEach(item => {
        let incomText = item.querySelector('.income-title').value;
        let incomNumber = item.querySelector('.income-amount').value;
        if (incomText !== '' && incomNumber !== '') {
            this.income[incomText] = incomNumber;
        }
    });

    for (let key in this.income) {
        this.incomeMonth += +this.income[key]
    }
};

AppData.prototype.getAddExpenses = function () {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(item => {
        item = item.trim();
        if (item !== '') {
            this.addExpenses.push(item);
        }
    })
};

AppData.prototype.getAddIncome = function () {
    additionalIncomeItem.forEach(item => {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
            this.addIncome.push(itemValue)
        }
    });
};

AppData.prototype.getExpensesMonth = function () {
    for (let key in this.expenses) {
        this.expensesMonth += +this.expenses[key];
    }
};

AppData.prototype.getBudget = function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = this.budgetMonth / 30;
};

AppData.prototype.getAccumulatedMonth = function () {
    return money - this.expensesMonth
};

AppData.prototype.getTargetMonth = function () {
    return targetAmount.value / this.budgetMonth;
};

AppData.prototype.calcPeriod = function () {
    return this.budgetMonth * periodSelect.value;
};

AppData.prototype.reset = function () {
    data.querySelectorAll('[type = "text"]').forEach(item => {
        item.disabled = false
    });

    document.querySelectorAll('[type = "text"]').forEach(item => {
        item.value = '';
    });
    periodSelect.value = 1;
    periodAmount.textContent = periodSelect.value;
    depositCheck.checked = false;
};

AppData.prototype.eventsListeners = function () {

    //Можно вводить только цифры
    salaryAmount.addEventListener('input', function (e) {
        this.value = this.value.replace(/[^0-9\.]/g, '');
    });
    targetAmount.addEventListener('input', function (e) {
        this.value = this.value.replace(/[^0-9\.]/g, '');
    });
    document.querySelectorAll('.income-amount').forEach(function (item) {
        item.addEventListener('input', function (e) {
            this.value = this.value.replace(/[^0-9\.]/g, '');
        });
    });
    document.querySelectorAll('.expenses-amount').forEach(function (item) {
        item.addEventListener('input', function (e) {
            this.value = this.value.replace(/[^0-9\.]/g, '');
        });
    })

    //Можно вводить только буквы
    additionalExpensesItem.addEventListener('input', function (e) {
        this.value = this.value.replace(/[^а-яА-Я\., ]/g, '');
    });
    document.querySelectorAll('.income-title').forEach(function (item) {
        item.addEventListener('input', function (e) {
            this.value = this.value.replace(/[^а-яА-Я\., ]/g, '');
        });
    });
    additionalIncomeItem.forEach(function (item) {
        item.addEventListener('input', function (e) {
            this.value = this.value.replace(/[^а-яА-Я\., ]/g, '');
        });
    });
    document.querySelectorAll('.expenses-title').forEach(function (item) {
        item.addEventListener('input', function (e) {
            this.value = this.value.replace(/[^а-яА-Я\., ]/g, '');
        });
    });

    const _this = this;

    //Отслеживание кликов
    start.addEventListener('click', function () {
        _this.start();
        start.style.display = 'none';
        cancel.style.display = 'block';
        data.querySelectorAll('[type = "text"]').forEach(item => {
            item.disabled = true
        });
    }
    );
    cancel.addEventListener('click', function () {
        _this.reset();
        start.style.display = 'block';
        cancel.style.display = 'none';
    })
    expensesPlus.addEventListener('click', _this.addExpensesBlock);
    incomePlus.addEventListener('click', _this.addIncomeBlock);
    periodSelect.addEventListener('input', function () {
        periodAmount.textContent = periodSelect.value
    });
};

AppData.prototype.disBtn = function () {
    start.disabled = true;
    start.style.backgroundColor = "#a7adb6";

    salaryAmount.addEventListener('input', function () {
        if (salaryAmount.value === '') {
            start.disabled = true;
            start.style.backgroundColor = "#a7adb6";
        } else {
            start.disabled = false;
            start.style.backgroundColor = "#353a43";
        }
    });
};

const appData = new AppData();
appData.eventsListeners();
appData.disBtn();
