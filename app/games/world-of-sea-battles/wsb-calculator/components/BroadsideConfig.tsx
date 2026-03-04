"use client";

import "./calculator.css";
import { useWsbStore } from "@/lib/wsb/store";
import { getShipById, parseWeaponSlots } from "@/lib/wsb/ships";
import { CANNONS, CANNON_CATEGORIES, getCannonById } from "@/lib/wsb/cannons";
import type { CannonSlot } from "@/lib/wsb/types";

function CannonSelect({
  value,
  onChange,
  position,
  placeholder = "— Select cannon —",
}: {
  value: string;
  onChange: (id: string) => void;
  position: CannonSlot["position"];
  placeholder?: string;
}) {
  const filtered = CANNONS.filter((c) =>
    position === "broadside"
      ? !c.bowSternOnly && !c.specialShipOnly
      : !c.specialShipOnly
  );

  const grouped = CANNON_CATEGORIES.reduce<Record<string, typeof filtered>>(
    (acc, cat) => {
      const items = filtered.filter((c) => c.category === cat);
      if (items.length) acc[cat] = items;
      return acc;
    },
    {}
  );

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="calc-cannon-select"
    >
      <option value="none">{placeholder}</option>
      {Object.entries(grouped).map(([cat, cannons]) => (
        <optgroup key={cat} label={cat}>
          {cannons.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
              {c.rank ? ` (${c.rank})` : ""}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
}

function SlotGroup({
  title,
  count,
  slots,
  position,
  onFill,
}: {
  title: string;
  count: number;
  slots: CannonSlot[];
  position: CannonSlot["position"];
  onFill: (cannonId: string) => void;
}) {
  const ids = slots.map((s) => s.cannonId);
  const unifiedValue =
    ids.length > 0 && ids.every((id) => id === ids[0]) ? ids[0] : "none";

  const cannon = getCannonById(unifiedValue);

  return (
    <div className="calc-slot-group">
      <div className="calc-slot-group-head">
        <div>
          <div className="calc-slot-group-label">{title}</div>
          <div className="calc-slot-group-count">
            {count} {count === 1 ? "slot" : "slots"}
          </div>
        </div>

        <div className="calc-slot-group-badge">
          {cannon && cannon.id !== "none" ? "Armed" : "Empty"}
        </div>
      </div>

      <CannonSelect
        value={unifiedValue}
        onChange={onFill}
        position={position}
        placeholder="— Select cannon —"
      />

      {cannon && cannon.id !== "none" ? (
        <div className="calc-cannon-summary">
          <div className="calc-cannon-name">{cannon.name}</div>

          <div className="calc-cannon-stats">
            <div className="calc-cannon-stat">
              <span>Dmg</span>
              <strong>{cannon.dmg}</strong>
            </div>
            <div className="calc-cannon-stat">
              <span>Pen</span>
              <strong>{cannon.penetration}</strong>
            </div>
            <div className="calc-cannon-stat">
              <span>Reload</span>
              <strong>{cannon.reloadTime}s</strong>
            </div>
            <div className="calc-cannon-stat">
              <span>Range</span>
              <strong>
                {cannon.rangeMin ? `${cannon.rangeMin}–` : ""}
                {cannon.range}m
              </strong>
            </div>
            {cannon.shots > 1 && (
              <div className="calc-cannon-stat">
                <span>Shots</span>
                <strong>×{cannon.shots}</strong>
              </div>
            )}
          </div>

          <div className="calc-cannon-note">
            All {count} {title.toLowerCase()} slots will use this cannon.
          </div>
        </div>
      ) : (
        <div className="calc-cannon-empty">
          No cannon selected for this section yet.
        </div>
      )}
    </div>
  );
}

function ShipCentre({
  ship,
  layout,
}: {
  ship: NonNullable<ReturnType<typeof getShipById>>;
  layout: { bow: number; broadside: number; stern: number };
}) {
  return (
    <div className="calc-ship-centre">
      <div className="calc-ship-centre-icon">⛵</div>
      <div className="calc-ship-centre-name">{ship.name}</div>
      <div className="calc-ship-centre-meta">
        Rate {ship.rate} · {ship.shipType}
      </div>

      <div className="calc-ship-layout">
        {layout.bow > 0 && <span>{layout.bow} Bow</span>}
        {layout.broadside > 0 && <span>{layout.broadside} per side</span>}
        {layout.stern > 0 && <span>{layout.stern} Stern</span>}
      </div>
    </div>
  );
}

export default function BroadsideConfig() {
  const { shipId, cannonSlots, setCannonSlot, resetSlots } = useWsbStore();

  const ship = getShipById(shipId);
  const layout = ship
    ? parseWeaponSlots(ship.heavyWeapons)
    : { bow: 0, broadside: 0, stern: 0 };

  const n = layout.broadside;

  function getSideSlots(
    position: CannonSlot["position"],
    start: number,
    count: number
  ): CannonSlot[] {
    return Array.from({ length: count }, (_, i) => {
      const idx = start + i;
      return (
        cannonSlots.find((s) => s.position === position && s.index === idx) ?? {
          position,
          index: idx,
          cannonId: "none",
        }
      );
    });
  }

  function fillSide(
    position: CannonSlot["position"],
    start: number,
    count: number,
    cannonId: string
  ) {
    Array.from({ length: count }, (_, i) =>
      setCannonSlot(position, start + i, cannonId)
    );
  }

  const bowSlots = getSideSlots("bow", 0, layout.bow);
  const portSlots = getSideSlots("broadside", 0, n);
  const starboardSlots = getSideSlots("broadside", n, n);
  const sternSlots = getSideSlots("stern", 0, layout.stern);

  if (!ship) {
    return (
      <div className="calc-broadside-empty">
        <div className="calc-broadside-empty-icon">⚓</div>
        <div className="calc-broadside-empty-title">No ship selected</div>
        <div className="calc-broadside-empty-text">
          Choose your vessel above to unlock its cannon layout.
        </div>
      </div>
    );
  }

  return (
    <div className="calc-broadside-builder">
      <div className="calc-broadside-toolbar">
        <div>
          <div className="calc-broadside-label">Broadside Builder</div>
          <div className="calc-broadside-sub">
            Configure each firing section for {ship.name}
          </div>
        </div>

        <button
          type="button"
          onClick={() => resetSlots()}
          className="calc-reset-button"
        >
          Clear All
        </button>
      </div>

      <div className="calc-broadside-layout">
        {layout.bow > 0 && (
          <SlotGroup
            title="Bow"
            count={layout.bow}
            slots={bowSlots}
            position="bow"
            onFill={(id) => fillSide("bow", 0, layout.bow, id)}
          />
        )}

        <SlotGroup
          title="Port"
          count={n}
          slots={portSlots}
          position="broadside"
          onFill={(id) => fillSide("broadside", 0, n, id)}
        />

        <div className="calc-broadside-centre-wrap">
          <ShipCentre ship={ship} layout={layout} />
        </div>

        <SlotGroup
          title="Starboard"
          count={n}
          slots={starboardSlots}
          position="broadside"
          onFill={(id) => fillSide("broadside", n, n, id)}
        />

        {layout.stern > 0 && (
          <SlotGroup
            title="Stern"
            count={layout.stern}
            slots={sternSlots}
            position="stern"
            onFill={(id) => fillSide("stern", 0, layout.stern, id)}
          />
        )}
      </div>
    </div>
  );
}
