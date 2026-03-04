"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import type { NewsItem } from "./api/news/route";

const WOSB = {
  color: "#00b4d8",
  icon: "⚓",
};

function timeAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function NewsCard({
  item,
  featured,
}: {
  item: NewsItem;
  featured?: boolean;
}) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.newsCard} ${featured ? styles.newsCardFeatured : ""}`}
    >
      <div className={styles.newsCardTop}>
        <span
          className={styles.newsGameTag}
          style={{ color: WOSB.color, borderColor: WOSB.color }}
        >
          {WOSB.icon} {item.gameName}
        </span>
        <span className={styles.newsTime}>{timeAgo(item.date)}</span>
      </div>

      <div className={styles.newsTitle}>{item.title}</div>

      {featured && item.excerpt && (
        <p className={styles.newsExcerpt}>{item.excerpt}…</p>
      )}

      <div className={styles.newsFooter}>
        <span className={styles.newsSource}>
          {item.source === "rss" ? "Official Site" : "Steam"}
        </span>
        <span className={styles.newsReadMore}>Read →</span>
      </div>
    </a>
  );
}

export default function HomePage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/news?limit=20")
      .then((r) => r.json())
      .then((d) => {
        setNews(d.news ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const featured = news[0];
  const secondary = news.slice(1, 3);
  const rest = news.slice(3);

  return (
    <>
      <h1 className="pageTitle">Latest News</h1>
      <p className="pageSubtitle">
        Latest updates from supported games and official sources.
      </p>

      {loading && (
        <div className={styles.loadingState}>
          <div className={styles.loadingDots}>
            <span />
            <span />
            <span />
          </div>
          <span>Fetching latest updates…</span>
        </div>
      )}

      {!loading && news.length === 0 && (
        <div className={styles.emptyState}>
          No news found right now — check back shortly.
        </div>
      )}

      {!loading && news.length > 0 && (
        <>
          <div className={styles.newsHero}>
            {featured && <NewsCard item={featured} featured />}
            <div className={styles.newsSecondary}>
              {secondary.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
          </div>

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
  );
}
