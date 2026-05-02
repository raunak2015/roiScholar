const DEFAULT_LOAN_TERM_MONTHS = 60;

export const calculateMonthlyPayment = (principal, annualInterestRate, termInMonths = DEFAULT_LOAN_TERM_MONTHS, gracePeriodMonths = 0) => {
	let amount = Number(principal) || 0;
	const months = Number(termInMonths) || DEFAULT_LOAN_TERM_MONTHS;
	const monthlyRate = (Number(annualInterestRate) || 0) / 100 / 12;

	if (amount <= 0 || months <= 0) {
		return 0;
	}

	if (monthlyRate === 0) {
		return amount / months;
	}

	// During grace period, interest accrues and is added to principal (compounding)
	if (gracePeriodMonths > 0) {
		amount = amount * Math.pow(1 + monthlyRate, gracePeriodMonths);
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

export const calculateAmortizationSchedule = (principal, annualInterestRate, termInMonths = DEFAULT_LOAN_TERM_MONTHS, gracePeriodMonths = 0) => {
	let amount = Number(principal) || 0;
	const months = Number(termInMonths) || DEFAULT_LOAN_TERM_MONTHS;
	const monthlyRate = (Number(annualInterestRate) || 0) / 100 / 12;

	// Adjust amount for grace period interest accrual
	if (gracePeriodMonths > 0 && monthlyRate > 0) {
		amount = amount * Math.pow(1 + monthlyRate, gracePeriodMonths);
	}

	const monthlyPayment = calculateMonthlyPayment(principal, annualInterestRate, months, gracePeriodMonths);
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

export const calculateLoanSummary = ({ principal, annualInterestRate, termInMonths, gracePeriodMonths = 0 }) => {
	const monthlyPayment = calculateMonthlyPayment(principal, annualInterestRate, termInMonths, gracePeriodMonths);
	
	const totalRepayment = monthlyPayment * termInMonths;
	const totalInterest = totalRepayment - (Number(principal) || 0);

	return {
		principal: Number(principal) || 0,
		monthlyPayment,
		totalInterest,
		totalRepayment,
		amortizationSchedule: calculateAmortizationSchedule(principal, annualInterestRate, termInMonths, gracePeriodMonths),
	};
};
