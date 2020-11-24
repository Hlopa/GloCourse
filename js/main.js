"use strict";

let money = 500,
    income = 'стипендия',
    addExpenses = 'Учеба, Проездной, Коммуналка',
    deposit = true,
    mission = 10000,
    period = 6,
    budgetDay = Math.floor(money / 30);


//Typeof function   

let showTypeOf = function (data) {
    console.log(data, typeof (data))
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);


//Задаем вопросы пользователю

money = +prompt("Ваш месячный доход?");
addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
deposit = confirm("Есть ли у вас депозит в банке?");

let expenses1 = prompt("Введите обязательную статью расходов");
let cost1 = +prompt("Во сколько это обойдется?");

let expenses2 = prompt("Введите обязательную статью расходов");
let cost2 = +prompt("Во сколько это обойдется?");



//Функции для расчетов

function getExpensesMonth() {                   
    return cost1 + cost2;
};

function getAccumulatedMonth() {                     
    return money - getExpensesMonth()
};

let accumulatedMonth = getAccumulatedMonth();

function getTargetMonth() {
    return Math.floor(mission / accumulatedMonth);
};

budgetDay = Math.floor(accumulatedMonth / 30);


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


//Выводим в консоль

console.log(`Цель - заработать ${mission} рублей за ${period} месяцев`);
console.log(`Возможные расходы за месяц: ${addExpenses}`);
console.log(`Обязательные расходы расходы за месяц: ${getExpensesMonth()} рублей`);
console.log(`Бюджет на месяц: ${accumulatedMonth}`);
console.log(`Бюджет на день: ${budgetDay} рублей`);
console.log(`достигнете цели за ${getTargetMonth()} месяцев`);
console.log(getStatusIncome());
