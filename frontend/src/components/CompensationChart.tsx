"use client";
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useAuth } from '../context/AuthContext';
import { searchCompensation } from '../lib/api';

type ChartRow = {
  name: string;
  Base: number;
  Stock: number;
  Bonus: number;
};

// Converts a raw INR/USD/EUR/GBP number into a display value in Lakhs (INR)
// or thousands (other currencies), so the chart's Y-axis stays readable.
function toDisplayUnit(n: number, currency: string) {
  if (currency === "INR") {
    return n / 100000; // Lakhs
  }
  return n / 1000; // K
}

function formatTooltipValue(value: number, currency: string) {
  if (currency === "INR") {
    return `₹${value.toFixed(1).replace(/\.0$/, "")}L`;
  }
  return `${currency} ${value.toFixed(1).replace(/\.0$/, "")}K`;
}

export default function CompensationChart() {
  const { token, isLoggedIn } = useAuth();
  const [data, setData] = useState<ChartRow[]>([]);
  const [currency, setCurrency] = useState<string>("INR");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn || !token) {
      setLoading(false);
      return;
    }
    async function fetchData() {
      try {
        setLoading(true);
        const res = await searchCompensation(token);
        const records = res.data.records;
        const detectedCurrency = records[0]?.currency ?? "INR";
        setCurrency(detectedCurrency);

        const rows: ChartRow[] = records.map((r: any) => ({
          name: `${r.company.name} ${r.level.name}`,
          Base: toDisplayUnit(r.baseSalary, detectedCurrency),
          Stock: toDisplayUnit(r.stock, detectedCurrency),
          Bonus: toDisplayUnit(r.bonus, detectedCurrency),
        }));
        setData(rows);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Failed to load compensation data.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [token, isLoggedIn]);

  const unitLabel = currency === "INR" ? "₹ Lakhs" : `${currency} K`;

  return (
    <div className="w-full bg-surface border border-line p-8 md:p-12 mt-12">
      <div className="mb-8">
        <span className="font-sans text-[10px] uppercase tracking-widest2 text-sand mb-2 block">
          Visualization
        </span>
        <h3 className="font-display text-2xl text-ivory">
          Compensation Breakdown ({unitLabel})
        </h3>
      </div>

      {!isLoggedIn ? (
        <p className="font-sans text-sm text-ivory/50 uppercase tracking-widest2">
          Log in to view compensation data.
        </p>
      ) : loading ? (
        <p className="font-sans text-sm text-ivory/50 uppercase tracking-widest2">
          Loading...
        </p>
      ) : error ? (
        <p className="font-sans text-sm text-sand uppercase tracking-widest2">{error}</p>
      ) : data.length === 0 ? (
        <p className="font-sans text-sm text-ivory/50 uppercase tracking-widest2">
          No records found.
        </p>
      ) : (
        <div className="h-100 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
              <XAxis
                dataKey="name"
                stroke="#F3EEE3"
                opacity={0.4}
                tick={{ fill: '#F3EEE3', fontSize: 11, fontFamily: 'sans-serif' }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#F3EEE3"
                opacity={0.4}
                tick={{ fill: '#F3EEE3', fontSize: 11, fontFamily: 'sans-serif' }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                cursor={{ fill: '#3A332B', opacity: 0.2 }}
                contentStyle={{
                  backgroundColor: '#14110D',
                  borderColor: '#3A332B',
                  color: '#F3EEE3',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
                itemStyle={{ color: '#F3EEE3' }}
                formatter={(value: number) => formatTooltipValue(value, currency)}
              />
              <Legend
                wrapperStyle={{ paddingTop: '20px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                iconType="square"
              />
              <Bar dataKey="Base" stackId="a" fill="#F3EEE3" />
              <Bar dataKey="Stock" stackId="a" fill="#C9A876" />
              <Bar dataKey="Bonus" stackId="a" fill="#8B5E3C" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}