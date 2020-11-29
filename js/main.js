"use strict";

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

let money;

let start = function () {
    let moneyStr;
    do {
        moneyStr = prompt("Ваш месячный доход?");
        money = +moneyStr;
    }
    while (!isNumber(moneyStr));
}

start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 3,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function () {
        let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
        appData.addExpenses = addExpenses.toLocaleLowerCase().split(',');
        appData.deposit = confirm("Есть ли у вас депозит в банке?");
        for (let i = 0; i < 2; i++) {
            let answer = prompt("Введите обязательную статью расходов");
            appData.expenses[answer] = prompt("Во сколько это обойдется?");
            while (!isNumber(appData.expenses[answer])) {
                appData.expenses[answer] = prompt("Во сколько это обойдется?")
            }
        }
    },
    getExpensesMonth: function () {
        let sum = 0;
        for (let key in appData.expenses) {
            sum += +appData.expenses[key]
        }
        return sum;
    },

    getAccumulatedMonth: function () {
        return money - appData.expensesMonth
    },
    getTargetMonth: function () {
        return Math.floor(appData.mission / accumulatedMonth);
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
    }
};

appData.asking();


let expensesMonth = appData.getExpensesMonth();
let accumulatedMonth = appData.getAccumulatedMonth();
appData.budgetDay = Math.floor(accumulatedMonth / 30);
let targetMonth = appData.getTargetMonth();


//Выводим в консоль

console.log(`Ваш доход в месяц ${appData.budget} руб`);
console.log(`Обязательные расходы расходы за месяц: ${expensesMonth} руб`);
console.log(appData.returnTargetMonth());

