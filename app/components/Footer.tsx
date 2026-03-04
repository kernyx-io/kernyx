"use client";

import Link from "next/link";

const footerLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "#0d1117",
        borderTop: "1px solid #1a2332",
        padding: "1.5rem 2rem",
        textAlign: "center",
      }}
    >
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1.5rem",
          flexWrap: "wrap",
          marginBottom: "1rem",
        }}
      >
        {footerLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              textDecoration: "none",
              fontFamily: "'Inter', 'Segoe UI', sans-serif",
              fontSize: "0.85rem",
              color: "#00d4ff",
              transition: "color 0.2s",
            }}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <p
        style={{
          fontFamily: "'Inter', 'Segoe UI', sans-serif",
          fontSize: "0.75rem",
          color: "#4a5568",
          margin: 0,
          lineHeight: 1.6,
        }}
      >
        &copy; {year} Kernyx. All rights reserved. Kernyx is an unofficial fan site and is not
        affiliated with any game developers or publishers.
      </p>
    </footer>
  );
}
