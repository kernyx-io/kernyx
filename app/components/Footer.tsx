"use client";

import Link from "next/link";

const footerLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Contact", href: "/contact" },
  { label: "About", href: "/about" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "linear-gradient(135deg, #0a1628 0%, #132238 50%, #0d1b2e 100%)",
        borderTop: "2px solid #c9a84c",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          flexWrap: "wrap",
          marginBottom: "1.25rem",
        }}
      >
        {footerLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              textDecoration: "none",
              fontFamily: "'Crimson Pro', serif",
              fontSize: "1.15rem",
              color: "#d0d8e8",
              transition: "color 0.2s",
            }}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <p
        style={{
          fontFamily: "'Crimson Pro', serif",
          fontSize: "1rem",
          color: "#6b7a90",
          margin: 0,
        }}
      >
        &copy; {year} Kernyx. All rights reserved. Kernyx is a fan site and is not affiliated with any game developers or publishers.
      </p>
    </footer>
  );
}
