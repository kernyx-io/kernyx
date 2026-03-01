'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import './calculator.css';

export default function CalculatorPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!containerRef.current) return;

    // Reset container fully
    containerRef.current.innerHTML = '';

    // Inject calculator HTML
    containerRef.current.innerHTML = CALCULATOR_HTML;

    // Small delay ensures scripts attach
    setTimeout(() => {
      if (typeof (window as any).init === 'function') {
        try {
          (window as any).init();
        } catch (e) {
          console.error('WSB Calculator init error:', e);
        }
      }
    }, 50);

  }, [pathname]); // 🔥 Re-run on navigation

  return (
    <>
      <Script src="/wsb-data.js" strategy="beforeInteractive" />
      <Script src="/wsb-app.js" strategy="beforeInteractive" />

      <nav style={{
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
      }}>
        <Link href="/games/world-of-sea-battle"
          style={{
            color: 'rgba(201, 168, 76, 0.7)',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}>
          ⚓ World of Sea Battle
        </Link>
        <span style={{ color: 'rgba(201, 168, 76, 0.3)' }}>›</span>
        <span style={{ color: '#e8c96a' }}>💥 Cannon DPS Calculator</span>
      </nav>

      <div ref={containerRef} id="wsb-calculator-root" />
    </>
  );
}
