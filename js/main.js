"use strict";

let start = document.getElementById('start'),
    data = document.querySelector('.data'),
    cancel = document.getElementById('cancel'),
    income = document.querySelector('.income'),
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

const isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

class AppData {
    constructor() {
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
    }

    start() {
        this.budget = +salaryAmount.value;
        this.getExpInc();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.showResult();
    }

    showResult() {
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
    }

    addPlusBlock(e) {
        const startName = e.target.parentElement.className;
        const cloneItem = (e.target.previousElementSibling).cloneNode(true);
        cloneItem.querySelector(`.${startName}-title`).value = '';
        cloneItem.querySelector(`.${startName}-amount`).value = '';
        (e.target).insertAdjacentElement('beforebegin', cloneItem);

        let check = document.querySelectorAll(`.${startName}-items`);
        if (check.length === 3) {
            (e.target).style.display = 'none'
        }
    }

    getExpInc() {
        const count = item => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if (itemTitle !== '' && itemAmount !== '') {
                this[startStr][itemTitle] = itemAmount;
            }
        }
        incomeItems.forEach(count);
        expensesItems.forEach(count);

        for (const key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }

    getAddExpenses() {
        const addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(item => {
            console.log(typeof item, item.className)
            if (item !== '') {
                this.addExpenses.push(item);
            }
        })
    }

    getAddIncome() {
        additionalIncomeItem.forEach(item => {
            console.log(typeof item, item.className)
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue)
            }
        });
    }

    getExpensesMonth() {
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    }

    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = this.budgetMonth / 30;
    }

    getAccumulatedMonth() {
        return money - this.expensesMonth
    }

    getTargetMonth() {
        return targetAmount.value / this.budgetMonth;
    }

    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    }

    reset() {
        data.querySelectorAll('[type = "text"]').forEach(item => {
            item.disabled = false
        });

        document.querySelectorAll('[type = "text"]').forEach(item => {
            item.value = '';
        });
        periodSelect.value = 1;
        periodAmount.textContent = periodSelect.value;
        depositCheck.checked = false;
    }

    eventsListeners() {
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
        expensesPlus.addEventListener('click', _this.addPlusBlock);
        incomePlus.addEventListener('click', _this.addPlusBlock);
        periodSelect.addEventListener('input', function () {
            periodAmount.textContent = periodSelect.value
        });
    }

    disBtn() {
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
    }
};


const appData = new AppData();
appData.eventsListeners();
appData.disBtn();
