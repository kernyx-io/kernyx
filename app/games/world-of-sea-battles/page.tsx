import Link from 'next/link'
import type { Metadata } from 'next'
import './hub.css'

export const metadata: Metadata = {
  title: 'World of Sea Battle — Tools & Guides | Kernyx',
  description: 'Damage calculators, ship builders, and combat guides for World of Sea Battle.',
}

// ─── YouTube RSS fetch (no API key needed) ────────────────────────────────────

interface YTVideo {
  title: string
  link: string
  published: string
  thumbnail: string
  channel: string
}

async function fetchYouTubeVideos(query: string, max = 6): Promise<YTVideo[]> {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY
    if (!apiKey) return []

    const encoded = encodeURIComponent(query)
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encoded}&type=video&maxResults=${max}&order=date&key=${apiKey}`

    const res = await fetch(url, { next: { revalidate: 3600 } })
    if (!res.ok) return []

    const data = await res.json()
    return (data.items ?? []).map((item: any) => ({
      title:     item.snippet.title,
      link:      `https://www.youtube.com/watch?v=${item.id.videoId}`,
      published: item.snippet.publishedAt,
      thumbnail: item.snippet.thumbnails?.medium?.url ?? '',
      channel:   item.snippet.channelTitle,
    }))
  } catch {
    return []
  }
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const days = Math.floor(diff / 86400000)
  if (days < 1)   return 'Today'
  if (days < 7)   return `${days}d ago`
  if (days < 30)  return `${Math.floor(days / 7)}w ago`
  if (days < 365) return `${Math.floor(days / 30)}mo ago`
  return `${Math.floor(days / 365)}y ago`
}

// ─── Static data ──────────────────────────────────────────────────────────────

const TOOLS = [
  {
    href: '/games/world-of-sea-battles/wsb-calculator',
    icon: '💥',
    title: 'Broadside Calculator',
    desc: 'Configure your ship, cannons, crew, attachments, and ammo to calculate full volley damage, DPM, and per-side breakdowns.',
    tags: ['DAMAGE', 'DPM', 'CANNONS'],
  },
]

