"use client";

import Link from "next/link";
import styles from "./page.module.css";

export default function WoSBClient() {
  return (
    <div className={styles.page}>
      {/* paste your entire existing page JSX here */}
    </div>
  );
}

export const metadata = {
  title: 'World of Sea Battle | Kernyx',
  description: 'Cannon DPS calculators, ship build guides, and naval strategy for World of Sea Battle.',
};

const tools = [
  {
    href: '/games/world-of-sea-battle/calculator',
    icon: '💥',
    title: 'Cannon DPS Calculator',
    desc: 'Simulate every broadside configuration — pick your ship, load ammo, assign crew, and stack attachments to see live damage projections before you ever set sail.',
    tags: ['Artillery', 'DPS', 'Optimization'],
    type: 'Calculator',
    comingSoon: false,
  },
  {
    href: '/games/world-of-sea-battle/ship-builder',
    icon: '⛵',
    title: 'Ship Build Planner',
    desc: 'Compare ship hulls, cannons, and equipment loadouts side-by-side to find your optimal build for ranked or PvE.',
    tags: ['Ships', 'Loadout', 'Comparison'],
    type: 'Builder',
    comingSoon: true,
  },
  {
    href: '/games/world-of-sea-battle/crew-optimizer',
    icon: '👥',
    title: 'Crew Optimizer',
    desc: 'Assign crew members to maximize combat bonuses across different playstyles and ship classes.',
    tags: ['Crew', 'Bonuses', 'Meta'],
    type: 'Tool',
    comingSoon: true,
  },
];

const guides = [
  { href: '#', title: 'Broadside Positioning Theory', desc: 'Optimal angle management, reload timing, and maneuvering to maximize DPS in open-sea engagements.', comingSoon: true },
  { href: '#', title: 'Fleet Composition Guide', desc: 'How to balance firepower, speed, and tankiness in a coordinated fleet for competitive modes.', comingSoon: true },
  { href: '#', title: 'Ammo Types & Situational Use', desc: 'When to run chain shot, explosive, or regular rounds and how each interacts with armor.', comingSoon: true },
];

export default function WoSBPage() {
  return (
    <div className={styles.page}>
      <div className={styles.waveBg} aria-hidden="true" />

      <nav className={styles.breadcrumb}>
        <Link href="/" className={styles.bcLink}>Kernyx</Link>
        <span className={styles.bcSep}>›</span>
        <span className={styles.bcCurrent}>World of Sea Battle</span>
      </nav>

      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>⚓ World of Sea Battle</p>
          <h1 className={styles.heroTitle}>Rule the<br /><em>High Seas</em></h1>
          <p className={styles.heroSub}>Cannon calculators, ship builders, and strategic guides for the boldest captains on the ocean.</p>
          <div className={styles.heroDivider} />
          <Link href="/games/world-of-sea-battle/calculator" className={styles.heroCta}>Open Cannon Calculator →</Link>
        </div>
        <div className={styles.heroCompass} aria-hidden="true">
          <div className={styles.compassRing1} />
          <div className={styles.compassRing2} />
          <span className={styles.compassCore}>⚓</span>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div className={styles.sectionRule} />
          <h2 className={styles.sectionTitle}>⚙ Tools &amp; Calculators</h2>
          <div className={styles.sectionRule} />
        </div>
        <div className={styles.toolGrid}>
          {tools.map((t) => (
            <Link key={t.title} href={t.comingSoon ? '#' : t.href}
              className={`${styles.toolCard} ${t.comingSoon ? styles.dim : styles.toolCardActive}`}>
              <div className={styles.cardTop}>
                <span className={styles.cardIcon}>{t.icon}</span>
                <span className={styles.cardBadge}>{t.comingSoon ? 'Coming Soon' : t.type}</span>
              </div>
              <h3 className={styles.cardTitle}>{t.title}</h3>
              <p className={styles.cardDesc}>{t.desc}</p>
              <div className={styles.cardTags}>
                {t.tags.map((tag) => <span key={tag} className={styles.tag}>{tag}</span>)}
              </div>
              {!t.comingSoon && <div className={styles.cardCta}>Open →</div>}
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div className={styles.sectionRule} />
          <h2 className={styles.sectionTitle}>📜 Captain's Guides</h2>
          <div className={styles.sectionRule} />
        </div>
        <div className={styles.guideList}>
          {guides.map((g) => (
            <Link key={g.title} href={g.comingSoon ? '#' : g.href}
              className={`${styles.guideRow} ${g.comingSoon ? styles.dim : ''}`}>
              <span className={styles.guideAnchor}>⚓</span>
              <div className={styles.guideBody}>
                <div className={styles.guideTitle}>{g.title}</div>
                <div className={styles.guideDesc}>{g.desc}</div>
              </div>
              <span className={styles.guideArrow}>{g.comingSoon ? 'Soon' : '→'}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div className={styles.sectionRule} />
          <h2 className={styles.sectionTitle}>📰 Latest News</h2>
          <div className={styles.sectionRule} />
        </div>
        <div className={styles.newsNote}>
          World of Sea Battle updates appear on the <Link href="/" className={styles.newsLink}>Kernyx home feed</Link>. Filter by World of Sea Battle for just the latest releases.
        </div>
      </section>

      <footer className={styles.footer}>Kernyx · Unofficial fan site · Not affiliated with World of Sea Battle or its developers</footer>
    </div>
  );
}
