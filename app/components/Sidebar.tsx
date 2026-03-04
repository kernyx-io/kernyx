"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <aside className="site-sidebar">
      <div className="sidebarSection">
        <div className="sidebarLabel">Current Game</div>
        <Link
          href="/games/world-of-sea-battles"
          className={`sidebarGame ${isActive("/games/world-of-sea-battles") ? "sidebarItemActive" : ""}`}
        >
          <span>⚓</span>
          <span>World of Sea Battle</span>
        </Link>
      </div>

      <div className="sidebarSection">
        <div className="sidebarLabel">Tools</div>
        <Link
          href="/games/world-of-sea-battles/wsb-calculator"
          className={`sidebarLink ${isActive("/games/world-of-sea-battles/wsb-calculator") ? "sidebarItemActive" : ""}`}
        >
          💥 Cannon DPS Calc
        </Link>
        <Link
          href="/games/world-of-sea-battles/ships"
          className={`sidebarLink ${isActive("/games/world-of-sea-battles/ships") ? "sidebarItemActive" : ""}`}
        >
          🚢 Ship Guide
        </Link>
      </div>

      <div className="sidebarSection">
        <div className="sidebarLabel">Coming Soon</div>
        <Link href="/suggest" className="sidebarSuggestBtn">
          + Suggest a game
        </Link>
      </div>

      <div className="sidebarSection">
        <div className="sidebarLabel">Quick Store</div>
        <a
          href="https://store.steampowered.com/app/2948190/World_of_Sea_Battle/"
          target="_blank"
          rel="noopener noreferrer"
          className="sidebarStoreLink"
        >
          <span>⚓</span>
          <span>World of Sea Battle</span>
          <span className="sidebarStoreLinkArrow">↗</span>
        </a>
      </div>
    </aside>
  );
}
