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

/* ───────────────── Card ───────────────── */

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

/* ───────────────── Section ───────────────── */

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
          <span className={styles.heroBadge}>
            ⚡ Competitive Optimization Suite
          </span>

          <h1 className={styles.heroTitle}>
            Engineer Your Advantage.
          </h1>

          <p className={styles.heroSubtitle}>
            Build Smarter. Adapt Faster. Dominate Harder.
          </p>

          <p className={styles.heroDescription}>
            Kernyx is a modular analytics platform built to support multiple
            competitive titles. From stat calculators to meta analysis tools,
            we transform guesswork into measurable performance gains.
          </p>

          <div className={styles.heroActions}>
            <Link href="/games" className={styles.primaryBtn}>
              Browse Games
            </Link>
            <Link href="/games/world-of-sea-battle/calculator" className={styles.secondaryBtn}>
              Try Live Calculator
            </Link>
          </div>
        </div>
      </header>

      {/* TRUST STRIP */}
      <section className={styles.trustStrip}>
        <div>
          <strong>Data-Driven</strong>
          <p>Stat-based simulations and mechanical breakdowns.</p>
        </div>
        <div>
          <strong>Expandable</strong>
          <p>Built to scale across multiple competitive titles.</p>
        </div>
        <div>
          <strong>Community-Supported</strong>
          <p>Transparent tools built for serious players.</p>
        </div>
      </section>

      {/* FEATURED GAME SPOTLIGHT */}
      <section className={styles.spotlight}>
        <div className={styles.spotlightContent}>
          <h2>Now Live: World of Sea Battle</h2>
          <p>
            Configure artillery batteries, evaluate armor penetration,
            optimize crew bonuses, and calculate real-time damage output.
          </p>

          <div className={styles.spotlightActions}>
            <Link
              href="/games/world-of-sea-battle"
              className={styles.primaryBtn}
            >
              Enter Tools
            </Link>
          </div>
        </div>
      </section>

      {/* CORE CONTENT */}
      <main className={styles.content}>
        <Section icon="🎮" title="Games" items={games} />
        <Section icon="🧮" title="Calculators" items={calculators} />
        <Section icon="📖" title="Guides" items={guides} />
      </main>

      {/* ROADMAP */}
      <section className={styles.roadmap}>
        <h2>Platform Roadmap</h2>
        <ul>
          <li>✔ Multi-game registry framework</li>
          <li>✔ Modular calculator architecture</li>
          <li>⬜ User build saving & sharing</li>
          <li>⬜ Patch tracking & change logs</li>
          <li>⬜ AI-powered optimization assistant</li>
        </ul>
      </section>

      {/* AD / SUPPORT ZONE */}
      <section className={styles.monetization}>
        <div className={styles.adPlaceholder}>
          Advertisement Space (Responsive Banner)
        </div>

        <div className={styles.supportBox}>
          <h3>Support Kernyx</h3>
          <p>
            Development, hosting, and analytics are maintained independently.
            Support ensures continued expansion.
          </p>
          <Link href="/support" className={styles.primaryBtn}>
            Donate / Support
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div>Kernyx © {new Date().getFullYear()}</div>
        <div>Unofficial fan tools · Not affiliated with any game developer</div>
      </footer>
    </div>
  );
}
