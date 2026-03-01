import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'Path of Exile 2 | Kernyx',
  description: 'Passive tree planners, skill gem calculators, and build guides for Path of Exile 2.',
};

const tools = [
  {
    href: '/games/path-of-exile-2/passive-planner',
    icon: '🌳',
    title: 'Passive Tree Planner',
    desc: 'Map your passive skill tree path from any starting class. Calculate total stat allocations and plan ascendancy node routes.',
    tags: ['Passive Tree', 'Ascendancy', 'Stats'],
    type: 'Planner',
    comingSoon: true,
  },
  {
    href: '/games/path-of-exile-2/skill-gem-calc',
    icon: '💎',
    title: 'Skill Gem Calculator',
    desc: 'Compute skill gem damage scaling, support gem interactions, and total damage per cast at any gem level.',
    tags: ['Skill Gems', 'Supports', 'Scaling'],
    type: 'Calculator',
    comingSoon: true,
  },
  {
    href: '/games/path-of-exile-2/build-planner',
    icon: '📜',
    title: 'Build Archetype Planner',
    desc: 'Design a full build around a damage type and skill — gear slots, flask setups, and keystones included.',
    tags: ['Build', 'Keystones', 'Gear'],
    type: 'Builder',
    comingSoon: true,
  },
];

const guides = [
  { href: '#', title: 'Endgame Atlas Strategy', desc: 'Waystone routing, Breach, Delirium, and map sustain strategies for the endgame atlas.', comingSoon: true },
  { href: '#', title: 'Currency Crafting Primer', desc: 'Orb usage hierarchy, fractured bases, and when to stop crafting.', comingSoon: true },
  { href: '#', title: 'Leveling Any Class: Acts 1–6', desc: 'Efficient act routing, skill transitions, and every act boss strategy.', comingSoon: true },
];

export default function Poe2Page() {
  return (
    <div className={styles.page}>
      <div className={styles.vignette} aria-hidden="true" />

      <nav className={styles.breadcrumb}>
        <Link href="/" className={styles.bcLink}>Kernyx</Link>
        <span className={styles.bcSep}>·</span>
        <span className={styles.bcCurrent}>Path of Exile 2</span>
      </nav>

      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>💀 Path of Exile 2</p>
          <h1 className={styles.heroTitle}>
            Into the<br /><em>Darkness</em>
          </h1>
          <p className={styles.heroSub}>
            Passive tree planners, skill gem calculators, and build guides for the exiles of Wraeclast.
          </p>
          <div className={styles.heroDivider} />
          <div className={styles.heroBadges}>
            <span className={styles.badge}>Early Access</span>
            <span className={styles.badge}>{tools.length} Tools</span>
            <span className={styles.badge}>GGG RSS</span>
          </div>
        </div>
        <div className={styles.heroCrest} aria-hidden="true">
          <div className={styles.crestOuter} />
          <div className={styles.crestMid} />
          <span className={styles.crestCore}>☠</span>
        </div>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.sglyph}>⚗</span>
          Tools &amp; Calculators
        </h2>
        <div className={styles.toolGrid}>
          {tools.map((t) => (
            <Link key={t.title} href={t.comingSoon ? '#' : t.href}
              className={`${styles.toolCard} ${t.comingSoon ? styles.dim : ''}`}>
              <div className={styles.cardSidebar} />
              <div className={styles.cardInner}>
                <div className={styles.cardTop}>
                  <span className={styles.cardIcon}>{t.icon}</span>
                  <span className={styles.cardBadge}>{t.comingSoon ? 'INSCRIBED SOON' : t.type.toUpperCase()}</span>
                </div>
                <h3 className={styles.cardTitle}>{t.title}</h3>
                <p className={styles.cardDesc}>{t.desc}</p>
                <div className={styles.cardTags}>
                  {t.tags.map((tag) => <span key={tag} className={styles.tag}>{tag}</span>)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.sglyph}>⚗</span>
          Exile Codex
        </h2>
        <div className={styles.guideList}>
          {guides.map((g) => (
            <Link key={g.title} href={g.comingSoon ? '#' : g.href}
              className={`${styles.guideRow} ${g.comingSoon ? styles.dim : ''}`}>
              <div className={styles.guideBar} />
              <div className={styles.guideBody}>
                <div className={styles.guideTitle}>{g.title}</div>
                <div className={styles.guideDesc}>{g.desc}</div>
              </div>
              <span className={styles.guideStatus}>{g.comingSoon ? 'SOON' : '→'}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.sglyph}>⚗</span>
          Prophecies &amp; Patch Notes
        </h2>
        <div className={styles.newsNote}>
          GGG patch notes and announcements from the official RSS feed appear on the{' '}
          <Link href="/" className={styles.newsLink}>Kernyx home feed</Link>.
          Filter by Path of Exile 2 to receive direct transmissions.
        </div>
      </section>

      <footer className={styles.footer}>
        Kernyx · Unofficial fan site · Not affiliated with Grinding Gear Games
      </footer>
    </div>
  );
}
