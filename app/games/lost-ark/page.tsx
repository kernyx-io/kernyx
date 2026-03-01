import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'Lost Ark | Kernyx',
  description: 'Engraving calculators, class builds, and raid guides for Lost Ark.',
};

const tools = [
  {
    href: '/games/lost-ark/engraving-calculator',
    icon: '📿',
    title: 'Engraving Calculator',
    desc: 'Plan your engraving setup across accessories and ability stones to hit your target node counts as efficiently as possible.',
    tags: ['Engravings', 'Accessories', 'Stones'],
    type: 'Calculator',
    comingSoon: true,
  },
  {
    href: '/games/lost-ark/class-build-planner',
    icon: '⚔️',
    title: 'Class Build Planner',
    desc: 'Build your character with skill points, tripod selections, rune slots, and gem levels for any endgame role.',
    tags: ['Skills', 'Tripods', 'Gems'],
    type: 'Builder',
    comingSoon: true,
  },
  {
    href: '/games/lost-ark/honing-calculator',
    icon: '🔨',
    title: 'Honing Cost Calculator',
    desc: 'Estimate gold and material cost to hone your gear to a target item level. Factor in artisan energy and materials.',
    tags: ['Honing', 'Gold', 'Materials'],
    type: 'Calculator',
    comingSoon: true,
  },
  {
    href: '/games/lost-ark/dps-estimator',
    icon: '💢',
    title: 'DPS Estimator',
    desc: 'Estimate theoretical damage output per class archetype, engraving combination, and skill rotation.',
    tags: ['DPS', 'Rotation', 'Classes'],
    type: 'Calculator',
    comingSoon: true,
  },
];

const guides = [
  { href: '#', title: 'Endgame Progression Roadmap', desc: 'From 1302 to Tier 4 — every step, material gate, and milestone explained.', comingSoon: true },
  { href: '#', title: 'Engraving System Deep Dive', desc: 'How to budget accessories, ability stones, and books for optimal setups.', comingSoon: true },
  { href: '#', title: 'Raid Mechanics: Brelshaza', desc: 'Phase-by-phase breakdown of every mechanic across Normal and Hard modes.', comingSoon: true },
];

export default function LostArkPage() {
  return (
    <div className={styles.page}>
      <div className={styles.bgPattern} aria-hidden="true" />

      <nav className={styles.breadcrumb}>
        <Link href="/" className={styles.bcLink}>Kernyx</Link>
        <span className={styles.bcSep}>›</span>
        <span className={styles.bcCurrent}>Lost Ark</span>
      </nav>

      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>🗺️ Lost Ark</p>
          <h1 className={styles.heroTitle}>Rise to the<br /><em>Pinnacle</em></h1>
          <p className={styles.heroSub}>
            Engraving planners, honing calculators, and raid guides for Arkesia's finest adventurers.
          </p>
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statNum}>{tools.length}</span>
              <span className={styles.statLabel}>Tools</span>
            </div>
            <div className={styles.statDiv} />
            <div className={styles.stat}>
              <span className={styles.statNum}>{guides.length}</span>
              <span className={styles.statLabel}>Guides</span>
            </div>
            <div className={styles.statDiv} />
            <div className={styles.stat}>
              <span className={styles.statNum}>API</span>
              <span className={styles.statLabel}>Smilegate Official</span>
            </div>
          </div>
        </div>
        <div className={styles.heroEmblem} aria-hidden="true">
          <div className={styles.emblemRing1} />
          <div className={styles.emblemRing2} />
          <div className={styles.emblemRing3} />
          <span className={styles.emblemCore}>🗺️</span>
        </div>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.sectionLine} />
          Tools &amp; Calculators
          <span className={styles.sectionLine} />
        </h2>
        <div className={styles.toolGrid}>
          {tools.map((t) => (
            <Link key={t.title} href={t.comingSoon ? '#' : t.href}
              className={`${styles.toolCard} ${t.comingSoon ? styles.dim : ''}`}>
              <div className={styles.cardCornerTL} />
              <div className={styles.cardCornerBR} />
              <div className={styles.cardTop}>
                <span className={styles.cardIcon}>{t.icon}</span>
                <span className={styles.cardBadge}>{t.comingSoon ? 'Soon' : t.type}</span>
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

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.sectionLine} />
          Guides
          <span className={styles.sectionLine} />
        </h2>
        <div className={styles.guideList}>
          {guides.map((g) => (
            <Link key={g.title} href={g.comingSoon ? '#' : g.href}
              className={`${styles.guideRow} ${g.comingSoon ? styles.dim : ''}`}>
              <span className={styles.guideGlyph}>✦</span>
              <div className={styles.guideBody}>
                <div className={styles.guideTitle}>{g.title}</div>
                <div className={styles.guideDesc}>{g.desc}</div>
              </div>
              <span className={styles.guideStatus}>{g.comingSoon ? 'Coming Soon' : '→'}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.sectionLine} />
          Latest News
          <span className={styles.sectionLine} />
        </h2>
        <div className={styles.newsNote}>
          Lost Ark patch notes and announcements appear on the{' '}
          <Link href="/" className={styles.newsLink}>Kernyx home feed</Link>.
          Filter by Lost Ark to see only Smilegate and Amazon Games updates.
        </div>
      </section>

      <footer className={styles.footer}>
        Kernyx · Unofficial fan site · Not affiliated with Smilegate or Amazon Games
      </footer>
    </div>
  );
}
