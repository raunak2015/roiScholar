export const calculateROI = ({
  monthlyPayment,
  startingSalary,
  salaryGrowthPerYear = 0.05,
  stayBackYears = 0,
}) => {
  if (!monthlyPayment || monthlyPayment <= 0 || !startingSalary || startingSalary <= 0) {
    return {
      breakEvenYears: 0,
      yearlyNetGain: 0,
      totalGainAtBreakEven: 0,
      projectedSalaryAtBreakEven: 0,
    };
  }

  const monthlyNetIncome = startingSalary / 12;
  const yearsToBreakEven = (monthlyPayment / monthlyNetIncome) * 12;

  let breakEvenYears = Math.max(yearsToBreakEven, 0);
  const projectedSalaryAtBreakEven = startingSalary * Math.pow(1 + salaryGrowthPerYear, breakEvenYears);
  const totalEarningsAtBreakEven = (startingSalary / salaryGrowthPerYear) * (Math.pow(1 + salaryGrowthPerYear, breakEvenYears) - 1);
  const totalRepaymentAtBreakEven = monthlyPayment * 12 * breakEvenYears;
  const netGainAtBreakEven = totalEarningsAtBreakEven - totalRepaymentAtBreakEven;

  return {
    breakEvenYears: parseFloat(breakEvenYears.toFixed(2)),
    yearlyNetGain: startingSalary - monthlyPayment * 12,
    totalGainAtBreakEven: parseFloat(netGainAtBreakEven.toFixed(2)),
    projectedSalaryAtBreakEven: parseFloat(projectedSalaryAtBreakEven.toFixed(2)),
    monthlyNetIncome: parseFloat(monthlyNetIncome.toFixed(2)),
  };
};

export const calculateMultiYearROI = ({
  monthlyPayment,
  startingSalary,
  years = 10,
  salaryGrowthPerYear = 0.05,
}) => {
  if (!monthlyPayment || !startingSalary || years <= 0) {
    return [];
  }

  const yearlyData = [];

  for (let year = 1; year <= years; year++) {
    const projectedSalary = startingSalary * Math.pow(1 + salaryGrowthPerYear, year);
    const yearlyRepayment = monthlyPayment * 12;
    const yearlyNetIncome = projectedSalary - yearlyRepayment;
    const cumulativeRepayment = yearlyRepayment * year;
    const cumulativeEarnings = Array.from({ length: year }, (_, i) =>
      startingSalary * Math.pow(1 + salaryGrowthPerYear, i + 1),
    ).reduce((a, b) => a + b, 0);

    yearlyData.push({
      year,
      projectedSalary: parseFloat(projectedSalary.toFixed(2)),
      yearlyNetIncome: parseFloat(yearlyNetIncome.toFixed(2)),
      cumulativeRepayment: parseFloat(cumulativeRepayment.toFixed(2)),
      cumulativeEarnings: parseFloat(cumulativeEarnings.toFixed(2)),
      netPosition: parseFloat((cumulativeEarnings - cumulativeRepayment).toFixed(2)),
    });
  }

  return yearlyData;
};

export const calculateBreakEvenPoint = ({
  monthlyPayment,
  startingSalary,
  salaryGrowthPerYear = 0.05,
}) => {
  if (!monthlyPayment || !startingSalary) {
    return null;
  }

  let year = 0;
  let cumulativeEarnings = 0;
  let cumulativeRepayment = 0;

  while (cumulativeEarnings <= cumulativeRepayment && year < 50) {
    year += 1;
    const salary = startingSalary * Math.pow(1 + salaryGrowthPerYear, year);
    cumulativeEarnings += salary;
    cumulativeRepayment += monthlyPayment * 12;
  }

  return {
    breakEvenYear: year,
    cumulativeEarnings: parseFloat(cumulativeEarnings.toFixed(2)),
    cumulativeRepayment: parseFloat(cumulativeRepayment.toFixed(2)),
    netGain: parseFloat((cumulativeEarnings - cumulativeRepayment).toFixed(2)),
  };
};
