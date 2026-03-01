import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'Kernyx | Competitive Game Optimization Platform',
  description:
    'Advanced build calculators, meta tools, and strategy guides for competitive games.',
};

/* ─── Types ─────────────────────────────────────────── */

type Game = {
  id: string;
  href: string;
  icon: string;
  name: string;
  color: string;
};

type ContentItem = {
  href: string;
  game: string;
  gameColor: string;
  icon: string;
  title: string;
  desc: string;
  tags: string[];
  type: 'Calculator' | 'Guide' | 'Tool';
  comingSoon?: boolean;
};

/* ─── Data ──────────────────────────────────────────── */

const games: Game[] = [
  {
    id: 'wosb',
    href: '/games/world-of-sea-battle',
    icon: '⚓',
    name: 'World of Sea Battle',
    color: '#00b4d8',
  },
  // Add more games here
];

const featured: ContentItem = {
  href: '/games/world-of-sea-battle/calculator',
  game: 'World of Sea Battle',
  gameColor: '#00b4d8',
  icon: '💥',
  title: 'Cannon DPS Calculator',
  desc: 'Simulate every broadside configuration — pick your ship, load ammo, assign crew, and stack attachments to see live damage projections before you ever set sail.',
  tags: ['Artillery', 'DPS', 'Optimization'],
  type: 'Calculator',
};

const allContent: ContentItem[] = [
  {
    href: '/games/world-of-sea-battle/calculator',
    game: 'World of Sea Battle',
    gameColor: '#00b4d8',
    icon: '💥',
    title: 'Cannon DPS Calculator',
    desc: 'Simulate broadside configurations with ammo, crew, and attachment modifiers.',
    tags: ['Artillery', 'DPS'],
    type: 'Calculator',
  },
  {
    href: '#',
    game: 'World of Sea Battle',
    gameColor: '#00b4d8',
    icon: '📖',
    title: 'Naval Strategy Guide',
    desc: 'Fleet composition theory, broadside positioning, and competitive meta breakdowns.',
    tags: ['Strategy', 'Meta'],
    type: 'Guide',
    comingSoon: true,
  },
  // Add more tools/guides here
];

/* ─── Components ────────────────────────────────────── */

function SidebarGame({ game }: { game: Game }) {
  return (
    <Link href={game.href} className={styles.sidebarGame}>
      <span className={styles.sidebarGameIcon} style={{ color: game.color }}>
        {game.icon}
      </span>
      <span className={styles.sidebarGameName}>{game.name}</span>
    </Link>
  );
}

function ContentRow({ item }: { item: ContentItem }) {
  return (
    <Link
      href={item.comingSoon ? '#' : item.href}
      className={`${styles.row} ${item.comingSoon ? styles.rowDim : ''}`}
    >
      <div className={styles.rowIcon}>{item.icon}</div>
      <div className={styles.rowBody}>
        <div className={styles.rowMeta}>
          <span className={styles.rowGame} style={{ color: item.gameColor }}>
            {item.game}
          </span>
          <span className={styles.rowType}>
            {item.comingSoon ? 'Coming Soon' : item.type}
          </span>
        </div>
        <div className={styles.rowTitle}>{item.title}</div>
        <div className={styles.rowDesc}>{item.desc}</div>
      </div>
      <div className={styles.rowTags}>
        {item.tags.map((t) => (
          <span key={t} className={styles.tag}>{t}</span>
        ))}
      </div>
    </Link>
  );
}

/* ─── Page ──────────────────────────────────────────── */

export default function HomePage() {
  return (
    <div className={styles.page}>

      {/* Top nav */}
      <nav className={styles.topNav}>
        <div className={styles.topNavLogo}>
          <span className={styles.logoMark}>K</span>
          <span className={styles.logoText}>ERNYX</span>
        </div>
        <div className={styles.topNavLinks}>
          <Link href="/" className={styles.topNavLink}>Home</Link>
          <Link href="/games/world-of-sea-battle" className={styles.topNavLink}>Games</Link>
        </div>
        <div className={styles.topNavTag}>Unofficial Fan Tools</div>
      </nav>

      {/* Body */}
      <div className={styles.body}>

        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarSection}>
            <div className={styles.sidebarLabel}>Browse Games</div>
            {games.map((g) => (
              <SidebarGame key={g.id} game={g} />
            ))}
          </div>
          <div className={styles.sidebarSection}>
            <div className={styles.sidebarLabel}>Quick Links</div>
            <Link href="/games/world-of-sea-battle/calculator" className={styles.sidebarLink}>
              💥 Cannon DPS Calc
            </Link>
          </div>
        </aside>

        {/* Main */}
        <main className={styles.main}>

          {/* Featured */}
          <div className={styles.featuredWrap}>
            <div className={styles.featuredLabel}>
              <span className={styles.featuredDot} style={{ background: featured.gameColor }} />
              Featured Tool
            </div>
            <Link href={featured.href} className={styles.featured}>
              <div className={styles.featuredLeft}>
                <div className={styles.featuredGame} style={{ color: featured.gameColor }}>
                  {featured.game}
                </div>
                <h2 className={styles.featuredTitle}>{featured.title}</h2>
                <p className={styles.featuredDesc}>{featured.desc}</p>
                <div className={styles.featuredTags}>
                  {featured.tags.map((t) => (
                    <span key={t} className={styles.tag}>{t}</span>
                  ))}
                </div>
              </div>
              <div className={styles.featuredRight}>
                <span className={styles.featuredIcon}>{featured.icon}</span>
                <span className={styles.featuredCta}>Open Calculator →</span>
              </div>
            </Link>
          </div>

          {/* List */}
          <div className={styles.listWrap}>
            <div className={styles.listHeader}>
              <span className={styles.listTitle}>All Tools &amp; Guides</span>
              <span className={styles.listCount}>
                {allContent.filter((i) => !i.comingSoon).length} available
              </span>
            </div>
            <div className={styles.list}>
              {allContent.map((item) => (
                <ContentRow key={item.title} item={item} />
              ))}
            </div>
          </div>

        </main>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <span>Kernyx © {new Date().getFullYear()}</span>
        <span>Unofficial fan tools · Not affiliated with any game developer</span>
      </footer>

    </div>
  );
}
