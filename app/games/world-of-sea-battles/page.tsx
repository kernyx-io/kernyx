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
