"use strict";


let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}


let money,
    income = 'стипендия',
    addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую"),
    deposit = confirm("Есть ли у вас депозит в банке?"),
    mission = 10000,
    period = 6;

let expenses = [];

//Функции для расчетов

let start = function () {
    money = prompt("Ваш месячный доход?");
    while (!isNumber(money)) {
        money = prompt("Ваш месячный доход?");
    }
}

start();

function getExpensesMonth() {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt("Введите обязательную статью расходов");
        sum += +prompt("Во сколько это обойдется?");
    }

    return sum;
};


let expensesMonth = getExpensesMonth();

function getAccumulatedMonth() {
    return money - expensesMonth
};

let accumulatedMonth = getAccumulatedMonth();

function getTargetMonth() {
    return Math.floor(mission / accumulatedMonth);
};

let budgetDay = Math.floor(accumulatedMonth / 30);


let getStatusIncome = function () {
    if (budgetDay >= 1200) {
        return ("У вас высокий уровень дохода")
    } else if (budgetDay >= 600 && budgetDay < 1200) {
        return ("У вас средний уровень дохода")
    } else if (budgetDay < 600 && budgetDay >= 0) {
        return ("К сожалению у вас уровень дохода ниже среднего")
    } else {
        return ("Что-то пошло не так");
    }
}


let showTypeOf = function (data) {
    console.log(data, typeof (data))
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);



//Выводим в консоль

console.log(`Цель - заработать ${mission} рублей за ${period} месяцев`);
console.log(`Возможные расходы за месяц: ${addExpenses}`);
console.log(`Обязательные расходы расходы за месяц: ${expensesMonth} рублей`);
console.log(`Бюджет на месяц: ${accumulatedMonth}`);
console.log(`Бюджет на день: ${budgetDay} рублей`);
console.log(`достигнете цели за ${getTargetMonth()} месяцев`);
console.log(getStatusIncome());
