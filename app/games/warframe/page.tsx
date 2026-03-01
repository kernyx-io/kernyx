import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'Warframe | Kernyx',
  description: 'Mod build planners, damage calculators, and guides for Warframe Tenno.',
};

const tools = [
  {
    href: '/games/warframe/mod-builder',
    icon: '🔧',
    title: 'Warframe Mod Builder',
    desc: 'Assemble a full mod configuration for any Warframe or weapon. See final stat values including ability strength, range, duration, and efficiency.',
    tags: ['Mods', 'Builds', 'Stats'],
    type: 'Builder',
    comingSoon: true,
  },
  {
    href: '/games/warframe/weapon-dps',
    icon: '🔫',
    title: 'Weapon DPS Calculator',
    desc: 'Calculate true weapon DPS accounting for crit chance, crit multiplier, status, multishot, and mod scaling.',
    tags: ['Weapons', 'DPS', 'Mods'],
    type: 'Calculator',
    comingSoon: true,
  },
  {
    href: '/games/warframe/ability-calc',
    icon: '⚡',
    title: 'Ability Damage Calculator',
    desc: 'Compute Warframe ability damage, range, and duration from your equipped mods and arcane combinations.',
    tags: ['Abilities', 'Strength', 'Arcanes'],
    type: 'Calculator',
    comingSoon: true,
  },
  {
    href: '/games/warframe/riven-analyzer',
    icon: '🌀',
    title: 'Riven Disposition Analyzer',
    desc: 'Evaluate riven mods using live WFCD disposition data. Compare stat weight for your weapon type.',
    tags: ['Rivens', 'Disposition', 'Market'],
    type: 'Tool',
    comingSoon: true,
  },
];

const guides = [
  { href: '#', title: 'Endgame Steel Path Build Theory', desc: 'Sustain, damage, and survivability tradeoffs for Steel Path and high-level content.', comingSoon: true },
  { href: '#', title: 'Mod Stacking & Diminishing Returns', desc: 'How multiplicative vs additive mod stacking actually works.', comingSoon: true },
  { href: '#', title: 'Arbitration & ESO Farm Rotations', desc: 'Best frames and loadouts for popular endless mission farms.', comingSoon: true },
];

export default function WarframePage() {
  return (
    <div className={styles.page}>
      <div className={styles.circuitBg} aria-hidden="true" />
      <div className={styles.voidBeam} aria-hidden="true" />

      <nav className={styles.breadcrumb}>
        <Link href="/" className={styles.bcLink}>Kernyx</Link>
        <span className={styles.bcSep}>—</span>
        <span className={styles.bcCurrent}>Warframe</span>
      </nav>

      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            🤖 Warframe · Tenno
            <span className={styles.eyebrowLine} />
          </p>
          <h1 className={styles.heroTitle}>
            Void-Forged<br /><em>Arsenal</em>
          </h1>
          <p className={styles.heroSub}>
            Mod builders, weapon DPS calculators, and ability analyzers — powered by WFCD and the Warframe public export data.
          </p>
          <div className={styles.heroGrid}>
            <div className={styles.heroGridCell}>
              <span className={styles.gridVal}>{tools.length}</span>
              <span className={styles.gridLabel}>Tools</span>
            </div>
            <div className={styles.heroGridCell}>
              <span className={styles.gridVal}>{guides.length}</span>
              <span className={styles.gridLabel}>Guides</span>
            </div>
            <div className={styles.heroGridCell}>
              <span className={styles.gridVal}>WFCD</span>
              <span className={styles.gridLabel}>Live Data</span>
            </div>
            <div className={styles.heroGridCell}>
              <span className={styles.gridVal}>F2P</span>
              <span className={styles.gridLabel}>Free to Play</span>
            </div>
          </div>
        </div>
        <div className={styles.heroOrokin} aria-hidden="true">
          <div className={styles.orokinFrame}>
            <div className={styles.orokinRing1} />
            <div className={styles.orokinRing2} />
            <div className={styles.orokinLines}>
              {[...Array(8)].map((_, i) => (
                <div key={i} className={styles.orokinLine} style={{ '--i': i } as any} />
              ))}
            </div>
            <div className={styles.orokinCore}>🤖</div>
          </div>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div className={styles.sectionDiamond} />
          <h2 className={styles.sectionTitle}>TENNO TOOLKIT</h2>
          <div className={styles.sectionLine} />
          <span className={styles.sectionCount}>{tools.length} modules</span>
        </div>
        <div className={styles.toolGrid}>
          {tools.map((t) => (
            <Link key={t.title} href={t.comingSoon ? '#' : t.href}
              className={`${styles.toolCard} ${t.comingSoon ? styles.dim : ''}`}>
              <div className={styles.cardOrokinTop} />
              <span className={styles.cardIcon}>{t.icon}</span>
              <div className={styles.cardMeta}>
                <span className={styles.cardType}>{t.comingSoon ? 'INSTALLING' : t.type.toUpperCase()}</span>
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
        <div className={styles.sectionHead}>
          <div className={styles.sectionDiamond} />
          <h2 className={styles.sectionTitle}>CODEX ENTRIES</h2>
          <div className={styles.sectionLine} />
        </div>
        <div className={styles.guideList}>
          {guides.map((g, i) => (
            <Link key={g.title} href={g.comingSoon ? '#' : g.href}
              className={`${styles.guideRow} ${g.comingSoon ? styles.dim : ''}`}>
              <div className={styles.guideMarker}>
                <span className={styles.guideNum}>{String(i + 1).padStart(2, '0')}</span>
                <div className={styles.guidePipe} />
              </div>
              <div className={styles.guideBody}>
                <div className={styles.guideTitle}>{g.title}</div>
                <div className={styles.guideDesc}>{g.desc}</div>
              </div>
              <span className={styles.guideTag}>{g.comingSoon ? 'PENDING' : 'ACCESS →'}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div className={styles.sectionDiamond} />
          <h2 className={styles.sectionTitle}>LOTUS TRANSMISSIONS</h2>
          <div className={styles.sectionLine} />
        </div>
        <div className={styles.newsNote}>
          Warframe updates and patch notes from the{' '}
          <Link href="/" className={styles.newsLink}>Kernyx home feed</Link>.
          Filter by Warframe to monitor Digital Extremes release transmissions.
        </div>
      </section>

      <footer className={styles.footer}>
        KERNYX — WARFRAME MODULE — UNOFFICIAL TENNO TOOLS — NOT AFFILIATED WITH DIGITAL EXTREMES
      </footer>
    </div>
  );
}
