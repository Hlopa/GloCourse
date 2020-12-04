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
    incomeItems = document.querySelectorAll('.income-items'),
    periodAmount = document.querySelector('.period-amount');


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
    start: function () {   
        appData.budget = +salaryAmount.value;
        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();

        appData.showResult();
    },
    showResult: function () { 
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = Math.ceil(appData.budgetDay);
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        incomePeriodValue.value = appData.calcPeriod();
        
        periodSelect.addEventListener('input', function(){
            incomePeriodValue.value = appData.calcPeriod();
        } );
    },
    addExpensesBlock: function () { 
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.querySelector('.expenses-title').value = '';
        cloneExpensesItem.querySelector('.expenses-amount').value = '';
        expensesPlus.insertAdjacentElement('beforebegin', cloneExpensesItem);
        expensesItems = document.querySelectorAll('.expenses-items');

        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none'
        }
    },
    addIncomeBlock: function(){
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.querySelector('.income-title').value = '';
        cloneIncomeItem.querySelector('.income-amount').value = '';
        incomePlus.insertAdjacentElement('beforebegin', cloneIncomeItem);
        incomeItems = document.querySelectorAll('.income-items');

        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none'
        }
    },
    getExpenses: function () {
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashEppenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashEppenses !== '') {
                appData.expenses[itemExpenses] = cashEppenses;
            }
        });
    },
    getIncome: function () {
        incomeItems.forEach(function(item){
            let incomText = item.querySelector('.income-title').value;
            let incomNumber = item.querySelector('.income-amount').value;
            if(incomText !== '' && incomNumber !== ''){
                appData.income[incomText] = incomNumber;
            }
        });

        for (let key in appData.income) {
            appData.incomeMonth += +appData.income[key]
        }
    },
    getAddExpenses: function () {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        })
    },
    getAddIncome: function () { 
        additionalIncomeItem.forEach(function (item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue)
            }
        });
    },
    getExpensesMonth: function () {
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
    },
    getBudget: function () {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth / 30;
    },
    getAccumulatedMonth: function () {
        return money - appData.expensesMonth
    },
    getTargetMonth: function () {
        return targetAmount.value / appData.budgetMonth;
    },
    getStatusIncome: function () {
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
    getInfoDeposit: function () {
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
    calcPeriod: function () {
        return appData.budgetMonth * periodSelect.value;
    }
};

//функция блокировки кнопки

function disBtn(){
    start.disabled = true;
    start.style.backgroundColor = "#a7adb6";

    salaryAmount.addEventListener('input', function(){
    if(salaryAmount.value === ''){
        start.disabled = true;
        start.style.backgroundColor = "#a7adb6";
    } else {
        start.disabled = false;
        start.style.backgroundColor = "#353a43";
    }
});
}

disBtn();

//Можно вводить только цифры


salaryAmount.addEventListener('input', function(e){
    this.value = this.value.replace(/[^0-9\.]/g, '');
});

targetAmount.addEventListener('input', function(e){
    this.value = this.value.replace(/[^0-9\.]/g, '');
});

document.querySelectorAll('.income-amount').forEach(function(item){
    item.addEventListener('input', function(e){
        this.value = this.value.replace(/[^0-9\.]/g, '');
    });
});

document.querySelectorAll('.expenses-amount').forEach(function(item){
    item.addEventListener('input', function(e){
        this.value = this.value.replace(/[^0-9\.]/g, '');
    });
})

//Можно вводить только буквы

additionalExpensesItem.addEventListener('input', function(e){
    this.value = this.value.replace(/[^а-яА-Я\., ]/g, '');
});


document.querySelectorAll('.income-title').forEach(function(item){
    item.addEventListener('input', function(e){
        this.value = this.value.replace(/[^а-яА-Я\., ]/g, '');
    });
});


additionalIncomeItem.forEach(function(item){
    item.addEventListener('input', function(e){
        this.value = this.value.replace(/[^а-яА-Я\., ]/g, '');
    });
});

document.querySelectorAll('.expenses-title').forEach(function(item){
    item.addEventListener('input', function(e){
        this.value = this.value.replace(/[^а-яА-Я\., ]/g, '');
    });
});


//отслеживание клика

start.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', function(){
    periodAmount.textContent = periodSelect.value
} );




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
