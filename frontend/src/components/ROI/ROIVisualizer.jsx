import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { useCurrency } from '../../hooks/useCurrency';

export default function ROIVisualizer({ 
  totalInvestment = 50000, 
  startingSalary = 80000, 
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
      
      chartData.push({
        year: `Year ${year}`,
        investment: totalInvestment,
        earnings: Math.round(cumulativeEarnings),
        netROI: Math.round(cumulativeEarnings - totalInvestment),
      });
    }
    return chartData;
  }, [totalInvestment, startingSalary, salaryGrowth, years]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface-container-high/90 backdrop-blur-md p-4 rounded-xl border border-outline-variant shadow-xl text-sm">
          <p className="font-bold text-on-surface mb-2">{label}</p>
          <div className="space-y-1">
            <div className="flex justify-between gap-8">
              <span className="text-on-surface-variant">Investment:</span>
              <span className="font-bold text-on-surface">{format(payload[0].value)}</span>
            </div>
            <div className="flex justify-between gap-8">
              <span className="text-on-surface-variant">Cumulative Earnings:</span>
              <span className="font-bold text-primary">{format(payload[1].value)}</span>
            </div>
            <div className={`flex justify-between gap-8 pt-2 mt-2 border-t border-outline-variant ${payload[2].value >= 0 ? 'text-tertiary' : 'text-error'}`}>
              <span className="font-medium">Net Position:</span>
              <span className="font-extrabold">{format(payload[2].value)}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/10 shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-on-surface">10-Year ROI Projection</h3>
        <p className="text-sm text-on-surface-variant">Visualizing the break-even point and cumulative financial gain</p>
      </div>

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--md-sys-color-primary)" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="var(--md-sys-color-primary)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
            <XAxis 
              dataKey="year" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'var(--md-sys-color-on-surface-variant)', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'var(--md-sys-color-on-surface-variant)', fontSize: 12 }}
              tickFormatter={(value) => `${symbol}${value / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="top" 
              align="right" 
              iconType="circle"
              wrapperStyle={{ paddingBottom: '20px' }}
            />
            
            {/* Investment Baseline */}
            <Area
              name="Total Investment"
              type="monotone"
              dataKey="investment"
              stroke="#ffb4ab"
              fill="rgba(186, 26, 26, 0.05)"
              strokeWidth={2}
              strokeDasharray="5 5"
            />

            {/* Cumulative Earnings */}
            <Area
              name="Cumulative Earnings"
              type="monotone"
              dataKey="earnings"
              stroke="var(--md-sys-color-primary)"
              fillOpacity={1}
              fill="url(#colorEarnings)"
              strokeWidth={4}
            />

            {/* Hidden field just for tooltip */}
            <Line type="monotone" dataKey="netROI" hide />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 p-4 bg-primary/5 rounded-2xl flex items-center gap-4 border border-primary/10">
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
          <span className="material-symbols-outlined">trending_up</span>
        </div>
        <div>
          <p className="text-sm font-bold text-on-surface">Break-even Point</p>
          <p className="text-xs text-on-surface-variant">
            You will recover your investment in approximately 
            <span className="text-primary font-extrabold mx-1">
              {(totalInvestment / startingSalary).toFixed(1)} years
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

// Helper to use useMemo inside component
import { useMemo } from 'react';
