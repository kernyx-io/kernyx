import Link from 'next/link'
import type { Metadata } from 'next'

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
    const encoded = encodeURIComponent(query)
    const url = `https://www.youtube.com/results?search_query=${encoded}&sp=EgIIAQ%253D%253D`
    const res = await fetch(url, {
      next: { revalidate: 3600 },
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    })
    if (!res.ok) return []
    const html = await res.text()
    const match = html.match(/var ytInitialData = (\{[\s\S]*?\});<\/script>/)
    if (!match) return []
    const data = JSON.parse(match[1])
    const contents =
      data?.contents?.twoColumnSearchResultsRenderer?.primaryContents
        ?.sectionListRenderer?.contents?.[0]?.itemSectionRenderer?.contents ?? []
    const videos: YTVideo[] = []
    for (const item of contents) {
      const v = item?.videoRenderer
      if (!v) continue
      const videoId   = v.videoId ?? ''
      const title     = v.title?.runs?.[0]?.text ?? ''
      const channel   = v.ownerText?.runs?.[0]?.text ?? ''
      const published = v.publishedTimeText?.simpleText ?? ''
      const thumbnail = `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`
      if (videoId && title) {
        videos.push({ title, link: `https://www.youtube.com/watch?v=${videoId}`, published, thumbnail, channel })
      }
      if (videos.length >= max) break
    }
    return videos
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
    status: 'available' as const,
    title: 'Broadside Calculator',
    desc: 'Configure your ship, cannons, crew, attachments, and ammo to calculate full volley damage, DPM, and per-side breakdowns.',
    tags: ['DAMAGE', 'DPM', 'CANNONS'],
  },
  {
    href: '#',
    icon: '⚓',
    status: 'soon' as const,
    title: 'Ship Comparison',
    desc: 'Compare any two ships side-by-side across all stats — durability, speed, armor, maneuverability, and weapon layout.',
    tags: ['SHIPS', 'STATS'],
  },
  {
    href: '#',
    icon: '🧭',
    status: 'soon' as const,
    title: 'Fleet Builder',
    desc: 'Plan squadron compositions and calculate combined broadside output for coordinated fleet engagements.',
    tags: ['FLEET', 'SQUADRON'],
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function WorldOfSeaBattlesPage() {
  const videos = await fetchYouTubeVideos('World of Sea Battle guide')

  return (
    <main className="wsb-hub">

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
                href={tool.status === 'soon' ? '#' : tool.href}
                className={`wsb-hub-tool-card ${tool.status === 'soon' ? 'soon' : ''}`}
              >
                <div className="wsb-hub-tool-top">
                  <span className="wsb-hub-tool-icon">{tool.icon}</span>
                  <span className={`wsb-hub-tool-badge wsb-hub-tool-badge-${tool.status}`}>
                    {tool.status === 'available' ? 'AVAILABLE' : 'COMING SOON'}
                  </span>
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
                <a
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

      </div>

      {/* ── Footer ── */}
      <div className="wsb-hub-footer">
        Kernyx · Unofficial fan site · Not affiliated with Game-Insight or World of Sea Battle
      </div>

      <style>{`
        .wsb-hub {
          --gold:        #c9a84c;
          --gold-bright: #e8c96a;
          --gold-dim:    #7a6230;
          --navy:        #060c1a;
          --navy-mid:    #0c1628;
          --navy-light:  #132040;
          --cream:       #e8dfc8;
          --cream-dim:   #a89878;
          --green:       #2ecc71;
          --border:      rgba(201,168,76,0.2);
          min-height: 100vh;
          background: var(--navy);
          color: var(--cream);
          font-family: 'Crimson Pro', Georgia, serif;
        }

        .wsb-hub-hero {
          position: relative;
          padding: 4rem 2rem 3rem;
          border-bottom: 1px solid var(--border);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1100px;
          margin: 0 auto;
        }
        .wsb-hub-hero-inner { max-width: 600px; }
        .wsb-hub-eyebrow { margin-bottom: 1rem; }
        .wsb-hub-game-badge {
          font-family: 'Cinzel', serif;
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          color: var(--gold);
          border: 1px solid var(--border);
          padding: 0.3rem 0.75rem;
          border-radius: 2px;
        }
        .wsb-hub-title {
          font-family: 'Cinzel Decorative', serif;
          font-size: clamp(2.2rem, 5vw, 3.8rem);
          font-weight: 700;
          line-height: 1.1;
          color: var(--cream);
          margin: 0.75rem 0 1rem;
          text-shadow: 0 0 60px rgba(201,168,76,0.15);
        }
        .wsb-hub-title em { font-style: italic; color: var(--gold-bright); display: block; }
        .wsb-hub-subtitle { font-size: 1.1rem; color: var(--cream-dim); max-width: 480px; line-height: 1.6; margin: 0 0 1.75rem; }
        .wsb-hub-stats-row { display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap; font-family: 'Cinzel', serif; font-size: 0.72rem; letter-spacing: 0.1em; color: var(--cream-dim); }
        .wsb-hub-stat span { color: var(--gold-bright); font-weight: 600; margin-right: 0.3rem; }
        .wsb-hub-stat-sep { color: var(--gold-dim); }
        .wsb-hub-hero-ship { font-size: clamp(5rem, 12vw, 10rem); opacity: 0.07; position: absolute; right: 2rem; top: 50%; transform: translateY(-50%); pointer-events: none; user-select: none; }

        .wsb-hub-content { max-width: 1100px; margin: 0 auto; padding: 3rem 2rem 4rem; display: flex; flex-direction: column; gap: 3.5rem; }

        .wsb-hub-section-header {
          font-family: 'Cinzel', serif;
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          color: var(--gold);
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 1.25rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border);
        }
        .wsb-hub-section-icon { font-size: 0.9rem; }
        .wsb-hub-section-note { margin-left: auto; font-size: 0.6rem; color: var(--gold-dim); letter-spacing: 0.1em; font-family: 'Cinzel', serif; }

        /* Tools */
        .wsb-hub-tools-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem; }
        .wsb-hub-tool-card { background: var(--navy-mid); border: 1px solid var(--border); border-radius: 4px; padding: 1.25rem 1.5rem 1.5rem; display: flex; flex-direction: column; gap: 0.6rem; text-decoration: none; color: var(--cream); transition: border-color 0.2s, background 0.2s; }
        .wsb-hub-tool-card:not(.soon):hover { border-color: rgba(201,168,76,0.5); background: var(--navy-light); }
        .wsb-hub-tool-card.soon { opacity: 0.55; cursor: default; pointer-events: none; }
        .wsb-hub-tool-top { display: flex; align-items: center; justify-content: space-between; }
        .wsb-hub-tool-icon { font-size: 1.4rem; }
        .wsb-hub-tool-badge { font-family: 'Cinzel', serif; font-size: 0.55rem; letter-spacing: 0.12em; padding: 0.2rem 0.5rem; border-radius: 2px; }
        .wsb-hub-tool-badge-available { background: rgba(46,204,113,0.12); color: var(--green); border: 1px solid rgba(46,204,113,0.3); }
        .wsb-hub-tool-badge-soon { background: rgba(201,168,76,0.1); color: var(--gold-dim); border: 1px solid var(--border); }
        .wsb-hub-tool-title { font-family: 'Cinzel', serif; font-size: 1rem; font-weight: 600; color: var(--cream); letter-spacing: 0.04em; }
        .wsb-hub-tool-desc { font-size: 0.97rem; color: var(--cream-dim); line-height: 1.55; flex: 1; }
        .wsb-hub-tool-tags { display: flex; gap: 0.4rem; flex-wrap: wrap; margin-top: 0.25rem; }
        .wsb-hub-tag { font-family: 'Cinzel', serif; font-size: 0.55rem; letter-spacing: 0.1em; color: var(--gold-dim); border: 1px solid rgba(201,168,76,0.15); padding: 0.15rem 0.45rem; border-radius: 2px; }

        /* YouTube video grid */
        .wsb-hub-videos-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1rem; }
        .wsb-hub-video-card { background: var(--navy-mid); border: 1px solid var(--border); border-radius: 4px; overflow: hidden; text-decoration: none; color: var(--cream); display: flex; flex-direction: column; transition: border-color 0.2s, transform 0.2s; }
        .wsb-hub-video-card:hover { border-color: rgba(201,168,76,0.5); transform: translateY(-2px); }
        .wsb-hub-video-thumb { position: relative; aspect-ratio: 16/9; overflow: hidden; background: var(--navy-light); }
        .wsb-hub-video-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .wsb-hub-video-thumb-empty { display: flex; align-items: center; justify-content: center; font-size: 2rem; color: var(--gold-dim); }
        .wsb-hub-video-play { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(6,12,26,0.4); opacity: 0; transition: opacity 0.2s; font-size: 2rem; color: var(--gold-bright); }
        .wsb-hub-video-card:hover .wsb-hub-video-play { opacity: 1; }
        .wsb-hub-video-body { padding: 0.75rem 1rem 1rem; flex: 1; display: flex; flex-direction: column; gap: 0.4rem; }
        .wsb-hub-video-title { font-size: 0.95rem; font-weight: 600; color: var(--cream); line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .wsb-hub-video-meta { display: flex; gap: 0.75rem; font-family: 'Cinzel', serif; font-size: 0.6rem; letter-spacing: 0.08em; color: var(--gold-dim); margin-top: auto; padding-top: 0.4rem; }
        .wsb-hub-no-videos { font-size: 0.95rem; color: var(--cream-dim); font-style: italic; padding: 1rem 0; }
        .wsb-hub-yt-link { margin-top: 1rem; text-align: right; }
        .wsb-hub-yt-link a { font-family: 'Cinzel', serif; font-size: 0.68rem; letter-spacing: 0.1em; color: var(--gold); text-decoration: none; }
        .wsb-hub-yt-link a:hover { color: var(--gold-bright); }

        .wsb-hub-footer { text-align: center; padding: 1.5rem; font-family: 'Cinzel', serif; font-size: 0.6rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold-dim); border-top: 1px solid var(--border); }

        @media (max-width: 640px) {
          .wsb-hub-hero { flex-direction: column; padding: 2.5rem 1.25rem 2rem; }
          .wsb-hub-content { padding: 2rem 1.25rem 3rem; }
          .wsb-hub-tools-grid, .wsb-hub-videos-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  )
}
