import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'Destiny 2 | Kernyx',
  description: 'Weapon DPS calculators, class builders, and guides for Destiny 2 Guardians.',
};

const tools = [
  {
    href: '/games/destiny-2/dps-calculator',
    icon: '🔫',
    title: 'Weapon DPS Calculator',
    desc: 'Compare weapons across all archetypes. Factor in damage perks, seasonal mods, and ability damage uptime for true DPS rankings.',
    tags: ['Weapons', 'DPS', 'Perks'],
    type: 'Calculator',
    comingSoon: true,
  },
  {
    href: '/games/destiny-2/class-builder',
    icon: '👤',
    title: 'Class Build Planner',
    desc: 'Assemble a full Guardian build — subclass, abilities, Aspects, Fragments, armor mods, and exotic synergies.',
    tags: ['Subclass', 'Fragments', 'Mods'],
    type: 'Builder',
    comingSoon: true,
  },
  {
    href: '/games/destiny-2/stat-optimizer',
    icon: '📊',
    title: 'Armor Stat Optimizer',
    desc: 'Calculate stat tiers from your armor rolls. Find the exact mod layout to reach 100s in your priority stats.',
    tags: ['Armor', 'Stats', 'Tiers'],
    type: 'Tool',
    comingSoon: true,
  },
];

const guides = [
  { href: '#', title: 'Endgame Build Archetypes', desc: 'The meta subclass loops, damage phases, and how to build into each role.', comingSoon: true },
  { href: '#', title: 'Raid Guide: Root of Nightmares', desc: 'Full encounter breakdown with callouts, roles, and damage strategies.', comingSoon: true },
  { href: '#', title: 'Grandmaster Nightfall Loadouts', desc: 'Recommended loadouts, champion mods, and positioning for current GMs.', comingSoon: true },
];

export default function Destiny2Page() {
  return (
    <div className={styles.page}>
      <div className={styles.hexBg} aria-hidden="true" />
      <div className={styles.voidGlow} aria-hidden="true" />

      <nav className={styles.breadcrumb}>
        <Link href="/" className={styles.bcLink}>Kernyx</Link>
        <span className={styles.bcSep}>/</span>
        <span className={styles.bcCurrent}>Destiny 2</span>
      </nav>

      <header className={styles.hero}>
        <div className={styles.heroLeft}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowPip} />
            GUARDIAN · DESTINY 2
          </p>
          <h1 className={styles.heroTitle}>
            Become<br /><em>Legend</em>
          </h1>
          <p className={styles.heroSub}>
            Weapon DPS comparisons, armor optimizers, and full build planners for Hunters, Titans, and Warlocks.
          </p>
          <div className={styles.classChips}>
            <span className={styles.chip}>Hunter</span>
            <span className={styles.chip}>Titan</span>
            <span className={styles.chip}>Warlock</span>
          </div>
        </div>
        <div className={styles.heroRight}>
          <div className={styles.ghostOrb}>
            <div className={styles.orbRing} style={{ '--r': '0px', '--s': '8s', '--dir': '1' } as any} />
            <div className={styles.orbRing} style={{ '--r': '15%', '--s': '5s', '--dir': '-1' } as any} />
            <div className={styles.orbRing} style={{ '--r': '30%', '--s': '12s', '--dir': '1' } as any} />
            <span className={styles.orbCore}>🌌</span>
          </div>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.secHead}>
          <span className={styles.secGlyph}>◈</span>
          <h2 className={styles.secTitle}>Tools &amp; Calculators</h2>
          <div className={styles.secLine} />
          <span className={styles.secCount}>{tools.length}</span>
        </div>
        <div className={styles.toolGrid}>
          {tools.map((t) => (
            <Link key={t.title} href={t.comingSoon ? '#' : t.href}
              className={`${styles.toolCard} ${t.comingSoon ? styles.dim : ''}`}>
              <div className={styles.cardGlowBar} />
              <div className={styles.cardTop}>
                <span className={styles.cardIcon}>{t.icon}</span>
                <span className={styles.cardBadge}>{t.comingSoon ? 'INCOMING' : t.type.toUpperCase()}</span>
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
        <div className={styles.secHead}>
          <span className={styles.secGlyph}>◈</span>
          <h2 className={styles.secTitle}>Field Guides</h2>
          <div className={styles.secLine} />
        </div>
        <div className={styles.guideList}>
          {guides.map((g, i) => (
            <Link key={g.title} href={g.comingSoon ? '#' : g.href}
              className={`${styles.guideRow} ${g.comingSoon ? styles.dim : ''}`}>
              <span className={styles.guideIdx}>{String(i + 1).padStart(2, '0')}</span>
              <div className={styles.guideBody}>
                <div className={styles.guideTitle}>{g.title}</div>
                <div className={styles.guideDesc}>{g.desc}</div>
              </div>
              <span className={styles.guideStatus}>{g.comingSoon ? 'INCOMING' : 'READ →'}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.secHead}>
          <span className={styles.secGlyph}>◈</span>
          <h2 className={styles.secTitle}>Bungie Transmissions</h2>
          <div className={styles.secLine} />
        </div>
        <div className={styles.newsNote}>
          Destiny 2 updates and TWID posts surface on the{' '}
          <Link href="/" className={styles.newsLink}>Kernyx home feed</Link>.
          Filter by Destiny 2 to monitor only Bungie transmissions.
        </div>
      </section>

      <footer className={styles.footer}>
        KERNYX // DESTINY 2 MODULE // UNOFFICIAL FAN TOOLS // NOT AFFILIATED WITH BUNGIE
      </footer>
    </div>
  );
}
