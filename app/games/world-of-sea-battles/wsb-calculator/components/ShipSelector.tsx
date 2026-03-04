"use client";

type Ship = {
  id: string;
  name: string;
  shipType?: string;
  type?: string;
  rate: number;
  slots: number;
  durability: number;
  speed: number;
  maneuverability: number;
  broadsideArmor: number;
  hold: number;
  crew: number;
  heavyWeapons: string;
  swivelGuns: number;
  info?: string;
};

type ShipSelectorProps = {
  label: string;
  icon: string;
  title: string;
  caption: string;
  value: string;
  onChange: (shipId: string) => void;
  ships: Ship[];
  variant?: "player" | "target";
};

function formatRate(rate: number) {
  return `Rate ${rate}`;
}

export default function ShipSelector({
  label,
  icon,
  title,
  caption,
  value,
  onChange,
  ships,
}: ShipSelectorProps) {
  const selectedShip =
    ships.find((ship) => ship.id === value) ??
    ships.find((ship) => ship.id !== "none") ??
    ships[0];

  const shipRole = selectedShip?.shipType || selectedShip?.type || "Balanced";

  return (
    <div className="calc-ship-selector">
      <div className="calc-selector-head">
        <div className="calc-selector-title">
          <span className="calc-selector-icon">{icon}</span>
          <span>{title}</span>
        </div>
        <div className="calc-selector-caption">{caption}</div>
      </div>

      <div className="calc-selector-control">
        <label className="calc-selector-label">{label}</label>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="calc-selector-select"
        >
          {ships.map((ship) => (
            <option key={ship.id} value={ship.id}>
              {ship.name}
            </option>
          ))}
        </select>
      </div>

      {selectedShip && (
        <div className="calc-ship-card">
          <div className="calc-ship-card-top">
            <div>
              <div className="calc-ship-name">{selectedShip.name}</div>
              <div className="calc-ship-subline">
                {formatRate(selectedShip.rate)} · {shipRole}
              </div>
            </div>

            <div className="calc-ship-badges">
              <span className="calc-ship-badge">{selectedShip.slots} slots</span>
              <span className="calc-ship-badge">
                {selectedShip.swivelGuns} swivels
              </span>
            </div>
          </div>

          <div className="calc-ship-stats-grid">
            <div className="calc-ship-stat">
              <span className="calc-ship-stat-label">Durability</span>
              <span className="calc-ship-stat-value">
                {selectedShip.durability.toLocaleString()}
              </span>
            </div>

            <div className="calc-ship-stat">
              <span className="calc-ship-stat-label">Speed</span>
              <span className="calc-ship-stat-value">{selectedShip.speed}</span>
            </div>

            <div className="calc-ship-stat">
              <span className="calc-ship-stat-label">Maneuver</span>
              <span className="calc-ship-stat-value">
                {selectedShip.maneuverability}
              </span>
            </div>

            <div className="calc-ship-stat">
              <span className="calc-ship-stat-label">Armor</span>
              <span className="calc-ship-stat-value">
                {selectedShip.broadsideArmor}
              </span>
            </div>

            <div className="calc-ship-stat">
              <span className="calc-ship-stat-label">Crew</span>
              <span className="calc-ship-stat-value">{selectedShip.crew}</span>
            </div>

            <div className="calc-ship-stat">
              <span className="calc-ship-stat-label">Hold</span>
              <span className="calc-ship-stat-value">
                {selectedShip.hold.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="calc-ship-weapons">
            <span className="calc-ship-weapons-label">Weapons</span>
            <span className="calc-ship-weapons-value">
              {selectedShip.heavyWeapons}
            </span>
          </div>

          {selectedShip.info && (
            <p className="calc-ship-description">{selectedShip.info}</p>
          )}
        </div>
      )}
    </div>
  );
}
