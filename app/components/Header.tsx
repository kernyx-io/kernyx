"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "World of Sea Battle", href: "/wsb" },
  { label: "Skull and Bones", href: "/skull-and-bones" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header
      style={{
        background: "linear-gradient(135deg, #0a1628 0%, #132238 50%, #0d1b2e 100%)",
        borderBottom: "2px solid #c9a84c",
        padding: "1rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <Link
        href="/"
        style={{
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "2.25rem",
            fontWeight: 700,
            color: "#c9a84c",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Kernyx
        </span>
      </Link>

      <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        {navLinks.map((link) => {
          const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              style={{
                textDecoration: "none",
                fontFamily: "'Crimson Pro', serif",
                fontSize: "1.35rem",
                color: isActive ? "#c9a84c" : "#d0d8e8",
                borderBottom: isActive ? "2px solid #c9a84c" : "2px solid transparent",
                paddingBottom: "0.25rem",
                transition: "color 0.2s, border-color 0.2s",
              }}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
