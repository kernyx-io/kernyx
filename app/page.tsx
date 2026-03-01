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
    desc:
      'Naval artillery optimization, ship loadout engineering, and tactical dominance tools.',
    tags: ['Naval', 'Combat', 'Loadout'],
    badge: 'Active',
  },
];

const calculators: CardItem[] = [
  {
    href: '/games/world-of-sea-battle/calculator',
    icon: '💥',
    title: 'Cannon DPS Calculator',
    desc:
      'Simulate broadside configurations with ammo, crew, and attachment modifiers.',
    tags: ['Artillery', 'DPS', 'Optimization'],
    badge: 'Live',
    badgeVariant: 'new',
  },
];

const guides: CardItem[] = [];

/* ───────────────── Card Component ───────────────── */

function Card({ item }: { item: CardItem }) {
  return (
    <Link
      href={item.comingSoon ? '#' : item.href}
      className={`${styles.card} ${
        item.comingSoon ? styles.cardComingSoon : ''
      }`}
    >
      <div className={styles.cardTop}>
        <span className={styles.cardIcon}>{item.icon}</span>
        <span
          className={`${styles.cardBadge} ${
            item.badgeVariant === 'new' ? styles.new : ''
          }`}
        >
          {item.badge}
        </span>
      </div>

      <h3 className={styles.cardTitle}>{item.title}</h3>
      <p className={styles.cardDesc}>{item.desc}</p>

      <div className={styles.cardFooter}>
        <div className={styles.cardTags}>
          {item.tags.map((t) => (
            <span key={t} className={styles.tag}>
              {t}
            </span>
          ))}
        </div>
        {!item.comingSoon && <span className={styles.cardArrow}>→</span>}
      </div>
    </Link>
  );
}

/* ───────────────── Section Component ───────────────── */

function Section({
  icon,
  title,
  items,
}: {
  icon: string;
  title: string;
  items: CardItem[];
}) {
  if (items.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <span>{icon}</span>
        <h2>{title}</h2>
        <span className={styles.sectionCount}>
          {items.filter((i) => !i.comingSoon).length} Available
        </span>
      </div>

      <div className={styles.grid}>
        {items.map((item) => (
          <Card key={item.href} item={item} />
        ))}
      </div>
    </section>
  );
}

/* ───────────────── Page ───────────────── */

export default function HomePage() {
  return (
    <div className={styles.page}>

      {/* HERO */}
      <header className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Engineer Your Advantage.
          </h1>
          <p className={styles.heroSubtitle}>
            Every stat matters.
          </p>
        </div>
      </header>

      {/* CORE CONTENT */}
      <main className={styles.content}>
        <Section icon="🎮" title="Games" items={games} />
        <Section icon="🧮" title="Calculators" items={calculators} />
        <Section icon="📖" title="Guides" items={guides} />
      </main>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div>Kernyx © {new Date().getFullYear()}</div>
        <div>
          Unofficial fan tools · Not affiliated with any game developer
        </div>
      </footer>

    </div>
  );
}
