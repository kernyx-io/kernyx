import { NextResponse } from 'next/server';

const GAMES = [
  {
    id: 'wosb',
    name: 'World of Sea Battle',
    color: '#00b4d8',
    icon: '⚓',
    steamAppId: '2948190',
    rssUrl: undefined as string | undefined,
  },
];

export type NewsItem = {
  id: string;
  gameId: string;
  gameName: string;
  gameColor: string;
  gameIcon: string;
  title: string;
  url: string;
  date: string;
  timestamp: number;
  excerpt: string;
  source: 'steam' | 'rss';
};

async function fetchSteamNews(
  appId: string,
  gameId: string,
  gameName: string,
  gameColor: string,
  gameIcon: string,
  count = 10
): Promise<NewsItem[]> {
  try {
    const url = `https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=${appId}&count=${count}&maxlength=300&format=json`;
    const res = await fetch(url, { next: { revalidate: 900 } });
    if (!res.ok) return [];
    const data = await res.json();
    const items = data?.appnews?.newsitems ?? [];

    return items
      .filter((item: any) => item.feedname !== 'steam_community_announcements' || item.is_external_url !== 1)
      .slice(0, count)
      .map((item: any): NewsItem => ({
        id: `steam-${appId}-${item.gid}`,
        gameId,
        gameName,
        gameColor,
        gameIcon,
        title: item.title,
        url: item.url,
        date: new Date(item.date * 1000).toISOString(),
        timestamp: item.date * 1000,
        excerpt: stripHtml(item.contents ?? '').slice(0, 200).trim(),
        source: 'steam',
      }));
  } catch {
    return [];
  }
}

async function fetchRss(
  rssUrl: string,
  gameId: string,
  gameName: string,
  gameColor: string,
  gameIcon: string,
  count = 10
): Promise<NewsItem[]> {
  try {
    const res = await fetch(rssUrl, {
      next: { revalidate: 900 },
      headers: { 'User-Agent': 'Kernyx/1.0 (gaming tools site)' },
    });
    if (!res.ok) return [];
    const text = await res.text();

    const items: NewsItem[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;
    while ((match = itemRegex.exec(text)) !== null && items.length < count) {
      const block = match[1];
      const title   = extractTag(block, 'title');
      const link    = extractTag(block, 'link') || extractTag(block, 'guid');
      const pubDate = extractTag(block, 'pubDate');
      const desc    = extractTag(block, 'description');
      if (!title || !link) continue;

      const ts = pubDate ? new Date(pubDate).getTime() : Date.now();
      items.push({
        id: `rss-${gameId}-${encodeURIComponent(link)}`,
        gameId, gameName, gameColor, gameIcon,
        title: decodeHtmlEntities(title),
        url: link,
        date: new Date(ts).toISOString(),
        timestamp: ts,
        excerpt: stripHtml(desc ?? '').slice(0, 200).trim(),
        source: 'rss',
      });
    }
    return items;
  } catch {
    return [];
  }
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function extractTag(xml: string, tag: string): string {
  const m = xml.match(new RegExp(`<${tag}[^>]*>\\s*(?:<!\\[CDATA\\[)?(.*?)(?:\\]\\]>)?\\s*<\\/${tag}>`, 's'));
  return m ? m[1].trim() : '';
}

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#039;/g, "'");
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') ?? '20');

  const results = await Promise.all(
    GAMES.map((game) =>
      game.rssUrl
        ? fetchRss(game.rssUrl, game.id, game.name, game.color, game.icon, 10)
        : fetchSteamNews(game.steamAppId, game.id, game.name, game.color, game.icon, 10)
    )
  );

  const allNews: NewsItem[] = results
    .flat()
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, limit);

  return NextResponse.json({ news: allNews, fetchedAt: new Date().toISOString() });
}
