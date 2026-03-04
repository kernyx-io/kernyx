import Link from "next/link";
import type { Metadata } from "next";
import "./hub.css";

export const metadata: Metadata = {
  title: "World of Sea Battle — Tools & Guides | Kernyx",
  description:
    "Damage calculators, ship builders, and combat guides for World of Sea Battle.",
};

interface YTVideo {
  title: string;
  link: string;
  published: string;
  thumbnail: string;
  channel: string;
}

async function fetchYouTubeVideos(query: string, max = 6): Promise<YTVideo[]> {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) return [];

    const encoded = encodeURIComponent(query);
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encoded}&type=video&maxResults=${max}&order=date&key=${apiKey}`;

    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];

    const data = await res.json();

    return (data.items ?? []).map((item: any) => ({
      title: item.snippet.title,
      link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      published: item.snippet.publishedAt,
      thumbnail: item.snippet.thumbnails?.medium?.url ?? "",
      channel: item.snippet.channelTitle,
    }));
  } catch {
    return [];
  }
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);

  if (days < 1) return "Today";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

const TOOLS = [
  {
    href: "/games/world-of-sea-battles/wsb-calculator",
    icon: "💥",
    title: "Broadside Calculator",
    desc: "Configure your ship, cannons, crew, attachments, and ammo to calculate full volley damage, DPM, and per-side breakdowns.",
    tags: ["DAMAGE", "DPM", "CANNONS"],
  },
];

const GUIDES: {
  title: string;
  desc: string;
  tags: string[];
  href?: string;
  live?: boolean;
}[] = [
  {
    title: "Ship Guide",
    desc: "Full stats, roles, and tactical breakdown for every ship in the Archipelago — all rates and types.",
    tags: ["SHIPS"],
    href: "/games/world-of-sea-battles/ships",
    live: true,
  },
];

export default async function WorldOfSeaBattlesPage() {
  const videos = await fetchYouTubeVideos("World of Sea Battle guide");

  return (
    <div className="wsb-hub-main">
      <div className="wsb-hub-hero">
        <div className="wsb-hub-hero-inner">
          <div className="wsb-hub-eyebrow">
            <span className="wsb-hub-game-badge">⚔ WORLD OF SEA BATTLE</span>
          </div>

          <h1 className="wsb-hub-title">
            Rule the
            <br />
            <em>Open Sea</em>
          </h1>

          <p className="wsb-hub-subtitle">
            Damage calculators, ship builders, and tactical guides for captains
            who demand precision.
          </p>

          <div className="wsb-hub-stats-row">
            <div className="wsb-hub-stat">
              <span>62</span> Ships
            </div>
            <div className="wsb-hub-stat-sep">·</div>
            <div className="wsb-hub-stat">
              <span>43</span> Cannons
            </div>
            <div className="wsb-hub-stat-sep">·</div>
            <div className="wsb-hub-stat">
              <span>35</span> Attachments
            </div>
            <div className="wsb-hub-stat-sep">·</div>
            <div className="wsb-hub-stat">
              <span>49</span> Crew
            </div>
          </div>
        </div>

        <div className="wsb-hub-hero-ship" aria-hidden>
          ⛵
        </div>
      </div>

      <div className="wsb-hub-content">
        <section className="wsb-hub-section">
          <div className="wsb-hub-section-header">
            <span className="wsb-hub-section-icon">⚙</span>
            TOOLS &amp; CALCULATORS
          </div>

          <div className="wsb-hub-tools-grid">
            {TOOLS.map((tool) => (
              <Link key={tool.title} href={tool.href} className="wsb-hub-tool-card">
                <div className="wsb-hub-tool-top">
                  <span className="wsb-hub-tool-icon">{tool.icon}</span>
                  <span className="wsb-hub-tool-badge wsb-hub-tool-badge-available">
                    AVAILABLE
                  </span>
                </div>

                <div className="wsb-hub-tool-title">{tool.title}</div>
                <div className="wsb-hub-tool-desc">{tool.desc}</div>

                <div className="wsb-hub-tool-tags">
                  {tool.tags.map((t) => (
                    <span key={t} className="wsb-hub-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="wsb-hub-section">
          <div className="wsb-hub-section-header">
            <span className="wsb-hub-section-icon">📖</span>
            GUIDES
          </div>

          <div className="wsb-hub-guides-grid">
            {GUIDES.map((guide) =>
              guide.live ? (
                <Link
                  key={guide.title}
                  href={guide.href!}
                  className="wsb-hub-guide-card wsb-hub-guide-card-live"
                >
                  <div className="wsb-hub-guide-live-badge">AVAILABLE</div>
                  <div className="wsb-hub-guide-title">{guide.title}</div>
                  <div className="wsb-hub-guide-desc">{guide.desc}</div>

                  <div className="wsb-hub-tool-tags">
                    {guide.tags.map((t) => (
                      <span key={t} className="wsb-hub-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </Link>
              ) : (
                <div key={guide.title} className="wsb-hub-guide-card">
                  <div className="wsb-hub-guide-soon-badge">SOON</div>
                  <div className="wsb-hub-guide-title">{guide.title}</div>
                  <div className="wsb-hub-guide-desc">{guide.desc}</div>

                  <div className="wsb-hub-tool-tags">
                    {guide.tags.map((t) => (
                      <span key={t} className="wsb-hub-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        <section className="wsb-hub-section">
          <div className="wsb-hub-section-header">
            <span className="wsb-hub-section-icon">▶</span>
            LATEST GUIDES
            <span className="wsb-hub-section-note">
              from YouTube · updates hourly
            </span>
          </div>

          {videos.length === 0 ? (
            <div className="wsb-hub-no-videos">
              Could not load videos right now — check back shortly.
            </div>
          ) : (
            <>
              <div className="wsb-hub-videos-grid">
                {videos.map((v, i) => (
                  <a
                    key={i}
                    href={v.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="wsb-hub-video-card"
                  >
                    {v.thumbnail && (
                      <img
                        src={v.thumbnail}
                        alt={v.title}
                        className="wsb-hub-video-thumb"
                      />
                    )}

                    <div className="wsb-hub-video-body">
                      <div className="wsb-hub-video-title">{v.title}</div>
                      <div className="wsb-hub-video-meta">
                        <span>{v.channel}</span>
                        <span>{timeAgo(v.published)}</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              <div className="wsb-hub-yt-link">
                <a
                  href="https://www.youtube.com/results?search_query=world+of+sea+battle+guide"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View all on YouTube →
                </a>
              </div>
            </>
          )}
        </section>

        <section className="wsb-hub-section">
          <div className="wsb-hub-section-header">
            <span className="wsb-hub-section-icon">🌐</span>
            OFFICIAL COMMUNITY
          </div>

          <div className="wsb-hub-community-grid">
            <a
              href="https://www.reddit.com/r/worldofseabattle/"
              target="_blank"
              rel="noopener noreferrer"
              className="wsb-hub-social-card"
            >
              <div className="wsb-hub-social-icon wsb-hub-social-reddit">👽</div>
              <div className="wsb-hub-social-body">
                <div className="wsb-hub-social-name">Reddit</div>
                <div className="wsb-hub-social-desc">
                  r/worldofseabattle — community discussion, tips, and news
                </div>
              </div>
              <div className="wsb-hub-social-arrow">→</div>
            </a>

            <a
              href="https://discord.gg/pmf8NXpVP4"
              target="_blank"
              rel="noopener noreferrer"
              className="wsb-hub-social-card"
            >
              <div className="wsb-hub-social-icon wsb-hub-social-discord">💬</div>
              <div className="wsb-hub-social-body">
                <div className="wsb-hub-social-name">Discord</div>
                <div className="wsb-hub-social-desc">
                  Official server — dev announcements, help channels, events
                </div>
              </div>
              <div className="wsb-hub-social-arrow">→</div>
            </a>

            <a
              href="https://x.com/WOSB_game"
              target="_blank"
              rel="noopener noreferrer"
              className="wsb-hub-social-card"
            >
              <div className="wsb-hub-social-icon wsb-hub-social-x">𝕏</div>
              <div className="wsb-hub-social-body">
                <div className="wsb-hub-social-name">X / Twitter</div>
                <div className="wsb-hub-social-desc">
                  Official account — updates, patch notes, and announcements
                </div>
              </div>
              <div className="wsb-hub-social-arrow">→</div>
            </a>

            <a
              href="https://www.facebook.com/WorldofSeaBattle"
              target="_blank"
              rel="noopener noreferrer"
              className="wsb-hub-social-card"
            >
              <div className="wsb-hub-social-icon wsb-hub-social-fb">f</div>
              <div className="wsb-hub-social-body">
                <div className="wsb-hub-social-name">Facebook</div>
                <div className="wsb-hub-social-desc">
                  Official page — community posts and game updates
                </div>
              </div>
              <div className="wsb-hub-social-arrow">→</div>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
