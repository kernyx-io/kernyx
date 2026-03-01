import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'Kernyx | Competitive Game Optimization Platform',
  description:
    'Advanced build calculators, meta tools, and strategy guides for competitive games.',
};

type CardItem = {
  href: string;
  icon: string;
  title: string;
  desc: string;
  tags: string[];
  badge: string;
  badgeVariant?: string;
  comingSoon?: boolean;
};

const games: CardItem[] = [
  {
    href: '/games/world-of-sea-battle',
    icon: '⚓',
    title: 'World of Sea Battle',
    desc: 'Naval artillery optimization, ship loadout engineering, and tactical dominance tools.',
    tags: ['Naval', 'Combat', 'Loadout'],
    badge: 'Active',
  },
];

const calculators: CardItem[] = [
  {
    href: '/games/world-of-sea-battle/calculator',
    icon: '💥',
    title: 'Cannon DPS Calculator',
    desc: 'Simulate broadside configurations with ammo, crew, and attachment modifiers.',
    tags: ['Artillery', 'DPS', 'Optimization'],
    badge: 'Live',
    badgeVariant: 'new',
  },
];

const guides: CardItem[] = [
  {
    href: '#',
    icon: '📖',
    title: 'World of Sea Battle Strategy Guide',
    desc: 'Advanced fleet composition theory, broadside positioning tactics, and competitive naval meta breakdowns.',
    tags: ['WoSB', 'Strategy', 'Meta'],
    badge: 'Coming Soon',
    comingSoon: true,
  },
];

/* ─── Card ─────────────────────────────────────────── */

function Card({ item }: { item: CardItem }) {
  return (
    <Link
      href={item.comingSoon ? '#' : item.href}
      className={`${styles.card} ${item.comingSoon ? styles.cardComingSoon : ''}`}
    >
      <div className={styles.cardTop}>
        <span className={styles.cardIcon}>{item.icon}</span>
        <span className={`${styles.cardBadge} ${item.badgeVariant === 'new' ? styles.new : ''}`}>
          {item.badge}
        </span>
      </div>

      <h3 className={styles.cardTitle}>{item.title}</h3>
      <p className={styles.cardDesc}>{item.desc}</p>

      <div className={styles.cardFooter}>
        <div className={styles.cardTags}>
          {item.tags.map((t) => (
            <span key={t} className={styles.tag}>{t}</span>
          ))}
        </div>
        {!item.comingSoon && <span className={styles.cardArrow}>→</span>}
      </div>
    </Link>
  );
}

/* ─── Section ───────────────────────────────────────── */

function Section({ icon, title, items }: { icon: string; title: string; items: CardItem[] }) {
  if (items.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <span>{icon}</span>
        <h2>{title}</h2>
        <div className={styles.sectionLine} />
        <span className={styles.sectionCount}>
          {items.filter((i) => !i.comingSoon).length}_AVAILABLE
        </span>
      </div>
      <div className={styles.grid}>
        {items.map((item) => (
          <Card key={item.title} item={item} />
        ))}
      </div>
    </section>
  );
}

/* ─── Page ──────────────────────────────────────────── */

export default function HomePage() {
  const totalTools = calculators.length + guides.filter((g) => !g.comingSoon).length;
  const totalGames = games.length;

  return (
    <div className={styles.page}>

      {/* ── Hero ── */}
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroEyebrow}>SYS::KERNYX_v1.0</div>
          <h1 className={styles.heroTitle}>
            Engineer Your <em>Advantage.</em>
          </h1>
          <p className={styles.heroSubtitle}>
            {'>'} Precision tools for competitive players. Every stat. Every edge.
          </p>
        </div>

        <div className={styles.heroDiag}>
          <div className={styles.heroStat}>
            <div className={styles.heroStatNum}>{totalTools}</div>
            <div className={styles.heroStatLabel}>Tools Online</div>
            <div className={styles.heroStatNum} style={{ marginTop: '1.5rem' }}>{totalGames}</div>
            <div className={styles.heroStatLabel}>Games Supported</div>
          </div>
        </div>
      </header>

      {/* ── Status bar ── */}
      <div className={styles.statusBar}>
        <div className={styles.statusItem}>
          <span className={styles.statusDot} />
          <span>CALCULATORS</span>
          <span className={styles.statusVal}>ONLINE</span>
        </div>
        <div className={styles.statusItem}>
          <span className={styles.statusDot} />
          <span>DATA</span>
          <span className={styles.statusVal}>LIVE</span>
        </div>
        <div className={styles.statusItem}>
          <span className={`${styles.statusDot} ${styles.statusDotIdle}`} />
          <span>GUIDES</span>
          <span className={styles.statusVal}>PENDING</span>
        </div>
        <div className={styles.statusItem}>
          <span className={`${styles.statusDot} ${styles.statusDotIdle}`} />
          <span>BUILD</span>
          <span className={styles.statusVal}>STABLE</span>
        </div>
      </div>

      {/* ── Content ── */}
      <main className={styles.content}>
        <Section icon="🎮" title="Games" items={games} />
        <Section icon="🧮" title="Calculators" items={calculators} />
        <Section icon="📚" title="Guides" items={guides} />
      </main>

      {/* ── Footer ── */}
      <footer className={styles.footer}>
        <div>KERNYX © {new Date().getFullYear()} // UNOFFICIAL FAN TOOLS</div>
        <div>NOT AFFILIATED WITH ANY GAME DEVELOPER</div>
      </footer>

    </div>
  );
}
