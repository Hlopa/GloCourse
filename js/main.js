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
    persentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 3,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function () {
        if (confirm('Есть ли у вас дополнительный источник заработка?')) {
            let itemIncome = prompt('Какой у вас дополнительный заработок?', 'репетиторство');
            while (isNumber(itemIncome) || itemIncome === '') {
                itemIncome = prompt('Какой у вас дополнительный заработок?', 'репетиторство');
            }
            let cashIncome = prompt('Сколько вы на этом зарабатываете в месяц?', 10000);
            while (!isNumber(cashIncome)) {
                cashIncome = prompt('Сколько вы на этом зарабатываете в месяц?', 10000)
            }
            appData.income[itemIncome] = cashIncome;
        }
        let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
        appData.addExpenses = addExpenses.toLocaleLowerCase().split(',');
        appData.deposit = confirm("Есть ли у вас депозит в банке?");
        for (let i = 0; i < 2; i++) {
            let answer = prompt("Введите обязательную статью расходов");
            while (isNumber(answer) || answer === '') {
                answer = prompt("Введите обязательную статью расходов");
            }
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
    },
    getInfoDeposit: function () {
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
    calcSavedMoney: function () {
        return appData.budgetMonth * appData.period;
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


//Выводим в консоль все данные из appData

function getDataInfo() {
    let str = 'Наша программа включает в себя данные: ';
    for (let key in appData) {
        str += `${key} : ${appData[key]}, `;
    }
    return str
}

console.log(getDataInfo());

console.log(appData.addExpenses);


//Вывод в консоль возможных расходов в виде строки, с заглавной буквы


function UpperCase(arr) {
    let res = [];
    for (let item of arr) {
        if (item[0] === ' ') {
            item = item[1].toUpperCase() + item.slice(2);
        } else {
            item = item[0].toUpperCase() + item.slice(1);
        }
        res.push(item);
    }
    return res.join(', ')
}

console.log(`Ваши возможные расходы: ${UpperCase(appData.addExpenses)}`);