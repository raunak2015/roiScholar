const DEFAULT_LOAN_TERM_MONTHS = 60;

export const calculateMonthlyPayment = (principal, annualInterestRate, termInMonths = DEFAULT_LOAN_TERM_MONTHS) => {
	const amount = Number(principal) || 0;
	const months = Number(termInMonths) || DEFAULT_LOAN_TERM_MONTHS;
	const monthlyRate = (Number(annualInterestRate) || 0) / 100 / 12;

	if (amount <= 0 || months <= 0) {
		return 0;
	}

	if (monthlyRate === 0) {
		return amount / months;
	}

	return (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
};

export const calculateTotalInterest = (principal, monthlyPayment, termInMonths = DEFAULT_LOAN_TERM_MONTHS) => {
	const amount = Number(principal) || 0;
	const payment = Number(monthlyPayment) || 0;
	const months = Number(termInMonths) || DEFAULT_LOAN_TERM_MONTHS;

	if (amount <= 0 || payment <= 0 || months <= 0) {
		return 0;
	}

	return payment * months - amount;
};

export const calculateAmortizationSchedule = (principal, annualInterestRate, termInMonths = DEFAULT_LOAN_TERM_MONTHS) => {
	const amount = Number(principal) || 0;
	const months = Number(termInMonths) || DEFAULT_LOAN_TERM_MONTHS;
	const monthlyPayment = calculateMonthlyPayment(amount, annualInterestRate, months);
	const monthlyRate = (Number(annualInterestRate) || 0) / 100 / 12;
	let balance = amount;

	return Array.from({ length: months }, (_, index) => {
		const interestPayment = balance * monthlyRate;
		const principalPayment = monthlyPayment - interestPayment;
		balance = Math.max(0, balance - principalPayment);

		return {
			month: index + 1,
			payment: monthlyPayment,
			principalPayment,
			interestPayment,
			balance,
		};
	});
};

export const calculateLoanSummary = ({ principal, annualInterestRate, termInMonths }) => {
	const monthlyPayment = calculateMonthlyPayment(principal, annualInterestRate, termInMonths);
	const totalInterest = calculateTotalInterest(principal, monthlyPayment, termInMonths);

	return {
		monthlyPayment,
		totalInterest,
		totalRepayment: (Number(principal) || 0) + totalInterest,
		amortizationSchedule: calculateAmortizationSchedule(principal, annualInterestRate, termInMonths),
	};
};
