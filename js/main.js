let money = 500,
    income = 'стипендия',
    addExpenses = 'Учеба, Проездной, Коммуналка',
    deposit = true,
    mission = 7000,
    period = 6,
    budgetDay = money/30;
  
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

 console.log(budgetDay);