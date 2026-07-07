import React from 'react';
import DataTable from '../../../components/DataTable';
import MotionWrapper from '../../../components/MotionWrapper';
import CompensationChart from '../../../components/CompensationChart';


export default async function CompanyProfile({ params }: { params: Promise<{ slug: string }> }) {
  
  
  const resolvedParams = await params;
  
  
  const companyName = resolvedParams.slug.charAt(0).toUpperCase() + resolvedParams.slug.slice(1);

  return (
    <div className="min-h-screen bg-charcoal pt-32 pb-24">
      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        
        <div className="mb-16 border-b border-line pb-12">
          <span className="font-sans text-[11px] uppercase tracking-widest2 text-sand mb-4 block">
            Company Profile
          </span>
          <h1 className="font-display text-5xl md:text-7xl text-ivory mb-6">
            {companyName}
          </h1>
          <p className="font-sans text-base text-ivory/60 max-w-2xl leading-relaxed">
            Verified compensation data and editorial-grade benchmarking for {companyName}. 
            Explore base pay, equity grants, and performance bonuses across all major engineering levels.
          </p>
        </div>

        
        <div className="space-y-16">
          <CompensationChart />
          <DataTable />
        </div>

      </div>
    </div>
  );
}