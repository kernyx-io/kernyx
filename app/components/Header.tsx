"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

const gameLinks = [
  { label: "All Games", href: "/games" },
  { label: "World of Sea Battle", href: "/games/world-of-sea-battles" },
];

const navLinks = [
  { label: "Store", href: "/store" },
  { label: "News", href: "/news" },
  { label: "Suggest a Game", href: "/suggest" },
];

export default function Header() {
  const pathname = usePathname();
  const [gamesOpen, setGamesOpen] = useState(false);

  const gamesActive = useMemo(() => {
    return pathname === "/games" || pathname.startsWith("/games/");
  }, [pathname]);

  return (
    <header
      style={{
        background: "#0d1117",
        borderBottom: "1px solid #1a2332",
        padding: "0.75rem 1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#e6edf3",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Kernyx
          </span>
        </Link>

        <nav style={{ display: "flex", gap: "0.25rem", alignItems: "center" }}>
          <div
            style={{ position: "relative" }}
            onMouseEnter={() => setGamesOpen(true)}
            onMouseLeave={() => setGamesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setGamesOpen((v) => !v)}
              style={{
                fontFamily: "'Inter', 'Segoe UI', sans-serif",
                fontSize: "0.9rem",
                color: gamesActive ? "#0d1117" : "#e6edf3",
                backgroundColor: gamesActive ? "#00d4ff" : "transparent",
                padding: "0.35rem 0.85rem",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.2s, color 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
              aria-haspopup="menu"
              aria-expanded={gamesOpen}
            >
              <span>Games</span>
              <span style={{ fontSize: "0.7rem" }}>{gamesOpen ? "▲" : "▼"}</span>
            </button>

            {gamesOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 0.45rem)",
                  left: 0,
                  minWidth: "220px",
                  background: "#111827",
                  border: "1px solid #1f2937",
                  borderRadius: "8px",
                  padding: "0.35rem",
                  boxShadow: "0 10px 24px rgba(0, 0, 0, 0.35)",
                }}
              >
                {gameLinks.map((link) => {
                  const isActive =
                    pathname === link.href ||
                    (link.href !== "/games" && pathname.startsWith(link.href));

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setGamesOpen(false)}
                      style={{
                        display: "block",
                        textDecoration: "none",
                        fontFamily: "'Inter', 'Segoe UI', sans-serif",
                        fontSize: "0.9rem",
                        color: isActive ? "#0d1117" : "#e6edf3",
                        backgroundColor: isActive ? "#00d4ff" : "transparent",
                        padding: "0.6rem 0.75rem",
                        borderRadius: "6px",
                        transition: "background-color 0.2s, color 0.2s",
                      }}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  textDecoration: "none",
                  fontFamily: "'Inter', 'Segoe UI', sans-serif",
                  fontSize: "0.9rem",
                  color: isActive ? "#0d1117" : "#e6edf3",
                  backgroundColor: isActive ? "#00d4ff" : "transparent",
                  padding: "0.35rem 0.85rem",
                  borderRadius: "4px",
                  transition: "background-color 0.2s, color 0.2s",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <span
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: "0.7rem",
          color: "#4a5568",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}
      >
        Unofficial Fan Tools
      </span>
    </header>
  );
}
