'use client';

import Link from 'next/link';
import './calculator.css';

export default function CalculatorPage() {
  return (
    <>
      {/* Breadcrumb Navigation */}
      <nav
        style={{
          background: 'rgba(6, 11, 24, 0.97)',
          borderBottom: '1px solid rgba(201, 168, 76, 0.2)',
          padding: '0.6rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontFamily: "'Cinzel', serif",
          fontSize: '0.72rem',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          position: 'sticky',
          top: 0,
          zIndex: 500,
        }}
      >
        <Link
          href="/games/world-of-sea-battle"
          style={{
            color: 'rgba(201, 168, 76, 0.7)',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}
        >
          ⚓ World of Sea Battle
        </Link>

        <span style={{ color: 'rgba(201, 168, 76, 0.3)' }}>›</span>

        <span style={{ color: '#e8c96a' }}>
          💥 Cannon DPS Calculator
        </span>
      </nav>

      {/* IFRAME (Stable + Simple) */}
      <iframe
        src="/wsb-calculator.html"
        style={{
          width: '100%',
          height: '100vh',
          border: 'none',
          background: '#060b18',
        }}
      />
    </>
  );
}
