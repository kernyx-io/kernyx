import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'World of Sea Battle — Tools & Guides | Kernyx',
  description: 'Damage calculators, ship builders, and combat guides for World of Sea Battle.',
}

const TOOLS = [
  {
    href: '/games/world-of-sea-battles/wsb-calculator',
    icon: '💥',
    status: 'available' as const,
    title: 'Broadside Calculator',
    desc: 'Configure your ship, cannons, crew, attachments, and ammo to calculate full volley damage, DPM, and per-side breakdowns.',
    tags: ['DAMAGE', 'DPM', 'CANNONS'],
  },
  {
    href: '#',
    icon: '⚓',
    status: 'soon' as const,
    title: 'Ship Comparison',
    desc: 'Compare any two ships side-by-side across all stats — durability, speed, armor, maneuverability, and weapon layout.',
    tags: ['SHIPS', 'STATS'],
  },
  {
    href: '#',
    icon: '🧭',
    status: 'soon' as const,
    title: 'Fleet Builder',
    desc: 'Plan squadron compositions and calculate combined broadside output for coordinated fleet engagements.',
    tags: ['FLEET', 'SQUADRON'],
  },
]

const GUIDES = [
  { title: 'Cannon Selection Guide', desc: 'Long cannon vs carronade vs bombard — when to use each weapon type and on which ship.', status: 'soon' as const },
  { title: 'Broadside Armor & Penetration', desc: 'How armor reduction interacts with cannon penetration values and which ships are effectively immune to small caliber.', status: 'soon' as const },
  { title: 'Rate 1 Ship Overview', desc: "Comparing the Santísima Trinidad, 12 Apostolov, and other Rate 1 heavies — trade-offs between firepower, speed, and durability.", status: 'soon' as const },
]

