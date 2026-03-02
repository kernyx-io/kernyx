import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, game, reason } = body;

    if (!game?.trim()) {
      return NextResponse.json({ error: 'Game name is required' }, { status: 400 });
    }

    // Log suggestion server-side (visible in Vercel function logs)
    console.log('[GAME SUGGESTION]', {
      timestamp: new Date().toISOString(),
      name: name || '(anonymous)',
      game: game.trim(),
      reason: reason || '(none)',
    });

    // TODO: Swap this for a database write, email, or Discord webhook when ready.
    // Example Discord webhook:
    // await fetch(process.env.DISCORD_WEBHOOK_URL!, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     content: `**New Game Suggestion**\nGame: ${game}\nFrom: ${name || 'Anonymous'}\nNotes: ${reason || 'None'}`,
    //   }),
    // });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
