"use strict";

let start = document.getElementById('start'),
    data = document.querySelector('.data'),
    cancel = document.getElementById('cancel'),
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
    start(){
        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();

        this.showResult();
    },
    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = Math.ceil(this.budgetDay);
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();

        periodSelect.addEventListener('input', function () {
            incomePeriodValue.value = this.calcPeriod();
        });
    },
    addExpensesBlock() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.querySelector('.expenses-title').value = '';
        cloneExpensesItem.querySelector('.expenses-amount').value = '';
        expensesPlus.insertAdjacentElement('beforebegin', cloneExpensesItem);
        expensesItems = document.querySelectorAll('.expenses-items');

        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none'
        }
        document.querySelectorAll('.expenses-amount').forEach(function (item) {
            item.addEventListener('input', function (e) {
                this.value = this.value.replace(/[^0-9\.]/g, '');
            });
        })

        document.querySelectorAll('.expenses-title').forEach(function (item) {
            item.addEventListener('input', function (e) {
                this.value = this.value.replace(/[^а-яА-Я\., ]/g, '');
            });
        });
    },
    addIncomeBlock() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.querySelector('.income-title').value = '';
        cloneIncomeItem.querySelector('.income-amount').value = '';
        incomePlus.insertAdjacentElement('beforebegin', cloneIncomeItem);
        incomeItems = document.querySelectorAll('.income-items');

        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none'
        }

        document.querySelectorAll('.income-title').forEach(function (item) {
            item.addEventListener('input', function (e) {
                this.value = this.value.replace(/[^а-яА-Я\., ]/g, '');
            });
        });

        document.querySelectorAll('.income-amount').forEach(function (item) {
            item.addEventListener('input', function (e) {
                this.value = this.value.replace(/[^0-9\.]/g, '');
            });
        });
    },
    getExpenses() {
        expensesItems.forEach(item => {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashEppenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashEppenses !== '') {
                appData.expenses[itemExpenses] = cashEppenses;
            }
        });
    },
    getIncome() {
        incomeItems.forEach(item => {
            let incomText = item.querySelector('.income-title').value;
            let incomNumber = item.querySelector('.income-amount').value;
            if (incomText !== '' && incomNumber !== '') {
                this.income[incomText] = incomNumber;
            }

        });

        for (let key in this.income) {
            this.incomeMonth += +this.income[key]
        }
    },
    getAddExpenses() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(item => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        })
    },
    getAddIncome() {
        additionalIncomeItem.forEach(item => {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue)
            }
        });
    },
    getExpensesMonth() {
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    },
    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = this.budgetMonth / 30;
    },
    getAccumulatedMonth() {
        return money - this.expensesMonth
    },
    getTargetMonth() {
        return targetAmount.value / this.budgetMonth;
    },
    getStatusIncome() {
        if (this.budgetDay >= 1200) {
            return ("У вас высокий уровень дохода")
        } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
            return ("У вас средний уровень дохода")
        } else if (this.budgetDay < 600 && this.budgetDay >= 0) {
            return ("К сожалению у вас уровень дохода ниже среднего")
        } else if (this.budgetDay < 0) {
            return ("Ваши расходы превышают доходы")
        }
        else {
            return ("Что-то пошло не так");
        }
    },
    returnTargetMonth(){
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
    getInfoDeposit() {
        this.deposit = confirm("Есть ли у вас депозит в банке?");
        if (this.deposit) {
            this.persentDeposit = prompt('Какой годовой процент депозита?', 10);
            while (!isNumber(this.persentDeposit)) {
                this.persentDeposit = prompt('Какой годовой процент депозита?', 10);
            }
            this.moneyDeposit = prompt('Какая сумма заложена?', 20000);
            while (!isNumber(this.moneyDeposit)) {
                this.moneyDeposit = prompt('Какая сумма заложена?', 20000);
            }
        }
    },
    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    },
    reset() {
        data.querySelectorAll('[type = "text"]').forEach(item => {
            item.disabled = false
        });

        document.querySelectorAll('[type = "text"]').forEach(item => {
            item.value = '';
        });
        periodSelect.value = 1;
        periodAmount.textContent = periodSelect.value;
    }
};

//функция блокировки кнопки

function disBtn() {
    start.disabled = true;
    start.style.backgroundColor = "#a7adb6";

    salaryAmount.addEventListener('input', function () {
        if (salaryAmount.value === '') {
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


salaryAmount.addEventListener('input', function (e) {
    this.value = this.value.replace(/[^0-9\.]/g, '');
});

targetAmount.addEventListener('input', function (e) {
    this.value = this.value.replace(/[^0-9\.]/g, '');
});

document.querySelectorAll('.income-amount').forEach(function (item) {
    item.addEventListener('input', function (e) {
        this.value = this.value.replace(/[^0-9\.]/g, '');
    });
});

document.querySelectorAll('.expenses-amount').forEach(function (item) {
    item.addEventListener('input', function (e) {
        this.value = this.value.replace(/[^0-9\.]/g, '');
    });
})

//Можно вводить только буквы

additionalExpensesItem.addEventListener('input', function (e) {
    this.value = this.value.replace(/[^а-яА-Я\., ]/g, '');
});


document.querySelectorAll('.income-title').forEach(function (item) {
    item.addEventListener('input', function (e) {
        this.value = this.value.replace(/[^а-яА-Я\., ]/g, '');
    });
});


additionalIncomeItem.forEach(function (item) {
    item.addEventListener('input', function (e) {
        this.value = this.value.replace(/[^а-яА-Я\., ]/g, '');
    });
});

document.querySelectorAll('.expenses-title').forEach(function (item) {
    item.addEventListener('input', function (e) {
        this.value = this.value.replace(/[^а-яА-Я\., ]/g, '');
    });
});


//отслеживание клика

start.addEventListener('click', function () {
    let fooStart = appData.start.bind(appData);
    fooStart();
    start.style.display = 'none';
    cancel.style.display = 'block';
    data.querySelectorAll('[type = "text"]').forEach(item => {
        item.disabled = true
    });
}
);

cancel.addEventListener('click', function () {
    appData.reset();
    start.style.display = 'block';
    cancel.style.display = 'none';
})


expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', function () {
    periodAmount.textContent = periodSelect.value
});