export default function WorldOfSeaBattlesPage() {
  return (
    <main className="wsb-hub">

      {/* ── Hero ── */}
      <div className="wsb-hub-hero">
        <div className="wsb-hub-hero-inner">
          <div className="wsb-hub-eyebrow">
            <span className="wsb-hub-game-badge">⚔ WORLD OF SEA BATTLE</span>
          </div>
          <h1 className="wsb-hub-title">
            Rule the<br />
            <em>Open Sea</em>
          </h1>
          <p className="wsb-hub-subtitle">
            Damage calculators, ship builders, and tactical guides for captains who demand precision.
          </p>
          <div className="wsb-hub-stats-row">
            <div className="wsb-hub-stat"><span>62</span> Ships</div>
            <div className="wsb-hub-stat-sep">·</div>
            <div className="wsb-hub-stat"><span>43</span> Cannons</div>
            <div className="wsb-hub-stat-sep">·</div>
            <div className="wsb-hub-stat"><span>35</span> Attachments</div>
            <div className="wsb-hub-stat-sep">·</div>
            <div className="wsb-hub-stat"><span>49</span> Crew</div>
          </div>
        </div>
        <div className="wsb-hub-hero-ship" aria-hidden>⛵</div>
      </div>

      <div className="wsb-hub-content">

        {/* ── Tools ── */}
        <section className="wsb-hub-section">
          <div className="wsb-hub-section-header">
            <span className="wsb-hub-section-icon">⚙</span>
            TOOLS &amp; CALCULATORS
          </div>
          <div className="wsb-hub-tools-grid">
            {TOOLS.map((tool) => (
              <Link
                key={tool.title}
                href={tool.status === 'soon' ? '#' : tool.href}
                className={`wsb-hub-tool-card ${tool.status === 'soon' ? 'soon' : ''}`}
              >
                <div className="wsb-hub-tool-top">
                  <span className="wsb-hub-tool-icon">{tool.icon}</span>
                  <span className={`wsb-hub-tool-badge wsb-hub-tool-badge-${tool.status}`}>
                    {tool.status === 'available' ? 'AVAILABLE' : 'COMING SOON'}
                  </span>
                </div>
                <div className="wsb-hub-tool-title">{tool.title}</div>
                <div className="wsb-hub-tool-desc">{tool.desc}</div>
                <div className="wsb-hub-tool-tags">
                  {tool.tags.map(t => <span key={t} className="wsb-hub-tag">{t}</span>)}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Guides ── */}
        <section className="wsb-hub-section">
          <div className="wsb-hub-section-header">
            <span className="wsb-hub-section-icon">📖</span>
            GUIDES
          </div>
          <div className="wsb-hub-guides-list">
            {GUIDES.map((g, i) => (
              <div key={i} className="wsb-hub-guide-row">
                <div className="wsb-hub-guide-dot" />
                <div className="wsb-hub-guide-body">
                  <div className="wsb-hub-guide-title">{g.title}</div>
                  <div className="wsb-hub-guide-desc">{g.desc}</div>
                </div>
                <div className="wsb-hub-guide-soon">SOON</div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* ── Footer note ── */}
      <div className="wsb-hub-footer">
        Kernyx · Unofficial fan site · Not affiliated with Game-Insight or World of Sea Battle
      </div>

      <style>{`
        /* ── Reset & tokens ── */
        .wsb-hub {
          --gold:        #c9a84c;
          --gold-bright: #e8c96a;
          --gold-dim:    #7a6230;
          --navy:        #060c1a;
          --navy-mid:    #0c1628;
          --navy-light:  #132040;
          --cream:       #e8dfc8;
          --cream-dim:   #a89878;
          --green:       #2ecc71;
          --border:      rgba(201,168,76,0.2);

          min-height: 100vh;
          background: var(--navy);
          color: var(--cream);
          font-family: 'Crimson Pro', Georgia, serif;
        }

        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cinzel+Decorative:wght@700&family=Crimson+Pro:ital,wght@0,400;0,600;1,400&display=swap');

        /* ── Hero ── */
        .wsb-hub-hero {
          position: relative;
          padding: 4rem 2rem 3rem;
          border-bottom: 1px solid var(--border);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1100px;
          margin: 0 auto;
        }

        .wsb-hub-hero-inner { max-width: 600px; }

        .wsb-hub-eyebrow { margin-bottom: 1rem; }

        .wsb-hub-game-badge {
          font-family: 'Cinzel', serif;
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          color: var(--gold);
          border: 1px solid var(--border);
          padding: 0.3rem 0.75rem;
          border-radius: 2px;
        }

        .wsb-hub-title {
          font-family: 'Cinzel Decorative', serif;
          font-size: clamp(2.2rem, 5vw, 3.8rem);
          font-weight: 700;
          line-height: 1.1;
          color: var(--cream);
          margin: 0 0 1rem;
          text-shadow: 0 0 60px rgba(201,168,76,0.15);
        }

        .wsb-hub-title em {
          font-style: italic;
          color: var(--gold-bright);
          display: block;
        }

        .wsb-hub-subtitle {
          font-size: 1.1rem;
          color: var(--cream-dim);
          max-width: 480px;
          line-height: 1.6;
          margin: 0 0 1.75rem;
        }

        .wsb-hub-stats-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          flex-wrap: wrap;
          font-family: 'Cinzel', serif;
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          color: var(--cream-dim);
        }

        .wsb-hub-stat span { color: var(--gold-bright); font-weight: 600; margin-right: 0.3rem; }
        .wsb-hub-stat-sep  { color: var(--gold-dim); }

        .wsb-hub-hero-ship {
          font-size: clamp(5rem, 12vw, 10rem);
          opacity: 0.07;
          position: absolute;
          right: 2rem;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          user-select: none;
        }

        /* ── Content ── */
        .wsb-hub-content {
          max-width: 1100px;
          margin: 0 auto;
          padding: 3rem 2rem 4rem;
          display: flex;
          flex-direction: column;
          gap: 3.5rem;
        }

        /* ── Section header ── */
        .wsb-hub-section-header {
          font-family: 'Cinzel', serif;
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          color: var(--gold);
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 1.25rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border);
        }

        .wsb-hub-section-icon { font-size: 0.9rem; }

        /* ── Tool cards ── */
        .wsb-hub-tools-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1rem;
        }

        .wsb-hub-tool-card {
          background: var(--navy-mid);
          border: 1px solid var(--border);
          border-radius: 4px;
          padding: 1.25rem 1.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          text-decoration: none;
          color: var(--cream);
          transition: border-color 0.2s, background 0.2s;
          position: relative;
        }

        .wsb-hub-tool-card:not(.soon):hover {
          border-color: rgba(201,168,76,0.5);
          background: var(--navy-light);
        }

        .wsb-hub-tool-card.soon {
          opacity: 0.55;
          cursor: default;
          pointer-events: none;
        }

        .wsb-hub-tool-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .wsb-hub-tool-icon { font-size: 1.4rem; }

        .wsb-hub-tool-badge {
          font-family: 'Cinzel', serif;
          font-size: 0.55rem;
          letter-spacing: 0.12em;
          padding: 0.2rem 0.5rem;
          border-radius: 2px;
        }

        .wsb-hub-tool-badge-available {
          background: rgba(46,204,113,0.12);
          color: var(--green);
          border: 1px solid rgba(46,204,113,0.3);
        }

        .wsb-hub-tool-badge-soon {
          background: rgba(201,168,76,0.1);
          color: var(--gold-dim);
          border: 1px solid var(--border);
        }

        .wsb-hub-tool-title {
          font-family: 'Cinzel', serif;
          font-size: 1rem;
          font-weight: 600;
          color: var(--cream);
          letter-spacing: 0.04em;
        }

        .wsb-hub-tool-desc {
          font-size: 0.97rem;
          color: var(--cream-dim);
          line-height: 1.55;
          flex: 1;
        }

        .wsb-hub-tool-tags {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
          margin-top: 0.25rem;
        }

        .wsb-hub-tag {
          font-family: 'Cinzel', serif;
          font-size: 0.55rem;
          letter-spacing: 0.1em;
          color: var(--gold-dim);
          border: 1px solid rgba(201,168,76,0.15);
          padding: 0.15rem 0.45rem;
          border-radius: 2px;
        }

        /* ── Guides ── */
        .wsb-hub-guides-list {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .wsb-hub-guide-row {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1rem 0;
          border-bottom: 1px solid rgba(201,168,76,0.07);
        }

        .wsb-hub-guide-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--gold-dim);
          margin-top: 0.55rem;
          flex-shrink: 0;
        }

        .wsb-hub-guide-body { flex: 1; }

        .wsb-hub-guide-title {
          font-family: 'Cinzel', serif;
          font-size: 0.92rem;
          color: var(--cream);
          margin-bottom: 0.3rem;
          letter-spacing: 0.03em;
        }

        .wsb-hub-guide-desc {
          font-size: 0.95rem;
          color: var(--cream-dim);
          line-height: 1.5;
        }

        .wsb-hub-guide-soon {
          font-family: 'Cinzel', serif;
          font-size: 0.6rem;
          letter-spacing: 0.14em;
          color: var(--gold-dim);
          padding-top: 0.4rem;
          white-space: nowrap;
        }

        /* ── Footer ── */
        .wsb-hub-footer {
          text-align: center;
          padding: 1.5rem;
          font-family: 'Cinzel', serif;
          font-size: 0.6rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--gold-dim);
          border-top: 1px solid var(--border);
        }

        @media (max-width: 640px) {
          .wsb-hub-hero { flex-direction: column; padding: 2.5rem 1.25rem 2rem; }
          .wsb-hub-content { padding: 2rem 1.25rem 3rem; }
          .wsb-hub-tools-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  )
}
