import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'Game Tools & Guides',
  description:
    'Calculators, guides, and tools for your favourite games.',
};

/* ─────────────────────────────────────────────
   Content Registry
   Add new games / tools / guides here only.
   The UI renders automatically.
───────────────────────────────────────────── */

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
      'Artillery calculators, ship loadout tools, and combat guides for the high seas.',
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
      'Configure your broadside, pick ammo, crew, and attachments — get live damage output instantly.',
    tags: ['WoSB', 'Artillery', 'DPS'],
    badge: 'Live',
    badgeVariant: 'new',
  },
];

const guides: CardItem[] = [];

/* ─────────────────────────────────────────────
   Card Component
───────────────────────────────────────────── */

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

/* ─────────────────────────────────────────────
   Section Component
───────────────────────────────────────────── */

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

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */

export default function HomePage() {
  return (
    <div className={styles.page}>

      {/* HERO */}
      <header className={styles.hero}>
        <div className={styles.heroGlow} />

        <div className={styles.heroInner}>
          <span className={styles.heroEmblem}>🎯</span>

          <h1 className={styles.heroTitle}>
            Competitive Game Optimization Platform
          </h1>

          <p className={styles.heroSubtitle}>
            Build Calculators · Strategy Guides · Performance Tools
          </p>

          <p className={styles.heroDescription}>
            Advanced analytics and build systems designed to help players
            optimize loadouts, understand meta shifts, and gain a competitive
            edge across multiple game ecosystems.
          </p>

          <div className={styles.heroActions}>
            <Link href="/games" className={styles.primaryBtn}>
              Explore Games
            </Link>

            <Link href="/support" className={styles.secondaryBtn}>
              Support the Project
            </Link>
          </div>
        </div>
      </header>

      {/* FEATURE STRIP */}
      <section className={styles.featureStrip}>
        <div className={styles.featureItem}>
          <span>⚙</span>
          <div>
            <strong>Dynamic Calculators</strong>
            <p>Live stat breakdowns and performance simulation tools.</p>
          </div>
        </div>

        <div className={styles.featureItem}>
          <span>📊</span>
          <div>
            <strong>Meta Insights</strong>
            <p>Understand balance shifts and optimal builds.</p>
          </div>
        </div>

        <div className={styles.featureItem}>
          <span>🌍</span>
          <div>
            <strong>Multi-Game Platform</strong>
            <p>Unified ecosystem built to scale across titles.</p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className={styles.content}>
        <Section icon="🎮" title="Games" items={games} />
        <Section icon="🧮" title="Calculators" items={calculators} />
        <Section icon="📖" title="Guides" items={guides} />
      </main>

      {/* SUPPORT STRIP */}
      <section className={styles.supportStrip}>
        <div className={styles.supportContent}>
          <div>
            <h3>Support Development</h3>
            <p>
              Hosting, analytics, and continuous updates are supported by the
              community.
            </p>
          </div>
          <Link href="/support" className={styles.primaryBtn}>
            Donate / Support
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div>
          <strong>Kernyx</strong> — Competitive Optimization Tools
        </div>
        <div>
          Unofficial fan tools · Not affiliated with any game developer
        </div>
      </footer>
    </div>
  );
}
