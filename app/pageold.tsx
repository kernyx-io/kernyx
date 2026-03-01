import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'Game Tools & Guides',
  description:
    'Calculators, guides, and tools for your favourite games.',
};

// ─── Content registry ──────────────────────────────────────────────────────
// Add new games / tools / guides here — the page renders them automatically.

const games = [
  {
    href: '/games/world-of-sea-battle',
    icon: '⚓',
    title: 'World of Sea Battle',
    desc: 'Artillery calculators, ship loadout tools, and combat guides for the high seas.',
    tags: ['Naval', 'Combat', 'Loadout'],
    badge: 'Active',
    badgeVariant: '',
  },
  // Add more games here:
  // {
  //   href: '/games/example',
  //   icon: '🎮',
  //   title: 'Example Game',
  //   desc: 'Description of tools available.',
  //   tags: ['Tag1', 'Tag2'],
  //   badge: 'Coming Soon',
  //   badgeVariant: '',
  //   comingSoon: true,
  // },
];

const calculators = [
  {
    href: '/games/world-of-sea-battle/calculator',
    icon: '💥',
    title: 'Cannon DPS Calculator',
    desc: 'Configure your broadside, pick ammo, crew, and attachments — get live damage output instantly.',
    tags: ['WoSB', 'Artillery', 'DPS'],
    badge: 'Live',
    badgeVariant: 'new',
  },
  // Add more calculators here
];

const guides: CardItem[] = [
  // Add guides here as you create them:
  // {
  //   href: '/guides/example',
  //   icon: '📖',
  //   title: 'Example Guide',
  //   desc: 'Guide description.',
  //   tags: ['WoSB'],
  //   badge: 'Guide',
  //   badgeVariant: '',
  // },
];

// ─── Types ─────────────────────────────────────────────────────────────────

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

// ─── Card component ────────────────────────────────────────────────────────

function Card({ item }: { item: CardItem }) {
  const cls = [styles.card, item.comingSoon ? styles.cardComingSoon : '']
    .filter(Boolean)
    .join(' ');

  return (
    <Link href={item.comingSoon ? '#' : item.href} className={cls}>
      <div className={styles.cardTop}>
        <span className={styles.cardIcon}>{item.icon}</span>
        <span
          className={[
            styles.cardBadge,
            item.badgeVariant === 'new' ? styles.new : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {item.badge}
        </span>
      </div>

      <div className={styles.cardTitle}>{item.title}</div>
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

// ─── Section component ─────────────────────────────────────────────────────

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
        <span className={styles.sectionIcon}>{icon}</span>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <span className={styles.sectionCount}>
          {items.filter((i) => !i.comingSoon).length} available
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

// ─── Page ──────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <header className={styles.hero}>
        <span className={styles.heroEmblem}>⚓</span>
        <h1 className={styles.heroTitle}>Game Tools &amp; Guides</h1>
        <p className={styles.heroSubtitle}>
          Calculators · Loadout Builders · Field Guides
        </p>
        <div className={styles.heroDivider} />
      </header>

      {/* Sections */}
      <main className={styles.content}>
        <Section icon="🎮" title="Games" items={games} />
        <Section icon="🧮" title="Calculators" items={calculators} />
        <Section icon="📖" title="Guides" items={guides} />
      </main>

      <footer className={styles.footer}>
        Unofficial fan tools · Not affiliated with any game developer
      </footer>
    </div>
  );
}
