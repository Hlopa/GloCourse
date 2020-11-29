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
    expenses: [],
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
        appData.addExpenses = addExpense.toLocaleLowerCase().split(',');
        appData.deposit = confirm("Есть ли у вас депозит в банке?");
    },
    getExpensesMonth: function () {
        let sum = 0;

        for (let i = 0; i < 2; i++) {
            appData.expenses[i] = prompt("Введите обязательную статью расходов");
            let cost = prompt("Во сколько это обойдется?");
            while (!isNumber(cost)) {
                cost = prompt("Во сколько это обойдется?")
            }
            sum += +cost;
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




let expensesMonth = appData.getExpensesMonth();
let accumulatedMonth = appData.getAccumulatedMonth();
appData.budgetDay = Math.floor(accumulatedMonth / 30);
let targetMonth = appData.getTargetMonth();


//Выводим в консоль

console.log(`Цель - заработать ${appData.mission} руб за ${appData.period} месяцев`);
console.log(`Ваш доход в месяц ${money} руб`);
console.log(`Возможные расходы за месяц: ${appData.addExpenses}`);
console.log(`Обязательные расходы расходы за месяц: ${expensesMonth} руб`);

if (targetMonth !== Infinity && targetMonth >= 0) {
    console.log(`Бюджет на месяц: ${accumulatedMonth} рублей`);
    console.log(`Бюджет на день: ${appData.budgetDay} руб`);
}

console.log(appData.returnTargetMonth());
console.log(appData.getStatusIncome());
