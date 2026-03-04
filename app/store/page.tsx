import Link from "next/link";

export default function StorePage() {
  return (
    <main style={{ padding: "1.5rem 1.75rem", color: "#c0c8d8" }}>
      <div style={{ maxWidth: 900 }}>
        <h1 style={{ fontSize: "1.6rem", marginBottom: "0.5rem" }}>Store</h1>
        <p style={{ color: "#8892a4", marginBottom: "1.5rem" }}>
          Current supported game store links.
        </p>

        <a
          href="https://store.steampowered.com/app/2948190/World_of_Sea_Battle/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            padding: "1rem 1.25rem",
            textDecoration: "none",
            color: "inherit",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "6px",
            background: "#1a1e27",
            maxWidth: 420,
          }}
        >
          <span style={{ fontSize: "1.6rem" }}>⚓</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, color: "#e8ecf2" }}>World of Sea Battle</div>
            <div style={{ fontSize: "0.8rem", color: "#4a5368" }}>Steam · Free to Play</div>
          </div>
          <span style={{ color: "#00c8e8" }}>↗</span>
        </a>

        <div style={{ marginTop: "1rem" }}>
          <Link href="/games/world-of-sea-battles" style={{ color: "#00c8e8" }}>
            View game hub →
          </Link>
        </div>
      </div>
    </main>
  );
}
