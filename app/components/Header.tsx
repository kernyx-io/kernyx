"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "News", href: "/news" },
  { label: "Store", href: "/store" },
  { label: "Suggest a Game", href: "/suggest" },
];

export default function Header() {
  const pathname = usePathname();

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
