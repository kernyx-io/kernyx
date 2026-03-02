'use client'

import { useState } from 'react'
import Link from 'next/link'

function SuggestPanel({ onClose }: { onClose: () => void }) {
  const [name,    setName]    = useState('')
  const [game,    setGame]    = useState('')
  const [reason,  setReason]  = useState('')
  const [sent,    setSent]    = useState(false)
  const [sending, setSending] = useState(false)
  const [error,   setError]   = useState('')

  async function handleSubmit() {
    if (!game.trim()) { setError('Please enter a game name.'); return }
    setSending(true); setError('')
    try {
      await fetch('/api/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), game: game.trim(), reason: reason.trim() }),
      })
      setSent(true)
    } catch {
      setError('Something went wrong — please try again.')
    } finally {
      setSending(false)
    }
  }

  if (sent) return (
    <div className="wsb-hub-panel-thanks">
      <div>⚓</div>
      <h3>Thanks for the suggestion!</h3>
      <p>Popular requests get built first. Keep an eye on Kernyx for new game additions.</p>
      <button onClick={() => { setSent(false); setName(''); setGame(''); setReason(''); }}>
        Suggest another
      </button>
    </div>
  )

  return (
    <div className="wsb-hub-panel-suggest">
      <h2>Suggest a Game</h2>
      <p>Have a game you'd like to see tools and guides for? Let me know.</p>
      <div className="wsb-hub-suggest-field">
        <label>Your Name <span>(optional)</span></label>
        <input placeholder="Captain Blackwood" value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div className="wsb-hub-suggest-field">
        <label>Game Name <span className="req">*</span></label>
        <input placeholder="e.g. Sea of Thieves, Skull & Bones…" value={game} onChange={e => { setGame(e.target.value); setError('') }} />
      </div>
      <div className="wsb-hub-suggest-field">
        <label>What tools would you want? <span>(optional)</span></label>
        <textarea placeholder="e.g. Ship damage calc, crew optimizer…" value={reason} onChange={e => setReason(e.target.value)} rows={3} />
      </div>
      {error && <div className="wsb-hub-suggest-error">{error}</div>}
      <button className="wsb-hub-suggest-btn" onClick={handleSubmit} disabled={sending}>
        {sending ? 'Sending…' : 'Submit Suggestion →'}
      </button>
    </div>
  )
}

function StorePanel() {
  return (
    <div className="wsb-hub-panel-store">
      <h2>Game Store</h2>
      <p>Official store link for World of Sea Battle.</p>
      <a
        href="https://store.steampowered.com/app/2948190/World_of_Sea_Battle/"
        target="_blank"
        rel="noopener noreferrer"
        className="wsb-hub-store-card"
      >
        <span className="wsb-hub-store-icon">⚓</span>
        <div>
          <div className="wsb-hub-store-name">World of Sea Battle</div>
          <div className="wsb-hub-store-label">Steam · Free to Play</div>
        </div>
        <span className="wsb-hub-store-arrow">↗</span>
      </a>
      <div className="wsb-hub-store-disclaimer">
        Kernyx is an unofficial fan site and is not affiliated with the game's developers.
      </div>
    </div>
  )
}

export default function HubTopNav() {
  const [activeTab, setTab] = useState<'news' | 'store' | 'suggest' | null>(null)

  return (
    <>
      <nav className="wsb-hub-topnav">
        <Link href="/" className="wsb-hub-topnav-logo">
          <span className="wsb-hub-topnav-logomark">K</span>
          <span className="wsb-hub-topnav-logotext">ERNYX</span>
        </Link>
        <div className="wsb-hub-topnav-links">
          <button
            className={`wsb-hub-topnav-link ${activeTab === 'news' ? 'wsb-hub-topnav-link-active' : ''}`}
            onClick={() => setTab(activeTab === 'news' ? null : 'news')}
          >
            News
          </button>
          <button
            className={`wsb-hub-topnav-link ${activeTab === 'store' ? 'wsb-hub-topnav-link-active' : ''}`}
            onClick={() => setTab(activeTab === 'store' ? null : 'store')}
          >
            Store
          </button>
          <button
            className={`wsb-hub-topnav-link ${activeTab === 'suggest' ? 'wsb-hub-topnav-link-active' : ''}`}
            onClick={() => setTab(activeTab === 'suggest' ? null : 'suggest')}
          >
            Suggest a Game
          </button>
        </div>
        <div className="wsb-hub-topnav-tag">Unofficial Fan Tools</div>
      </nav>

      {/* Dropdown panel */}
      {activeTab !== null && (
        <div className="wsb-hub-topnav-panel">
          <button className="wsb-hub-topnav-panel-close" onClick={() => setTab(null)}>✕ Close</button>
          {activeTab === 'store'   && <StorePanel />}
          {activeTab === 'suggest' && <SuggestPanel onClose={() => setTab(null)} />}
          {activeTab === 'news'    && (
            <div className="wsb-hub-panel-news">
              <h2>News</h2>
              <p>Head to the <Link href="/">Kernyx home page</Link> for the latest World of Sea Battle news feed.</p>
            </div>
          )}
        </div>
      )}
    </>
  )
}
