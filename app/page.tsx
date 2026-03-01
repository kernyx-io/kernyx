'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import type { NewsItem } from './api/news/route';

/* ─── Static data ────────────────────────────────────── */

const GAMES = [
  {
    id: 'wosb',
    name: 'World of Sea Battle',
    color: '#00b4d8',
    icon: '⚓',
    href: '/games/world-of-sea-battle',
    storeUrl: 'https://store.steampowered.com/app/2544340/World_of_Sea_Battle/',
    storeLabel: 'Steam',
  },
  {
    id: 'gw2',
    name: 'Guild Wars 2',
    color: '#c8a84b',
    icon: '⚔️',
    href: '/games/guild-wars-2',
    storeUrl: 'https://www.guildwars2.com/en/buy-now/',
    storeLabel: 'Official Store',
  },
  {
    id: 'lostark',
    name: 'Lost Ark',
    color: '#e8a000',
    icon: '🗺️',
    href: '/games/lost-ark',
    storeUrl: 'https://store.steampowered.com/app/1599340/Lost_Ark/',
    storeLabel: 'Steam',
  },
  {
    id: 'destiny2',
    name: 'Destiny 2',
    color: '#b07aff',
    icon: '🌌',
    href: '/games/destiny-2',
    storeUrl: 'https://store.steampowered.com/app/1085660/Destiny_2/',
    storeLabel: 'Steam',
  },
  {
    id: 'poe2',
    name: 'Path of Exile 2',
    color: '#ff6b35',
    icon: '💀',
    href: '/games/path-of-exile-2',
    storeUrl: 'https://store.steampowered.com/app/2694490/Path_of_Exile_2/',
    storeLabel: 'Steam (F2P)',
  },
  {
    id: 'warframe',
    name: 'Warframe',
    color: '#4fc3f7',
    icon: '🤖',
    href: '/games/warframe',
    storeUrl: 'https://store.steampowered.com/app/230410/Warframe/',
    storeLabel: 'Steam (F2P)',
  },
];

const TOOLS = [
  {
    gameId: 'wosb',
    label: '💥 Cannon DPS Calc',
    href: '/games/world-of-sea-battle/calculator',
  },
  // Add tools here as you build them:
  // { gameId: 'gw2',      label: '🛡️ Build Planner',     href: '/games/guild-wars-2/build-planner' },
  // { gameId: 'lostark',  label: '⚙️ Engravings Calc',   href: '/games/lost-ark/engravings' },
  // { gameId: 'destiny2', label: '🔫 DPS Calc',           href: '/games/destiny-2/dps-calc' },
  // { gameId: 'poe2',     label: '🌳 Passive Planner',    href: '/games/path-of-exile-2/passive-planner' },
  // { gameId: 'warframe', label: '🔧 Mod Builder',        href: '/games/warframe/mod-builder' },
];

const GAME_FILTERS = [{ id: 'all', label: 'All Games' }, ...GAMES.map((g) => ({ id: g.id, label: g.name }))];

/* ─── Helpers ────────────────────────────────────────── */

function timeAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days  = Math.floor(diff / 86400000);
  if (mins < 60)  return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7)   return `${days}d ago`;
  return new Date(isoDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function getGame(id: string) {
  return GAMES.find((g) => g.id === id);
}

/* ─── Components ─────────────────────────────────────── */

function NewsCard({ item, featured }: { item: NewsItem; featured?: boolean }) {
  const game = getGame(item.gameId);
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.newsCard} ${featured ? styles.newsCardFeatured : ''}`}
    >
      <div className={styles.newsCardTop}>
        <span className={styles.newsGameTag} style={{ color: game?.color ?? '#aaa', borderColor: game?.color ?? '#aaa' }}>
          {game?.icon} {item.gameName}
        </span>
        <span className={styles.newsTime}>{timeAgo(item.date)}</span>
      </div>
      <div className={styles.newsTitle}>{item.title}</div>
      {featured && item.excerpt && (
        <p className={styles.newsExcerpt}>{item.excerpt}…</p>
      )}
      <div className={styles.newsFooter}>
        <span className={styles.newsSource}>{item.source === 'rss' ? 'Official Site' : 'Steam'}</span>
        <span className={styles.newsReadMore}>Read →</span>
      </div>
    </a>
  );
}

function StoreCard({ game }: { game: typeof GAMES[0] }) {
  return (
    <a
      href={game.storeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.storeCard}
    >
      <span className={styles.storeIcon} style={{ color: game.color }}>{game.icon}</span>
      <div className={styles.storeBody}>
        <div className={styles.storeName}>{game.name}</div>
        <div className={styles.storeLabel}>{game.storeLabel}</div>
      </div>
      <span className={styles.storeArrow}>↗</span>
    </a>
  );
}

/* ─── Page ───────────────────────────────────────────── */

export default function HomePage() {
  const [news, setNews]           = useState<NewsItem[]>([]);
  const [loading, setLoading]     = useState(true);
  const [activeFilter, setFilter] = useState('all');
  const [activeTab, setTab]       = useState<'news' | 'store'>('news');

  useEffect(() => {
    fetch('/api/news?limit=30')
      .then((r) => r.json())
      .then((d) => { setNews(d.news ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = activeFilter === 'all'
    ? news
    : news.filter((n) => n.gameId === activeFilter);

  const featured  = filtered[0];
  const secondary = filtered.slice(1, 3);
  const rest      = filtered.slice(3);

  return (
    <div className={styles.page}>

      {/* ── Top nav ── */}
      <nav className={styles.topNav}>
        <div className={styles.topNavLogo}>
          <span className={styles.logoMark}>K</span>
          <span className={styles.logoText}>ERNYX</span>
        </div>
        <div className={styles.topNavLinks}>
          <button
            className={`${styles.topNavLink} ${activeTab === 'news' ? styles.topNavLinkActive : ''}`}
            onClick={() => setTab('news')}
          >
            News
          </button>
          <button
            className={`${styles.topNavLink} ${activeTab === 'store' ? styles.topNavLinkActive : ''}`}
            onClick={() => setTab('store')}
          >
            Store
          </button>
        </div>
        <div className={styles.topNavTag}>Unofficial Fan Tools</div>
      </nav>

      {/* ── Body ── */}
      <div className={styles.body}>

        {/* Sidebar */}
        <aside className={styles.sidebar}>

          <div className={styles.sidebarSection}>
            <div className={styles.sidebarLabel}>Browse Games</div>
            {GAMES.map((g) => (
              <Link key={g.id} href={g.href} className={styles.sidebarGame}>
                <span style={{ color: g.color }}>{g.icon}</span>
                <span>{g.name}</span>
              </Link>
            ))}
          </div>

          <div className={styles.sidebarSection}>
            <div className={styles.sidebarLabel}>Tools</div>
            {TOOLS.map((t) => {
              const g = getGame(t.gameId);
              return (
                <Link key={t.href} href={t.href} className={styles.sidebarLink}>
                  <span style={{ color: g?.color }}>{t.label}</span>
                </Link>
              );
            })}
            <div className={styles.sidebarComingSoon}>More tools coming soon</div>
          </div>

          <div className={styles.sidebarSection}>
            <div className={styles.sidebarLabel}>Quick Store</div>
            {GAMES.slice(0, 4).map((g) => (
              <a
                key={g.id}
                href={g.storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.sidebarStoreLink}
              >
                <span style={{ color: g.color }}>{g.icon}</span>
                <span>{g.name}</span>
                <span className={styles.sidebarStoreLinkArrow}>↗</span>
              </a>
            ))}
          </div>

        </aside>

        {/* Main content */}
        <main className={styles.main}>

          {/* ── NEWS TAB ── */}
          {activeTab === 'news' && (
            <>
              {/* Filter bar */}
              <div className={styles.filterBar}>
                {GAME_FILTERS.map((f) => (
                  <button
                    key={f.id}
                    className={`${styles.filterBtn} ${activeFilter === f.id ? styles.filterBtnActive : ''}`}
                    onClick={() => setFilter(f.id)}
                  >
                    {f.id !== 'all' && (
                      <span style={{ color: GAMES.find((g) => g.id === f.id)?.color }}>
                        {GAMES.find((g) => g.id === f.id)?.icon}{' '}
                      </span>
                    )}
                    {f.id === 'all' ? 'All Games' : GAMES.find((g) => g.id === f.id)?.name.split(' ')[0]}
                  </button>
                ))}
              </div>

              {loading && (
                <div className={styles.loadingState}>
                  <div className={styles.loadingDots}>
                    <span /><span /><span />
                  </div>
                  <span>Fetching latest updates…</span>
                </div>
              )}

              {!loading && filtered.length === 0 && (
                <div className={styles.emptyState}>No news found for this filter.</div>
              )}

              {!loading && filtered.length > 0 && (
                <>
                  {/* Featured + secondary row */}
                  <div className={styles.newsHero}>
                    {featured && <NewsCard item={featured} featured />}
                    <div className={styles.newsSecondary}>
                      {secondary.map((item) => (
                        <NewsCard key={item.id} item={item} />
                      ))}
                    </div>
                  </div>

                  {/* Rest of news */}
                  {rest.length > 0 && (
                    <div className={styles.newsList}>
                      <div className={styles.newsListHeader}>
                        <span>More Updates</span>
                        <span className={styles.newsListCount}>{rest.length} items</span>
                      </div>
                      <div className={styles.newsGrid}>
                        {rest.map((item) => (
                          <NewsCard key={item.id} item={item} />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}

          {/* ── STORE TAB ── */}
          {activeTab === 'store' && (
            <div className={styles.storePage}>
              <div className={styles.storeHeader}>
                <h2 className={styles.storeTitle}>Game Stores</h2>
                <p className={styles.storeSubtitle}>
                  Official stores for all supported games. All links go directly to the publisher or Steam.
                </p>
              </div>
              <div className={styles.storeGrid}>
                {GAMES.map((g) => <StoreCard key={g.id} game={g} />)}
              </div>
              <div className={styles.storeDisclaimer}>
                Kernyx is an unofficial fan site. We are not affiliated with, endorsed by, or connected to any of the game developers listed above.
              </div>
            </div>
          )}

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
