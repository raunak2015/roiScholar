import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useCurrency } from '../../hooks/useCurrency';

export default function ROIVisualizer({ 
  totalInvestment = 50000, 
  startingSalary = 112500, 
  salaryGrowth = 0.05, 
  years = 10 
}) {
  const { symbol, format } = useCurrency();
  
  // Generate data for the 10-year projection
  const data = useMemo(() => {
    let cumulativeEarnings = 0;
    const chartData = [];

    for (let year = 0; year <= years; year++) {
      const currentSalary = year === 0 ? 0 : startingSalary * Math.pow(1 + salaryGrowth, year - 1);
      cumulativeEarnings += currentSalary;
      
      // Calculate remaining loan balance (simple linear decrease for visualization)
      const loanBalance = Math.max(0, totalInvestment - (totalInvestment / 5) * year);
      
      chartData.push({
        year: `YEAR ${year}`,
        balance: Math.round(loanBalance),
        earnings: Math.round(cumulativeEarnings),
      });
    }
    return chartData;
  }, [totalInvestment, startingSalary, salaryGrowth, years]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1e2b58] p-4 rounded-xl shadow-2xl text-white text-xs border border-white/10">
          <p className="font-black mb-3 tracking-widest">{label}</p>
          <div className="space-y-2">
            <div className="flex justify-between gap-10 items-center">
              <span className="opacity-70 font-bold uppercase">Earnings</span>
              <span className="font-black text-lg">{format(payload[1].value, { minimumFractionDigits: 0 })}</span>
            </div>
            <div className="flex justify-between gap-10 items-center">
              <span className="opacity-70 font-bold uppercase">Balance</span>
              <span className="font-black text-[#4ade80]">{format(payload[0].value, { minimumFractionDigits: 0 })}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-white rounded-3xl p-8 border border-outline-variant/10 shadow-sm mt-8">
      <div className="flex justify-between items-start mb-10">
        <div>
          <h3 className="text-xl font-black text-[#1e2b58] tracking-tight">Earnings vs. Repayment Velocity</h3>
          <p className="text-sm text-on-surface-variant font-medium mt-1">Projected cumulative wealth over 10 years</p>
        </div>
        
        {/* Custom Legend to match mockup */}
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#1e2b58]"></div>
            <span className="text-[10px] font-black text-[#1e2b58] uppercase tracking-widest">Cumulative Earnings</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#006a61]"></div>
            <span className="text-[10px] font-black text-[#1e2b58] uppercase tracking-widest">Loan Balance</span>
          </div>
        </div>
      </div>

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
            <CartesianGrid vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="year" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#1e2b58', fontSize: 10, fontWeight: 'bold' }}
              dy={20}
              interval={1}
            />
            <YAxis 
              hide
              domain={[0, 'dataMax + 100000']}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Loan Balance Line */}
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#006a61"
              strokeWidth={3}
              dot={{ r: 4, fill: '#006a61', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 8, strokeWidth: 0 }}
            />

            {/* Cumulative Earnings Line */}
            <Line
              type="monotone"
              dataKey="earnings"
              stroke="#1e2b58"
              strokeWidth={4}
              dot={false}
              activeDot={{ r: 8, fill: '#1e2b58', strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
