const account = {
	name: 'CYIMANA Faisal',
	expenses: [],
	income: [],
	addExpense: function (description, amount) {
		return this.expenses.push({ description, amount });
	}, // End of addExpense

	getAccountSummary: function () {
		let totalExpenseAmount = 0;
		this.expenses.forEach((expense) => {
			totalExpenseAmount = totalExpenseAmount + expense.amount;
		});
		let totalIncomeAmount = 0;
		this.income.forEach((income) => {
			totalIncomeAmount = totalIncomeAmount + income.amount;
		});
		console.log(
			`${this.name} has a bounce of $${
				totalIncomeAmount - totalExpenseAmount
			}. $${totalIncomeAmount} in income. $${totalExpenseAmount} in expenses`
		);
	}, // End of getAccountSummary

	addIncome: function (description, amount) {
		return this.income.push({ description, amount });
	}, // End of add income
}; // End of account

account.addIncome('Freelancer', 1500);
account.addExpense('rent', 500);
account.addExpense('school fee', 200);
account.addExpense('books', 500);
account.addExpense('books', 500);
console.log(account);
account.getAccountSummary();
