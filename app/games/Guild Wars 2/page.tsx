import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'Guild Wars 2 | Kernyx',
  description: 'Build planners, gear optimizers, and strategy guides for Guild Wars 2.',
};

const tools = [
  {
    href: '/games/guild-wars-2/build-planner',
    icon: '🛡️',
    title: 'Build Planner',
    desc: 'Construct full builds with profession, specializations, traits, and skills. Share or export your setup with live ArenaNet API data.',
    tags: ['Traits', 'Skills', 'Specialization'],
    type: 'Builder',
    comingSoon: true,
  },
  {
    href: '/games/guild-wars-2/dps-calculator',
    icon: '⚔️',
    title: 'DPS Calculator',
    desc: 'Calculate sustained and burst damage output for any weapon set and boon configuration.',
    tags: ['Damage', 'Boons', 'Rotation'],
    type: 'Calculator',
    comingSoon: true,
  },
  {
    href: '/games/guild-wars-2/gear-optimizer',
    icon: '💎',
    title: 'Gear Stat Optimizer',
    desc: 'Find the optimal stat prefix combination for your build using live itemstat API data from ArenaNet.',
    tags: ['Stats', 'Gear', 'Optimization'],
    type: 'Tool',
    comingSoon: true,
  },
];

const guides = [
  {
    href: '#',
    title: 'Endgame Build Fundamentals',
    desc: 'Understanding the boon system, breakbars, and stat priority for endgame content.',
    comingSoon: true,
  },
  {
    href: '#',
    title: 'Raid & Strike Composition Guide',
    desc: 'Wing-by-wing breakdown of mechanics, recommended compositions, and positioning.',
    comingSoon: true,
  },
  {
    href: '#',
    title: 'WvW Roamer Build Theory',
    desc: 'Sustain, burst, and mobility tradeoffs for solo and group World vs World play.',
    comingSoon: true,
  },
];

export default function GuildWars2Page() {
  return (
    <div className={styles.page}>
      <div className={styles.bgTexture} aria-hidden="true" />

      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <Link href="/" className={styles.bcLink}>Kernyx</Link>
        <span className={styles.bcSep}>›</span>
        <span className={styles.bcCurrent}>Guild Wars 2</span>
      </nav>

      {/* Hero */}
      <header className={styles.hero}>
        <div className={styles.heroOrb} />
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>⚔️ Guild Wars 2</p>
          <h1 className={styles.heroTitle}>Forge Your<br /><em>Legend</em></h1>
          <p className={styles.heroSub}>
            Build planners, gear optimizers, and raid guides for Tyria's greatest warriors — powered by the live ArenaNet API.
          </p>
          <div className={styles.heroDivider} />
          <div className={styles.heroMeta}>
            <span>ArenaNet API</span>
            <span className={styles.metaDot} />
            <span>{tools.length} Tools</span>
            <span className={styles.metaDot} />
            <span>{guides.length} Guides</span>
          </div>
        </div>
        <div className={styles.heroKnot} aria-hidden="true">
          <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="80" cy="80" r="74" stroke="#7ab87a" strokeWidth="0.8" opacity="0.25"/>
            <circle cx="80" cy="80" r="58" stroke="#c8a84b" strokeWidth="0.5" strokeDasharray="5 5" opacity="0.2"/>
            <circle cx="80" cy="80" r="40" stroke="#7ab87a" strokeWidth="0.8" opacity="0.2"/>
            <path d="M80 20 L92 54 L128 54 L99 74 L110 110 L80 90 L50 110 L61 74 L32 54 L68 54 Z"
              stroke="#a3c4a3" strokeWidth="1" fill="none" opacity="0.3"/>
            <circle cx="80" cy="80" r="8" stroke="#c8a84b" strokeWidth="0.8" opacity="0.4"/>
          </svg>
        </div>
      </header>

      {/* Tools */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div className={styles.sectionRule} />
          <h2 className={styles.sectionTitle}>⚙ Tools &amp; Calculators</h2>
          <div className={styles.sectionRule} />
        </div>
        <div className={styles.toolGrid}>
          {tools.map((t) => (
            <Link key={t.title} href={t.comingSoon ? '#' : t.href}
              className={`${styles.toolCard} ${t.comingSoon ? styles.dim : ''}`}>
              <div className={styles.cardTopRow}>
                <span className={styles.cardIcon}>{t.icon}</span>
                <span className={styles.cardBadge}>{t.comingSoon ? 'Coming Soon' : t.type}</span>
              </div>
              <h3 className={styles.cardTitle}>{t.title}</h3>
              <p className={styles.cardDesc}>{t.desc}</p>
              <div className={styles.cardTags}>
                {t.tags.map((tag) => <span key={tag} className={styles.tag}>{tag}</span>)}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Guides */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div className={styles.sectionRule} />
          <h2 className={styles.sectionTitle}>📜 Guides</h2>
          <div className={styles.sectionRule} />
        </div>
        <div className={styles.guideList}>
          {guides.map((g) => (
            <Link key={g.title} href={g.comingSoon ? '#' : g.href}
              className={`${styles.guideRow} ${g.comingSoon ? styles.dim : ''}`}>
              <span className={styles.guideGlyph}>✦</span>
              <div className={styles.guideBody}>
                <div className={styles.guideTitle}>{g.title}</div>
                <div className={styles.guideDesc}>{g.desc}</div>
              </div>
              <span className={styles.guideArrow}>{g.comingSoon ? 'Soon' : '→'}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* News */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div className={styles.sectionRule} />
          <h2 className={styles.sectionTitle}>📰 Latest News</h2>
          <div className={styles.sectionRule} />
        </div>
        <div className={styles.newsNote}>
          Guild Wars 2 patch notes and announcements appear on the{' '}
          <Link href="/" className={styles.newsLink}>Kernyx home feed</Link>.
          Filter by GW2 to see only ArenaNet updates.
        </div>
      </section>

      <footer className={styles.footer}>
        Kernyx · Unofficial fan site · Not affiliated with ArenaNet or NCSoft
      </footer>
    </div>
  );
}
