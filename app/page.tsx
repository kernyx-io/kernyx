'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import type { NewsItem } from './api/news/route';

/* ─── Static data ────────────────────────────────────── */

const WOSB = {
  id: 'wosb',
  name: 'World of Sea Battle',
  color: '#00b4d8',
  icon: '⚓',
  href: '/games/world-of-sea-battles',
  storeUrl: 'https://store.steampowered.com/app/2948190/World_of_Sea_Battle/',
  storeLabel: 'Steam (Free to Play)',
};

const TOOLS = [
  { label: '💥 Cannon DPS Calc', href: '/games/world-of-sea-battles/wsb-calculator' },
  { label: '🚢 Ship Guide',      href: '/games/world-of-sea-battles/ships' },
];

const COMING_SOON_GAMES = [
  { icon: '⚔️',  name: 'Guild Wars 2',    note: 'Build planner & DPS tools' },
  { icon: '🗺️', name: 'Lost Ark',         note: 'Engravings calculator' },
  { icon: '🌌',  name: 'Destiny 2',       note: 'Weapon DPS tracker' },
  { icon: '💀',  name: 'Path of Exile 2', note: 'Passive tree planner' },
  { icon: '🤖',  name: 'Warframe',        note: 'Mod build optimizer' },
];

/* ─── Helpers ────────────────────────────────────────── */

