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
    let moneyStr;
    do {
        moneyStr = prompt("Ваш месячный доход?");
        money = +moneyStr;
    }
    while (!isNumber(moneyStr));
}

start();

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

function getAccumulatedMonth() {
    return money - expensesMonth
};

let accumulatedMonth = getAccumulatedMonth();


function getTargetMonth() {
    return Math.floor(mission / accumulatedMonth);
};


let targetMonth = getTargetMonth();

function returnTargetMonth() {
    let result = '';
    if (targetMonth >= 0) {
        result = `достигнете цели за ${targetMonth} месяцев`
    } else {
        result = `цель не будет достигнута`
    }
    return result
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
console.log(`Бюджет на месяц: ${accumulatedMonth} рублей`);
console.log(`Бюджет на день: ${budgetDay} рублей`);
console.log(returnTargetMonth());
console.log(getStatusIncome());
