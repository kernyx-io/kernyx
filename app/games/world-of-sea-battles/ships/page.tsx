"use client";

import { useMemo, useState } from "react";
import "./ships.css";

const SHIPS = [
  { id: "le_cerf", name: "Le Cerf", type: "Fast", rate: 6, slots: 9, durability: 900, speed: 10.0, maneuverability: 97, broadsideArmor: 1.8, hold: 8000, crew: 78, heavyWeapons: "0-9-0", swivelGuns: 8, info: "Fast-moving Cutter. Excels at hit-and-run tactics and chasing down fleeing targets." },
  { id: "horizont", name: "Horizont", type: "Combat", rate: 7, slots: 8, durability: 850, speed: 8.4, maneuverability: 80, broadsideArmor: 3.2, hold: 7000, crew: 78, heavyWeapons: "2-8-0", swivelGuns: 6, info: "Battle Brigantine. A balanced early-game combat ship with decent broadside firepower." },
  { id: "friede", name: "Friede", type: "Transport", rate: 7, slots: 7, durability: 750, speed: 8.8, maneuverability: 86, broadsideArmor: 2.2, hold: 11000, crew: 72, heavyWeapons: "2-7-0", swivelGuns: 6, info: "Transport Flute. Designed to optimize transoceanic trade capacity and crew efficiency." },
  { id: "ballahoo", name: "Ballahoo", type: "Siege", rate: 7, slots: 6, durability: 700, speed: 9.1, maneuverability: 88, broadsideArmor: 1.5, hold: 6000, crew: 60, heavyWeapons: "0-6-0", swivelGuns: 6, info: "Siege Schooner. Small but fast, effective for coastal bombardment operations." },

  { id: "la_salamandre", name: "La Salamandre", type: "Combat", rate: 6, slots: 10, durability: 1160, speed: 8.8, maneuverability: 82, broadsideArmor: 3.6, hold: 9500, crew: 96, heavyWeapons: "2-10-0", swivelGuns: 6, info: "Battle Ketch. A reliable mid-tier combat vessel with solid broadside capability." },
  { id: "balloon", name: "Balloon", type: "Imperial", rate: 6, slots: 0, durability: 200, speed: 21.0, maneuverability: 50, broadsideArmor: 1.0, hold: 1000, crew: 8, heavyWeapons: "—", swivelGuns: 0, info: "Imperial Montgolfiere. Extremely fast aerial reconnaissance craft with minimal combat capability." },
  { id: "mercury", name: "Mercury", type: "Transport", rate: 6, slots: 9, durability: 1040, speed: 9.2, maneuverability: 89, broadsideArmor: 2.5, hold: 15500, crew: 88, heavyWeapons: "2-9-0", swivelGuns: 6, info: "Transport Galleon. Sailed between the New and Old Worlds for over 200 years carrying treasures." },

  { id: "black_prince", name: "Black Prince", type: "Imperial", rate: 5, slots: 15, durability: 1700, speed: 9.9, maneuverability: 90, broadsideArmor: 3.0, hold: 14500, crew: 120, heavyWeapons: "2-15-2", swivelGuns: 6, info: "Imperial Galleon. A menacing mid-tier vessel balancing speed and broadside punch." },
  { id: "la_creole", name: "La Creole", type: "Fast", rate: 5, slots: 12, durability: 1400, speed: 11.0, maneuverability: 100, broadsideArmor: 2.0, hold: 11000, crew: 96, heavyWeapons: "4-12-0", swivelGuns: 8, info: "Fast-moving Corvette. One of the most maneuverable ships at its tier — deadly in skilled hands." },
  { id: "russia", name: "Russia", type: "Transport", rate: 5, slots: 14, durability: 1600, speed: 9.9, maneuverability: 91, broadsideArmor: 2.7, hold: 22000, crew: 108, heavyWeapons: "2-14-0", swivelGuns: 6, info: "Transport Frigate. Laid down in 1724 during the reign of Peter the Great. Captured the French 30-gun frigate Le Brilliant in 1734." },

  { id: "surprise", name: "Surprise", type: "Fast", rate: 4, slots: 18, durability: 1680, speed: 10.5, maneuverability: 105, broadsideArmor: 2.4, hold: 13000, crew: 112, heavyWeapons: "0-18-2", swivelGuns: 8, info: "Fast-moving Corvette. Immortalized in naval fiction — blisteringly fast with a respectable broadside." },
  { id: "devourer", name: "Devourer", type: "Imperial", rate: 4, slots: 12, durability: 1760, speed: 7.5, maneuverability: 110, broadsideArmor: 5.5, hold: 17000, crew: 144, heavyWeapons: "12-11-8", swivelGuns: 8, info: "Imperial Barque. Heavily armored with exceptional maneuverability for its size — a fearsome brawler." },
  { id: "essex", name: "Essex", type: "Combat", rate: 4, slots: 21, durability: 2160, speed: 8.9, maneuverability: 88, broadsideArmor: 4.8, hold: 15500, crew: 136, heavyWeapons: "2-21-2", swivelGuns: 8, info: "Battle Frigate. Legend of the Age of Sail. Served in the First Barbary War and War of 1812." },

  { id: "poltava", name: "Poltava", type: "Fast", rate: 3, slots: 23, durability: 2100, speed: 9.6, maneuverability: 95, broadsideArmor: 2.8, hold: 15500, crew: 132, heavyWeapons: "0-23-4", swivelGuns: 10, info: "Fast Ship of the Line. Exceptional speed for a ship of the line — trades armor for mobility." },
  { id: "anson", name: "Anson", type: "Combat", rate: 3, slots: 30, durability: 2700, speed: 8.2, maneuverability: 80, broadsideArmor: 5.6, hold: 18500, crew: 160, heavyWeapons: "4-30-2", swivelGuns: 8, info: "Battle Ship of the Line. Legend of the Age of Sail. Fought at the Battle of the Saintes." },

  { id: "octopus", name: "Octopus", type: "Imperial", rate: 2, slots: 37, durability: 2760, speed: 8.3, maneuverability: 75, broadsideArmor: 6.8, hold: 23000, crew: 176, heavyWeapons: "8-37-0", swivelGuns: 10, info: "Imperial Ship of the Line. A terrifying broadside platform with formidable armor." },
  { id: "sans_pareil", name: "Sans Pareil", type: "Combat", rate: 2, slots: 38, durability: 3000, speed: 7.7, maneuverability: 74, broadsideArmor: 6.4, hold: 21500, crew: 184, heavyWeapons: "4-38-2", swivelGuns: 10, info: "Battle Ship of the Line. Captured by the English during the Glorious First of June. Later converted into a prison ship in 1807." },

  { id: "victory", name: "Victory", type: "Combat", rate: 1, slots: 49, durability: 3740, speed: 7.1, maneuverability: 66, broadsideArmor: 8.0, hold: 25000, crew: 204, heavyWeapons: "4-49-4", swivelGuns: 10, info: "Legend of the Age of Sail. Nelson's flagship at the Battle of Trafalgar. Launched in 1765, the oldest warship still in commission." },
  { id: "trincomalee", name: "Trincomalee", type: "Combat", rate: 1, slots: 46, durability: 3500, speed: 7.4, maneuverability: 70, broadsideArmor: 7.5, hold: 23000, crew: 196, heavyWeapons: "4-46-4", swivelGuns: 10, info: "Battle Ship of the Line. One of the oldest surviving warships afloat. A superb rate I combat platform." },
  { id: "santisima", name: "Santísima Trinidad", type: "Heavy", rate: 1, slots: 63, durability: 4160, speed: 6.8, maneuverability: 58, broadsideArmor: 9.0, hold: 28000, crew: 220, heavyWeapons: "4-63-4", swivelGuns: 12, info: "The most powerful ship ever built. Four gun decks, 63 broadside cannons, unmatched durability. Slow and unwieldy, but nothing survives a full broadside." },
];

