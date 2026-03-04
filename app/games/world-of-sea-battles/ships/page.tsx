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
        <StatBar
          label="Maneuverability"
          value={ship.maneuverability}
          max={110}
          color="#c9a84c"
        />
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
          const ba =
            a.heavyWeapons === "—"
              ? 0
              : parseInt(a.heavyWeapons.split("-")[1] ?? "0", 10);
          const bb =
            b.heavyWeapons === "—"
              ? 0
              : parseInt(b.heavyWeapons.split("-")[1] ?? "0", 10);
          return bb - ba;
        }
        return 0;
      });
  }, [typeFilter, rateFilter, sortBy, search]);

  const featuredShip = useMemo(() => {
    if (filtered.length === 0) return null;
    return [...filtered].sort((a, b) => b.durability - a.durability)[0];
  }, [filtered]);

  const totalShips = SHIPS.length;
  const combatShips = SHIPS.filter((s) => s.type === "Combat").length;
  const fastestShip = [...SHIPS].sort((a, b) => b.speed - a.speed)[0];
  const strongestBroadside = [...SHIPS].sort((a, b) => {
    const ba =
      a.heavyWeapons === "—" ? 0 : parseInt(a.heavyWeapons.split("-")[1] ?? "0", 10);
    const bb =
      b.heavyWeapons === "—" ? 0 : parseInt(b.heavyWeapons.split("-")[1] ?? "0", 10);
    return bb - ba;
  })[0];

  return (
    <div className="ships-page">
      <div className="ships-header">
        <Link href="/games/world-of-sea-battles" className="ships-back">
          ← Back to Hub
        </Link>

        <h1 className="ships-title">Ship Guide</h1>
        <p className="ships-subtitle">
          Browse every ship by role, rate, and combat profile — then compare what
          matters most before you commit to a build.
        </p>
      </div>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "0.75rem",
          marginBottom: "1.25rem",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "8px",
            padding: "0.9rem 1rem",
          }}
        >
          <div style={{ fontSize: "0.7rem", opacity: 0.65, textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Total Ships
          </div>
          <div style={{ fontSize: "1.35rem", fontWeight: 700 }}>{totalShips}</div>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "8px",
            padding: "0.9rem 1rem",
          }}
        >
          <div style={{ fontSize: "0.7rem", opacity: 0.65, textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Combat Ships
          </div>
          <div style={{ fontSize: "1.35rem", fontWeight: 700 }}>{combatShips}</div>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "8px",
            padding: "0.9rem 1rem",
          }}
        >
          <div style={{ fontSize: "0.7rem", opacity: 0.65, textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Fastest Ship
          </div>
          <div style={{ fontSize: "1rem", fontWeight: 700 }}>{fastestShip.name}</div>
          <div style={{ opacity: 0.7 }}>{fastestShip.speed} speed</div>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "8px",
            padding: "0.9rem 1rem",
          }}
        >
          <div style={{ fontSize: "0.7rem", opacity: 0.65, textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Strongest Broadside
          </div>
          <div style={{ fontSize: "1rem", fontWeight: 700 }}>{strongestBroadside.name}</div>
          <div style={{ opacity: 0.7 }}>{strongestBroadside.heavyWeapons}</div>
        </div>
      </section>

      {featuredShip && (
        <section
          style={{
            marginBottom: "1.5rem",
            background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "10px",
            padding: "1rem 1.1rem",
          }}
        >
          <div
            style={{
              fontSize: "0.72rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              opacity: 0.7,
              marginBottom: "0.5rem",
            }}
          >
            Featured Flagship
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 1fr",
              gap: "1rem",
            }}
          >
            <div>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.45rem" }}>
                <span className="ships-rate">{RATE_LABELS[featuredShip.rate]}</span>
                <span
                  className="ships-type"
                  style={{
                    color: TYPE_COLORS[featuredShip.type] ?? "#aaa",
                    borderColor: TYPE_COLORS[featuredShip.type] ?? "#aaa",
                  }}
                >
                  {featuredShip.type}
                </span>
              </div>

              <h2 style={{ margin: 0, fontSize: "1.4rem" }}>{featuredShip.name}</h2>
              <p style={{ margin: "0.5rem 0 0", opacity: 0.8, lineHeight: 1.6 }}>
                {featuredShip.info}
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "0.6rem",
                alignContent: "start",
              }}
            >
              <div style={{ opacity: 0.75 }}>Durability</div>
              <div style={{ textAlign: "right", fontWeight: 700 }}>{featuredShip.durability}</div>

              <div style={{ opacity: 0.75 }}>Armor</div>
              <div style={{ textAlign: "right", fontWeight: 700 }}>{featuredShip.broadsideArmor}</div>

              <div style={{ opacity: 0.75 }}>Crew</div>
              <div style={{ textAlign: "right", fontWeight: 700 }}>{featuredShip.crew}</div>

              <div style={{ opacity: 0.75 }}>Weapons</div>
              <div style={{ textAlign: "right", fontWeight: 700 }}>{featuredShip.heavyWeapons}</div>
            </div>
          </div>
        </section>
      )}

      <section
        style={{
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "10px",
          padding: "1rem",
          marginBottom: "1.25rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(220px, 1.4fr) repeat(3, minmax(140px, 1fr))",
            gap: "0.75rem",
          }}
        >
          <input
            className="ships-search"
            placeholder="Search by ship, type, or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%" }}
          />

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem 0.85rem",
              background: "#111827",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "8px",
              color: "#e8e0d0",
            }}
          >
            {TYPES.map((t) => (
              <option key={t} value={t}>
                Type: {t}
              </option>
            ))}
          </select>

          <select
            value={rateFilter}
            onChange={(e) => setRateFilter(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem 0.85rem",
              background: "#111827",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "8px",
              color: "#e8e0d0",
            }}
          >
            {RATES.map((r) => (
              <option key={r} value={r}>
                {r === "All" ? "All Rates" : `Rate ${r}`}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) =>
              setSort(e.target.value as "rate" | "durability" | "speed" | "broadside")
            }
            style={{
              width: "100%",
              padding: "0.75rem 0.85rem",
              background: "#111827",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "8px",
              color: "#e8e0d0",
            }}
          >
            <option value="rate">Sort: Rate</option>
            <option value="durability">Sort: Durability</option>
            <option value="speed">Sort: Speed</option>
            <option value="broadside">Sort: Broadside</option>
          </select>
        </div>

        <div
          style={{
            marginTop: "0.8rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setTypeFilter("All");
              setRateFilter("All");
              setSort("rate");
            }}
            style={{
              padding: "0.45rem 0.75rem",
              background: "rgba(0,180,216,0.08)",
              border: "1px solid rgba(0,180,216,0.25)",
              borderRadius: "999px",
              color: "#7dd3fc",
            }}
          >
            Reset Filters
          </button>

          <div style={{ opacity: 0.7, alignSelf: "center" }}>
            Showing {filtered.length} of {SHIPS.length} ships
          </div>
        </div>
      </section>

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
