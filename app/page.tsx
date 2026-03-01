import React from "react";

const linkStyle: React.CSSProperties = {
  padding: "8px 12px",
  border: "1px solid #ddd",
  borderRadius: 6,
  textDecoration: "none",
  color: "inherit",
};

const cardStyle: React.CSSProperties = {
  padding: 16,
  border: "1px solid #eee",
  borderRadius: 8,
  background: "#fff",
  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
};

export default function Home() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "4rem",
        gap: "2rem",
      }}
    >
      <h1 style={{ fontSize: "clamp(1.8rem,4vw,3rem)", margin: 0 }}>Kernyx</h1>

      <p style={{ maxWidth: 720, textAlign: "center", color: "#555" }}>
        A small studio of interactive projects, tools, and experiments — a
        place for playful utilities, demos, and prototypes.
      </p>

      <nav style={{ display: "flex", gap: 12 }}>
        <a href="/games" style={linkStyle}>
          Games
        </a>
        <a href="/projects" style={linkStyle}>
          Projects
        </a>
        <a href="/about" style={linkStyle}>
          About
        </a>
      </nav>

      <section style={{ maxWidth: 900, width: "100%" }}>
        <h2 style={{ marginTop: 8 }}>Featured</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: 12,
          }}
        >
          <article style={cardStyle}>
            <h3 style={{ margin: "0 0 8px 0" }}>Interactive Calculator</h3>
            <p style={{ margin: 0, color: "#444" }}>
              A small utility for quick calculations and demos.
            </p>
            <div style={{ marginTop: 8 }}>
              <a href="/games/world-of-sea-battle/calculator/page" style={linkStyle}>
                Open
              </a>
            </div>
          </article>

          <article style={cardStyle}>
            <h3 style={{ margin: "0 0 8px 0" }}>Playground</h3>
            <p style={{ margin: 0, color: "#444" }}>
              Experiments and small interactive projects.
            </p>
            <div style={{ marginTop: 8 }}>
              <a href="/games/world-of-sea-battle" style={linkStyle}>
                Explore
              </a>
            </div>
          </article>
        </div>
      </section>

      <footer style={{ marginTop: 40, color: "#888" }}>
        © {new Date().getFullYear()} Kernyx — projects and demos.
      </footer>
    </main>
  );
}
