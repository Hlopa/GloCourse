"use strict";


let start = document.getElementById('start'),
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
    incomeItem = document.querySelectorAll('.income-items');


let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}


let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    incomeMonth: 0,
    income: {},
    addIncome: [],
    expenses: {},
    expensesMonth: 0,
    addExpenses: [],
    deposit: false,
    persentDeposit: 0,
    moneyDeposit: 0,
    start: function () {       //совпадает
        if (salaryAmount.value === '') {
            alert('Ошибка, поле "Месячный доход" обязательно для заполнения');
            return
        }
        appData.budget = +salaryAmount.value;
        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();

        appData.showResult();
    },
    showResult: function () {  //совпадает
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        incomePeriodValue.value = appData.calcPeriod();
    },
    addExpensesBlock: function () {  //совпадает
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesPlus.insertAdjacentElement('beforebegin', cloneExpensesItem);
        expensesItems = document.querySelectorAll('.expenses-items');

        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none'
        }
    },
    getExpenses: function () {    //совпадает, получаем все расходы и записываем в объект expenses
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashEppenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashEppenses !== '') {
                appData.expenses[itemExpenses] = cashEppenses;
            }
        });
    },
    getIncome: function () { //домашнее задание
        if (confirm('Есть ли у вас дополнительный источник заработка?')) {
            let itemIncome = prompt('Какой у вас дополнительный заработок?', 'репетиторство');
            let cashIncome = prompt('Сколько вы на этом зарабатываете в месяц?', 10000);
            appData.income[itemIncome] = cashIncome;
        }

        for (let key in appData.income) {
            appData.incomeMonth += +appData.income[key]
        }
    },
    getAddExpenses: function () { //совпадает, выводим возхможные расходы
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        })
    },
    getAddIncome: function () {   //совпадает
        additionalIncomeItem.forEach(function (item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue)
            }
        });
    },
    getExpensesMonth: function () {  //совпадает, рассчитываем расходы за месяц
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
    },
    getBudget: function () { // совпадает
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth / 30;
    },
    getAccumulatedMonth: function () {
        return money - appData.expensesMonth
    },
    getTargetMonth: function () { //совпадает
        return targetAmount.value / appData.budgetMonth;
    },
    getStatusIncome: function () {  //совпаадет
        if (appData.budgetDay >= 1200) {
            return ("У вас высокий уровень дохода")
        } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
            return ("У вас средний уровень дохода")
        } else if (appData.budgetDay < 600 && appData.budgetDay >= 0) {
            return ("К сожалению у вас уровень дохода ниже среднего")
        } else if (appData.budgetDay < 0) {
            return ("Ваши расходы превышают доходы")
        }
        else {
            return ("Что-то пошло не так");
        }
    },
    returnTargetMonth: function () {
        let result = '';
        if (targetMonth === Infinity) {
            result = `Ваши доходы равны расходам. Цель не может быть достигнута`
        }
        else if (targetMonth >= 0) {
            result = `Достигнете цели за ${targetMonth} месяцев`
        } else {
            result = `Ваши расходы превышают доходы. Цель не может быть достигнута`
        }
        return result
    },
    getInfoDeposit: function () { //совпадает
        appData.deposit = confirm("Есть ли у вас депозит в банке?");
        if (appData.deposit) {
            appData.persentDeposit = prompt('Какой годовой процент депозита?', 10);
            while (!isNumber(appData.persentDeposit)) {
                appData.persentDeposit = prompt('Какой годовой процент депозита?', 10);
            }
            appData.moneyDeposit = prompt('Какая сумма заложена?', 20000);
            while (!isNumber(appData.moneyDeposit)) {
                appData.moneyDeposit = prompt('Какая сумма заложена?', 20000);
            }
        }
    },
    calcPeriod: function () { //совпадает
        return appData.budgetMonth * periodSelect.value;
    }
};

//нажатие кнопки рассчитать

start.addEventListener('click', appData.start);

expensesPlus.addEventListener('click', appData.addExpensesBlock);



//Вывод в консоль возможных расходов в виде строки, с заглавной буквы

// function UpperCase(arr) {
//     let res = [];
//     for (let item of arr) {
//         if (item[0] === ' ') {
//             item = item[1].toUpperCase() + item.slice(2);
//         } else {
//             item = item[0].toUpperCase() + item.slice(1);
//         }
//         res.push(item);
//     }
//     return res.join(', ')
// }
