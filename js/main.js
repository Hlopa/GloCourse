let money = 500,
    income = 'стипендия',
    addExpenses = 'Учеба, Проездной, Коммуналка',
    deposit = true,
    mission = 10000,
    period = 6,
    budgetDay = money / 30;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log(`Период равен ${period} месяцам`);
console.log(`Цель заработать ${mission} рублей`);

let lowAddExpenses = addExpenses.toLowerCase();
let arrAddExpenses = lowAddExpenses.split(", ");
console.log(lowAddExpenses);
console.log(arrAddExpenses);


money = +prompt("Ваш месячный доход?");
addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
deposit = confirm("Есть ли у вас депозит в банке?");

expenses1 = prompt("Введите обязательную статью расходов");
cost1 = +prompt("Во сколько это обойдется?");

expenses2 = prompt("Введите обязательную статью расходов");
cost2 = +prompt("Во сколько это обойдется?");


let budgetMonth = money - cost1 - cost2;
let getMisiion = Math.round(mission / budgetMonth);

budgetDay = Math.floor(budgetMonth / 30);

console.log(`бюджет на день: ${budgetDay}`);
console.log(`бюджет на месяц: ${budgetMonth}`);
console.log(`достигнете цели за ${getMisiion} месяцев`);

if (budgetDay >= 1200) {
    console.log("У вас высокий уровень дохода")
} else if (budgetDay >= 600 && budgetDay < 1200) {
    console.log("У вас средний уровень дохода")
} else if (budgetDay < 600 && budgetDay >= 0) {
    console.log("К сожалению у вас уровень дохода ниже среднего")
} else {
    console.log("Что-то пошло не так");
}