const GUIDES: { title: string; desc: string; tags: string[]; href?: string; live?: boolean }[] = [
  { title: 'Ship Guide', desc: 'Full stats, roles, and tactical breakdown for every ship in the Archipelago — all rates and types.', tags: ['SHIPS'], href: '/games/world-of-sea-battles/ships', live: true },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function WorldOfSeaBattlesPage() {
  const videos = await fetchYouTubeVideos('World of Sea Battle guide')

  return (
    <div className="wsb-hub-body">

      {/* ── Sidebar ── */}
      <aside className="wsb-hub-sidebar">
        <div className="wsb-hub-sidebar-section">
          <div className="wsb-hub-sidebar-label">Current Game</div>
          <Link href="/games/world-of-sea-battles" className="wsb-hub-sidebar-game">
            <span>⚓</span><span>World of Sea Battle</span>
          </Link>
        </div>
        <div className="wsb-hub-sidebar-section">
          <div className="wsb-hub-sidebar-label">Tools</div>
          <Link href="/games/world-of-sea-battles/wsb-calculator" className="wsb-hub-sidebar-link">
            💥 Cannon DPS Calc
          </Link>
          <Link href="/games/world-of-sea-battles/ships" className="wsb-hub-sidebar-link">
            🚢 Ship Guide
          </Link>
        </div>
        <div className="wsb-hub-sidebar-section">
          <div className="wsb-hub-sidebar-label">Coming Soon</div>
          <div className="wsb-hub-sidebar-soon-game"><span>⚔️</span><span>Guild Wars 2</span></div>
          <div className="wsb-hub-sidebar-soon-game"><span>🗺️</span><span>Lost Ark</span></div>
          <div className="wsb-hub-sidebar-soon-game"><span>🌌</span><span>Destiny 2</span></div>
          <div className="wsb-hub-sidebar-soon-game"><span>💀</span><span>Path of Exile 2</span></div>
          <div className="wsb-hub-sidebar-soon-game"><span>🤖</span><span>Warframe</span></div>
        </div>
        <div className="wsb-hub-sidebar-section">
          <div className="wsb-hub-sidebar-label">Quick Store</div>
          <a href="https://store.steampowered.com/app/2948190/World_of_Sea_Battle/" target="_blank" rel="noopener noreferrer" className="wsb-hub-sidebar-store">
            <span>⚓</span><span>World of Sea Battle</span><span className="wsb-hub-sidebar-store-arrow">↗</span>
          </a>
        </div>
      </aside>

      {/* ── Main scroll area ── */}
      <div className="wsb-hub-main">

        {/* ── Hero ── */}
        <div className="wsb-hub-hero">
          <div className="wsb-hub-hero-inner">
            <div className="wsb-hub-eyebrow">
              <span className="wsb-hub-game-badge">⚔ WORLD OF SEA BATTLE</span>
            </div>
            <h1 className="wsb-hub-title">
              Rule the<br />
              <em>Open Sea</em>
            </h1>
            <p className="wsb-hub-subtitle">
              Damage calculators, ship builders, and tactical guides for captains who demand precision.
            </p>
            <div className="wsb-hub-stats-row">
              <div className="wsb-hub-stat"><span>62</span> Ships</div>
              <div className="wsb-hub-stat-sep">·</div>
              <div className="wsb-hub-stat"><span>43</span> Cannons</div>
              <div className="wsb-hub-stat-sep">·</div>
              <div className="wsb-hub-stat"><span>35</span> Attachments</div>
              <div className="wsb-hub-stat-sep">·</div>
              <div className="wsb-hub-stat"><span>49</span> Crew</div>
            </div>
          </div>
          <div className="wsb-hub-hero-ship" aria-hidden>⛵</div>
        </div>

        <div className="wsb-hub-content">

          {/* ── Tools ── */}
          <section className="wsb-hub-section">
            <div className="wsb-hub-section-header">
              <span className="wsb-hub-section-icon">⚙</span>
              TOOLS &amp; CALCULATORS
            </div>
            <div className="wsb-hub-tools-grid">
              {TOOLS.map((tool) => (
                <Link
                  key={tool.title}
                  href={tool.href}
                  className="wsb-hub-tool-card"
                >
                  <div className="wsb-hub-tool-top">
                    <span className="wsb-hub-tool-icon">{tool.icon}</span>
                    <span className="wsb-hub-tool-badge wsb-hub-tool-badge-available">AVAILABLE</span>
                  </div>
                  <div className="wsb-hub-tool-title">{tool.title}</div>
                  <div className="wsb-hub-tool-desc">{tool.desc}</div>
                  <div className="wsb-hub-tool-tags">
                    {tool.tags.map(t => <span key={t} className="wsb-hub-tag">{t}</span>)}
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ── Written Guides ── */}
          <section className="wsb-hub-section">
            <div className="wsb-hub-section-header">
              <span className="wsb-hub-section-icon">📖</span>
              GUIDES
            </div>
            <div className="wsb-hub-guides-grid">
              {GUIDES.map((guide) => guide.live ? (
                <Link key={guide.title} href={guide.href!} className="wsb-hub-guide-card wsb-hub-guide-card-live">
                  <div className="wsb-hub-guide-live-badge">AVAILABLE</div>
                  <div className="wsb-hub-guide-title">{guide.title}</div>
                  <div className="wsb-hub-guide-desc">{guide.desc}</div>
                  <div className="wsb-hub-tool-tags">
                    {guide.tags.map(t => <span key={t} className="wsb-hub-tag">{t}</span>)}
                  </div>
                </Link>
              ) : (
                <div key={guide.title} className="wsb-hub-guide-card">
                  <div className="wsb-hub-guide-soon-badge">SOON</div>
                  <div className="wsb-hub-guide-title">{guide.title}</div>
                  <div className="wsb-hub-guide-desc">{guide.desc}</div>
                  <div className="wsb-hub-tool-tags">
                    {guide.tags.map(t => <span key={t} className="wsb-hub-tag">{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── YouTube Guides ── */}
          <section className="wsb-hub-section">
            <div className="wsb-hub-section-header">
              <span className="wsb-hub-section-icon">▶</span>
              LATEST GUIDES
              <span className="wsb-hub-section-note">from YouTube · updates hourly</span>
            </div>

            {videos.length === 0 ? (
              <div className="wsb-hub-no-videos">
                Could not load videos right now — check back shortly.
              </div>
            ) : (
              <div className="wsb-hub-videos-grid">
                {videos.map((v, i) => (
                  
                    key={i}
                    href={v.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="wsb-hub-video-card"
                  >
                    {v.thumbnail ? (
                      <div className="wsb-hub-video-thumb">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={v.thumbnail} alt={v.title} loading="lazy" />
                        <div className="wsb-hub-video-play">▶</div>
                      </div>
                    ) : (
                      <div className="wsb-hub-video-thumb wsb-hub-video-thumb-empty">▶</div>
                    )}
                    <div className="wsb-hub-video-body">
                      <div className="wsb-hub-video-title">{v.title}</div>
                      <div className="wsb-hub-video-meta">
                        {v.channel && <span>{v.channel}</span>}
                        {v.published && <span>{timeAgo(v.published)}</span>}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}

            <div className="wsb-hub-yt-link">
              <a href="https://www.youtube.com/results?search_query=world+of+sea+battle+guide" target="_blank" rel="noopener noreferrer">
                View all on YouTube →
              </a>
            </div>
          </section>

          {/* ── Community ── */}
          <section className="wsb-hub-section">
            <div className="wsb-hub-section-header">
              <span className="wsb-hub-section-icon">🌐</span>
              OFFICIAL COMMUNITY
            </div>
            <div className="wsb-hub-community-grid">
              <a href="https://www.reddit.com/r/worldofseabattle/" target="_blank" rel="noopener noreferrer" className="wsb-hub-social-card">
                <div className="wsb-hub-social-icon wsb-hub-social-reddit">
                  <svg viewBox="0 0 20 20" fill="currentColor" width="28" height="28"><path d="M10 0C4.478 0 0 4.478 0 10s4.478 10 10 10 10-4.478 10-10S15.522 0 10 0zm5.93 10a1.27 1.27 0 00-2.14-.92c-1.07-.71-2.52-1.16-4.1-1.22l.7-3.28 2.27.48a.9.9 0 101.82-.1.9.9 0 00-.88.74l-2.53-.53a.19.19 0 00-.23.14l-.78 3.66c-1.61.05-3.08.5-4.17 1.22a1.27 1.27 0 10-1.38 2.06c-.03.18-.05.36-.05.55 0 2.79 3.25 5.05 7.26 5.05s7.26-2.26 7.26-5.05c0-.18-.02-.36-.05-.54A1.27 1.27 0 0015.93 10zM6.36 11.27a.9.9 0 110 1.8.9.9 0 010-1.8zm7.06 2.38c-.49.49-1.28.73-2.42.73s-1.93-.24-2.42-.73a.18.18 0 010-.26.18.18 0 01.26 0c.38.38 1.05.55 2.16.55s1.78-.17 2.16-.55a.18.18 0 01.26.26zm-.14-1.48a.9.9 0 110-1.8.9.9 0 010 1.8z"/></svg>
                </div>
                <div className="wsb-hub-social-body">
                  <div className="wsb-hub-social-name">Reddit</div>
                  <div className="wsb-hub-social-desc">r/worldofseabattle — community discussion, tips, and news</div>
                </div>
                <div className="wsb-hub-social-arrow">→</div>
              </a>

              <a href="https://discord.gg/pmf8NXpVP4" target="_blank" rel="noopener noreferrer" className="wsb-hub-social-card">
                <div className="wsb-hub-social-icon wsb-hub-social-discord">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
                </div>
                <div className="wsb-hub-social-body">
                  <div className="wsb-hub-social-name">Discord</div>
                  <div className="wsb-hub-social-desc">Official server — dev announcements, help channels, events</div>
                </div>
                <div className="wsb-hub-social-arrow">→</div>
              </a>

              <a href="https://x.com/WOSB_game" target="_blank" rel="noopener noreferrer" className="wsb-hub-social-card">
                <div className="wsb-hub-social-icon wsb-hub-social-x">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </div>
                <div className="wsb-hub-social-body">
                  <div className="wsb-hub-social-name">X / Twitter</div>
                  <div className="wsb-hub-social-desc">Official account — updates, patch notes, and announcements</div>
                </div>
                <div className="wsb-hub-social-arrow">→</div>
              </a>

              <a href="https://www.facebook.com/WorldofSeaBattle" target="_blank" rel="noopener noreferrer" className="wsb-hub-social-card">
                <div className="wsb-hub-social-icon wsb-hub-social-fb">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.791-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
                </div>
                <div className="wsb-hub-social-body">
                  <div className="wsb-hub-social-name">Facebook</div>
                  <div className="wsb-hub-social-desc">Official page — community posts and game updates</div>
                </div>
                <div className="wsb-hub-social-arrow">→</div>
              </a>
            </div>
          </section>

        </div>
      </div>{/* /wsb-hub-main */}
    </div>
  )
}
