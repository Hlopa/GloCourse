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


//Узнаем месячный доход

let start = function () {
    let moneyStr;
    do {
        moneyStr = prompt("Ваш месячный доход?");
        money = +moneyStr;
    }
    while (!isNumber(moneyStr));
}

start();


//Узнаем обязательные расходы

let expenses = [];

function getExpensesMonth() {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt("Введите обязательную статью расходов");
        let cost = prompt("Во сколько это обойдется?");
        while (!isNumber(cost)) {
            cost = prompt("Во сколько это обойдется?")
        }
        sum += +cost;
    }
    return sum;
};

let expensesMonth = getExpensesMonth();


//Рассчитываем сколько остается росле расходов и бюджет на день

function getAccumulatedMonth() {
    return money - expensesMonth
};

let accumulatedMonth = getAccumulatedMonth();
let budgetDay = Math.floor(accumulatedMonth / 30);


//Рассчитываем за какое время достигнет цели

function getTargetMonth() {
    return Math.floor(mission / accumulatedMonth);
};


let targetMonth = getTargetMonth();

function returnTargetMonth() {
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
};



//Рассчитываем уровень дохода

let getStatusIncome = function () {
    if (budgetDay >= 1200) {
        return ("У вас высокий уровень дохода")
    } else if (budgetDay >= 600 && budgetDay < 1200) {
        return ("У вас средний уровень дохода")
    } else if (budgetDay < 600 && budgetDay >= 0) {
        return ("К сожалению у вас уровень дохода ниже среднего")
    } else if (budgetDay < 0) {
        return ("Ваши расходы превышают доходы")
    }
    else {
        return ("Что-то пошло не так");
    }
}

//Typeof

let showTypeOf = function (data) {
    console.log(data, typeof (data))
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);


//Выводим в консоль

console.log(`Цель - заработать ${mission} руб за ${period} месяцев`);
console.log(`Ваш доход в месяц ${money} руб`);
console.log(`Возможные расходы за месяц: ${addExpenses}`);
console.log(`Обязательные расходы расходы за месяц: ${expensesMonth} руб`);

if (targetMonth !== Infinity && targetMonth >= 0) {
    console.log(`Бюджет на месяц: ${accumulatedMonth} рублей`);
    console.log(`Бюджет на день: ${budgetDay} руб`);
}

console.log(returnTargetMonth());
console.log(getStatusIncome());