function timeAgo(isoDate: string): string {
  const diff  = Date.now() - new Date(isoDate).getTime();
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days  = Math.floor(diff / 86400000);
  if (mins  < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days  <  7) return `${days}d ago`;
  return new Date(isoDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/* ─── News Card ──────────────────────────────────────── */

function NewsCard({ item, featured }: { item: NewsItem; featured?: boolean }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.newsCard} ${featured ? styles.newsCardFeatured : ''}`}
    >
      <div className={styles.newsCardTop}>
        <span className={styles.newsGameTag} style={{ color: WOSB.color, borderColor: WOSB.color }}>
          {WOSB.icon} {item.gameName}
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

/* ─── Suggest Tab ────────────────────────────────────── */

function SuggestTab() {
  const [name,    setName]    = useState('');
  const [game,    setGame]    = useState('');
  const [reason,  setReason]  = useState('');
  const [sent,    setSent]    = useState(false);
  const [sending, setSending] = useState(false);
  const [error,   setError]   = useState('');

  async function handleSubmit() {
    if (!game.trim()) { setError('Please enter a game name.'); return; }
    setSending(true);
    setError('');
    try {
      await fetch('/api/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), game: game.trim(), reason: reason.trim() }),
      });
      setSent(true);
    } catch {
      setError('Something went wrong — please try again.');
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className={styles.suggestThanks}>
        <div className={styles.suggestThanksIcon}>⚓</div>
        <h3>Thanks for the suggestion!</h3>
        <p>I review every submission and prioritize based on demand. Keep an eye on Kernyx for new game additions.</p>
        <button className={styles.suggestReset} onClick={() => { setSent(false); setName(''); setGame(''); setReason(''); }}>
          Suggest another game
        </button>
      </div>
    );
  }

  return (
    <div className={styles.suggestPage}>
      <div className={styles.suggestHeader}>
        <h2 className={styles.suggestTitle}>Suggest a Game</h2>
        <p className={styles.suggestSubtitle}>
          Have a game you'd like to see tools and guides for on Kernyx? Let me know — popular requests get built first.
        </p>
      </div>

      <div className={styles.suggestLayout}>
        <div className={styles.suggestForm}>
          <div className={styles.suggestField}>
            <label className={styles.suggestLabel}>Your Name <span className={styles.suggestOptional}>(optional)</span></label>
            <input
              className={styles.suggestInput}
              placeholder="Captain Blackwood"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className={styles.suggestField}>
            <label className={styles.suggestLabel}>Game Name <span className={styles.suggestRequired}>*</span></label>
            <input
              className={styles.suggestInput}
              placeholder="e.g. Sea of Thieves, Skull & Bones, Black Flag…"
              value={game}
              onChange={e => { setGame(e.target.value); setError(''); }}
            />
          </div>
          <div className={styles.suggestField}>
            <label className={styles.suggestLabel}>What tools would you want? <span className={styles.suggestOptional}>(optional)</span></label>
            <textarea
              className={styles.suggestTextarea}
              placeholder="e.g. Ship damage calculator, crew optimizer, economy tracker…"
              value={reason}
              onChange={e => setReason(e.target.value)}
              rows={4}
            />
          </div>
          {error && <div className={styles.suggestError}>{error}</div>}
          <button className={styles.suggestBtn} onClick={handleSubmit} disabled={sending}>
            {sending ? 'Sending…' : 'Submit Suggestion →'}
          </button>
        </div>

        <div className={styles.suggestSidebar}>
          <div className={styles.suggestSidebarLabel}>Already Planned</div>
          {COMING_SOON_GAMES.map(g => (
            <div key={g.name} className={styles.suggestSidebarGame}>
              <span className={styles.suggestSidebarIcon}>{g.icon}</span>
              <div>
                <div className={styles.suggestSidebarName}>{g.name}</div>
                <div className={styles.suggestSidebarNote}>{g.note}</div>
              </div>
              <span className={styles.suggestSidebarSoon}>SOON</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────── */

export default function HomePage() {
  const [news,      setNews]    = useState<NewsItem[]>([]);
  const [loading,   setLoading] = useState(true);
  const [activeTab, setTab]     = useState<'news' | 'store' | 'suggest'>('news');

  useEffect(() => {
    fetch('/api/news?limit=20')
      .then(r => r.json())
      .then(d => { setNews(d.news ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const featured  = news[0];
  const secondary = news.slice(1, 3);
  const rest      = news.slice(3);

  return (
    <div className={styles.page}>

      {/* ── Top nav ── */}
      <nav className={styles.topNav}>
        <div className={styles.topNavLogo}>
          <span className={styles.logoMark}>K</span>
          <span className={styles.logoText}>ERNYX</span>
        </div>
        <div className={styles.topNavLinks}>
          {(['news', 'store', 'suggest'] as const).map(tab => (
            <button
              key={tab}
              className={`${styles.topNavLink} ${activeTab === tab ? styles.topNavLinkActive : ''}`}
              onClick={() => setTab(tab)}
            >
              {tab === 'news' ? 'News' : tab === 'store' ? 'Store' : 'Suggest a Game'}
            </button>
          ))}
        </div>
        <div className={styles.topNavTag}>Unofficial Fan Tools</div>
      </nav>

      {/* ── Body ── */}
      <div className={styles.body}>

        {/* Sidebar */}
        <aside className={styles.sidebar}>

          <div className={styles.sidebarSection}>
            <div className={styles.sidebarLabel}>Current Game</div>
            <Link href={WOSB.href} className={styles.sidebarGame}>
              <span style={{ color: WOSB.color }}>{WOSB.icon}</span>
              <span>{WOSB.name}</span>
            </Link>
          </div>

          <div className={styles.sidebarSection}>
            <div className={styles.sidebarLabel}>Tools</div>
            {TOOLS.map(t => (
              <Link key={t.href} href={t.href} className={styles.sidebarLink}>
                <span style={{ color: WOSB.color }}>{t.label}</span>
              </Link>
            ))}
          </div>

          <div className={styles.sidebarSection}>
            <div className={styles.sidebarLabel}>Coming Soon</div>
            {COMING_SOON_GAMES.map(g => (
              <div key={g.name} className={styles.sidebarComingSoonGame}>
                <span>{g.icon}</span>
                <span>{g.name}</span>
              </div>
            ))}
            <button className={styles.sidebarSuggestBtn} onClick={() => setTab('suggest')}>
              + Suggest a game
            </button>
          </div>

          <div className={styles.sidebarSection}>
            <div className={styles.sidebarLabel}>Quick Store</div>
            <a href={WOSB.storeUrl} target="_blank" rel="noopener noreferrer" className={styles.sidebarStoreLink}>
              <span style={{ color: WOSB.color }}>{WOSB.icon}</span>
              <span>{WOSB.name}</span>
              <span className={styles.sidebarStoreLinkArrow}>↗</span>
            </a>
          </div>

        </aside>

        {/* Main */}
        <main className={styles.main}>

          {activeTab === 'news' && (
            <>
              {loading && (
                <div className={styles.loadingState}>
                  <div className={styles.loadingDots}><span /><span /><span /></div>
                  <span>Fetching latest updates…</span>
                </div>
              )}
              {!loading && news.length === 0 && (
                <div className={styles.emptyState}>No news found right now — check back shortly.</div>
              )}
              {!loading && news.length > 0 && (
                <>
                  <div className={styles.newsHero}>
                    {featured && <NewsCard item={featured} featured />}
                    <div className={styles.newsSecondary}>
                      {secondary.map(item => <NewsCard key={item.id} item={item} />)}
                    </div>
                  </div>
                  {rest.length > 0 && (
                    <div className={styles.newsList}>
                      <div className={styles.newsListHeader}>
                        <span>More Updates</span>
                        <span className={styles.newsListCount}>{rest.length} items</span>
                      </div>
                      <div className={styles.newsGrid}>
                        {rest.map(item => <NewsCard key={item.id} item={item} />)}
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}

          {activeTab === 'store' && (
            <div className={styles.storePage}>
              <div className={styles.storeHeader}>
                <h2 className={styles.storeTitle}>Game Store</h2>
                <p className={styles.storeSubtitle}>Official store link for World of Sea Battle.</p>
              </div>
              <div className={styles.storeGrid}>
                <a href={WOSB.storeUrl} target="_blank" rel="noopener noreferrer" className={styles.storeCard}>
                  <span className={styles.storeIcon} style={{ color: WOSB.color }}>{WOSB.icon}</span>
                  <div className={styles.storeBody}>
                    <div className={styles.storeName}>{WOSB.name}</div>
                    <div className={styles.storeLabel}>{WOSB.storeLabel}</div>
                  </div>
                  <span className={styles.storeArrow}>↗</span>
                </a>
              </div>
              <div className={styles.storeComingSoon}>
                <div className={styles.storeComingSoonLabel}>More Games Coming Soon</div>
                <div className={styles.storeComingSoonGrid}>
                  {COMING_SOON_GAMES.map(g => (
                    <div key={g.name} className={styles.storeComingSoonCard}>
                      <span className={styles.storeComingSoonIcon}>{g.icon}</span>
                      <div>
                        <div className={styles.storeComingSoonName}>{g.name}</div>
                        <div className={styles.storeComingSoonNote}>{g.note}</div>
                      </div>
                      <span className={styles.storeComingSoonBadge}>SOON</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.storeDisclaimer}>
                Kernyx is an unofficial fan site. We are not affiliated with, endorsed by, or connected to any game developers.
              </div>
            </div>
          )}

          {activeTab === 'suggest' && <SuggestTab />}

        </main>
      </div>

      <footer className={styles.footer}>
        <span>Kernyx © {new Date().getFullYear()}</span>
        <span>Unofficial fan tools · Not affiliated with any game developer</span>
      </footer>
    </div>
  );
}
