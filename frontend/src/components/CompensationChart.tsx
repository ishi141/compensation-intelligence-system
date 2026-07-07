"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Google L4', Base: 190, Stock: 110, Bonus: 35 },
  { name: 'Meta E4', Base: 185, Stock: 130, Bonus: 25 },
  { name: 'Apple ICT4', Base: 180, Stock: 120, Bonus: 20 },
  { name: 'Microsoft 62', Base: 165, Stock: 60, Bonus: 25 },
];

export default function CompensationChart() {
  return (
    <div className="w-full bg-surface border border-line p-8 md:p-12 mt-12">
      <div className="mb-8">
        <span className="font-sans text-[10px] uppercase tracking-widest2 text-sand mb-2 block">
          Visualization
        </span>
        <h3 className="font-display text-2xl text-ivory">Compensation Breakdown ($K)</h3>
      </div>
      
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
    </div>
  );
}