const TYPES = ["All", "Combat", "Fast", "Transport", "Imperial", "Heavy", "Siege"];
const RATES = ["All", "1", "2", "3", "4", "5", "6", "7"];

const TYPE_COLORS: Record<string, string> = {
  Combat: "#00b4d8",
  Fast: "#4fc3f7",
  Transport: "#c8a84b",
  Imperial: "#e8a000",
  Heavy: "#ff6b35",
  Siege: "#a78bfa",
};

const RATE_LABELS: Record<number, string> = {
  1: "Rate I",
  2: "Rate II",
  3: "Rate III",
  4: "Rate IV",
  5: "Rate V",
  6: "Rate VI",
  7: "Rate VII",
};

function StatBar({
  label,
  value,
  max,
  color,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
}) {
  const pct = Math.min(100, (value / max) * 100);

  return (
    <div className="ships-stat">
      <div className="ships-stat-head">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="ships-stat-track">
        <div
          className="ships-stat-fill"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  );
}

function ShipCard({ ship }: { ship: (typeof SHIPS)[0] }) {
  const color = TYPE_COLORS[ship.type] ?? "#aaa";
  const broadsideCount =
    ship.heavyWeapons === "—"
      ? 0
      : parseInt(ship.heavyWeapons.split("-")[1] ?? "0", 10);

  return (
    <article className="ships-card">
      <div className="ships-card-top">
        <span className="ships-rate">{RATE_LABELS[ship.rate]}</span>
        <span className="ships-type" style={{ color, borderColor: color }}>
          {ship.type}
        </span>
      </div>

      <h2 className="ships-name">{ship.name}</h2>
      <p className="ships-info">{ship.info}</p>

      <div className="ships-meta">
        <span>⚓ {ship.slots} slots</span>
        <span>{ship.crew} crew</span>
        <span>{ship.hold.toLocaleString()} hold</span>
        <span>{ship.swivelGuns} swivels</span>
      </div>

      <div className="ships-stats">
        <StatBar label="Durability" value={ship.durability} max={4200} color="#00b4d8" />
        <StatBar label="Speed" value={ship.speed} max={21} color="#4fc3f7" />
        <StatBar label="Maneuverability" value={ship.maneuverability} max={110} color="#c9a84c" />
        <StatBar label="Armor" value={ship.broadsideArmor} max={9} color="#ff6b35" />
        <StatBar label="Broadside" value={broadsideCount} max={63} color="#a78bfa" />
      </div>
    </article>
  );
}

