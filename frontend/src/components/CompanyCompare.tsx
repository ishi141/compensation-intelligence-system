'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { searchCompensation, compareCompanies } from '../lib/api';

function formatMoney(n: number | null | undefined): string {
  if (n === null || n === undefined || isNaN(n)) return '—';
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  return `₹${n.toLocaleString('en-IN')}`;
}

type CompanyStats = {
  id: string;
  name: string;
  _count: number;
  _avg: {
    baseSalary: number | null;
    bonus: number | null;
    stock: number | null;
    totalCompensation: number | null;
  };
  _max: {
    totalCompensation: number | null;
  };
};

export default function CompanyCompare() {
  const { token, isLoggedIn } = useAuth();
  const [companies, setCompanies] = useState<string[]>([]);
  const [companyA, setCompanyA] = useState('');
  const [companyB, setCompanyB] = useState('');
  const [result, setResult] = useState<{ companyA: CompanyStats; companyB: CompanyStats } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isLoggedIn || !token) return;
    searchCompensation(token)
      .then((res) => {
        const names: string[] = Array.from(
          new Set(res.data.records.map((r: any) => r.company.name as string))
        );
        setCompanies(names);
        if (names.length >= 2) {
          setCompanyA(names[0]);
          setCompanyB(names[1]);
        }
      })
      .catch(() => setError('Could not load company list'));
  }, [isLoggedIn, token]);

  const handleCompare = async () => {
    if (!token || !companyA || !companyB) return;
    if (companyA === companyB) {
      setError('Please select two different companies');
      return;
    }
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await compareCompanies(token, companyA, companyB);
      setResult(res.data);
    } catch (err) {
      setError('Comparison failed — check both company names exist');
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', opacity: 0.6 }}>
        Please log in to compare companies.
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{ marginBottom: '0.5rem', fontSize: '0.75rem', letterSpacing: '0.1em', opacity: 0.6 }}>
        VISUALIZATION
      </div>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>Company Averages</h2>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <select
          value={companyA}
          onChange={(e) => setCompanyA(e.target.value)}
          style={{ padding: '0.5rem 1rem', background: '#1a1a1a', color: '#fff', border: '1px solid #444' }}
        >
          {companies.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <span style={{ alignSelf: 'center', opacity: 0.6 }}>vs</span>

        <select
          value={companyB}
          onChange={(e) => setCompanyB(e.target.value)}
          style={{ padding: '0.5rem 1rem', background: '#1a1a1a', color: '#fff', border: '1px solid #444' }}
        >
          {companies.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <button
          onClick={handleCompare}
          disabled={loading}
          style={{
            padding: '0.5rem 1.5rem',
            background: 'transparent',
            border: '1px solid #d4af37',
            color: '#d4af37',
            cursor: 'pointer',
          }}
        >
          {loading ? 'Comparing...' : 'Compare'}
        </button>
      </div>

      {error && <div style={{ color: '#e57373', marginBottom: '1rem' }}>{error}</div>}

      {result && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {[result.companyA, result.companyB].map((c) => (
            <div key={c.id} style={{ border: '1px solid #333', padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{c.name}</h3>
              <div style={{ fontSize: '0.85rem', opacity: 0.6, marginBottom: '1rem' }}>
                Based on {c._count} record{c._count === 1 ? '' : 's'}
              </div>
              <Row label="Avg Base" value={formatMoney(c._avg.baseSalary)} />
              <Row label="Avg Bonus" value={formatMoney(c._avg.bonus)} />
              <Row label="Avg Stock" value={formatMoney(c._avg.stock)} />
              <Row label="Avg Total Comp" value={formatMoney(c._avg.totalCompensation)} highlight />
              <Row label="Highest Total Comp" value={formatMoney(c._max.totalCompensation)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #2a2a2a' }}>
      <span style={{ fontSize: '0.85rem', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
      <span style={{ fontWeight: highlight ? 700 : 400, color: highlight ? '#d4af37' : '#fff' }}>{value}</span>
    </div>
  );
}