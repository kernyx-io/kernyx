'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import './calculator.css';

/* ─────────────────────────────────────────────
   IMPORTANT:
   Keep your full calculator HTML string here.
   I’m shortening it below for readability —
   Replace this placeholder with your FULL string.
───────────────────────────────────────────── */

const CALCULATOR_HTML = `CALCULATOR_HTML`;

/* ───────────────────────────────────────────── */

export default function CalculatorPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous content
    containerRef.current.innerHTML = '';

    // Inject calculator markup
    containerRef.current.innerHTML = CALCULATOR_HTML;

    // Delay ensures scripts are available
    const timer = setTimeout(() => {
      if (typeof (window as any).init === 'function') {
        try {
          (window as any).init();
        } catch (e) {
          console.error('WSB Calculator init error:', e);
        }
      }
    }, 50);

    return () => clearTimeout(timer);

  }, [pathname]); // Re-run on client navigation

  return (
    <>
      {/* Load calculator scripts BEFORE React interaction */}
      <Script src="/wsb-data.js" strategy="beforeInteractive" />
      <Script src="/wsb-app.js" strategy="beforeInteractive" />

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

      {/* Calculator Root */}
      <div ref={containerRef} id="wsb-calculator-root" />
    </>
  );
}