export default function ShipsPage() {
  const [typeFilter, setTypeFilter] = useState("All");
  const [rateFilter, setRateFilter] = useState("All");
  const [sortBy, setSort] = useState<"rate" | "durability" | "speed" | "broadside">("rate");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return SHIPS
      .filter((s) => typeFilter === "All" || s.type === typeFilter)
      .filter((s) => rateFilter === "All" || s.rate === parseInt(rateFilter, 10))
      .filter((s) => {
        const q = search.trim().toLowerCase();
        if (!q) return true;
        return (
          s.name.toLowerCase().includes(q) ||
          s.type.toLowerCase().includes(q) ||
          s.info.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        if (sortBy === "rate") return a.rate - b.rate;
        if (sortBy === "durability") return b.durability - a.durability;
        if (sortBy === "speed") return b.speed - a.speed;
        if (sortBy === "broadside") {
          const ba = a.heavyWeapons === "—" ? 0 : parseInt(a.heavyWeapons.split("-")[1] ?? "0", 10);
          const bb = b.heavyWeapons === "—" ? 0 : parseInt(b.heavyWeapons.split("-")[1] ?? "0", 10);
          return bb - ba;
        }
        return 0;
      });
  }, [typeFilter, rateFilter, sortBy, search]);

  return (
    <div className="ships-page">
      <div className="ships-header">
        <h1 className="ships-title">Ship Guide</h1>
        <p className="ships-subtitle">
          Browse every ship by role, rate, and combat profile — then compare what matters most before you commit to a build.
        </p>
      </div>

      <section className="ships-toolbar">
        <input
          className="ships-search"
          placeholder="Search by ship, type, or keyword..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select className="ships-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          {TYPES.map((t) => (
            <option key={t} value={t}>
              Type: {t}
            </option>
          ))}
        </select>

        <select className="ships-select" value={rateFilter} onChange={(e) => setRateFilter(e.target.value)}>
          {RATES.map((r) => (
            <option key={r} value={r}>
              {r === "All" ? "All Rates" : `Rate ${r}`}
            </option>
          ))}
        </select>

        <select
          className="ships-select"
          value={sortBy}
          onChange={(e) => setSort(e.target.value as "rate" | "durability" | "speed" | "broadside")}
        >
          <option value="rate">Sort: Rate</option>
          <option value="durability">Sort: Durability</option>
          <option value="speed">Sort: Speed</option>
          <option value="broadside">Sort: Broadside</option>
        </select>
      </section>

      <div className="ships-results-count">
        Showing {filtered.length} of {SHIPS.length} ships
      </div>

      <div className="ships-grid">
        {filtered.map((ship) => (
          <ShipCard key={ship.id} ship={ship} />
        ))}

        {filtered.length === 0 && (
          <div className="ships-empty">No ships match your filters.</div>
        )}
      </div>
    </div>
  );
}
