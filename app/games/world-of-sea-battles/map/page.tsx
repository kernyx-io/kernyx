"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import "./map.css";

type MapItem = {
  id: string;
  name: string;
  icon: string;
  x: number; // percentage
  y: number; // percentage
  type: "boss" | "merchant" | "wreck" | "event" | "resource";
  description: string;
};

const MAP_ITEMS: MapItem[] = [
  { id: "item-01", name: "Apostolov Patrol", icon: "⚔️", x: 12, y: 18, type: "boss", description: "Heavy patrol route in the north-west waters." },
  { id: "item-02", name: "Imperial Convoy", icon: "📦", x: 28, y: 22, type: "merchant", description: "Merchant convoy often carrying trade goods." },
  { id: "item-03", name: "Sunken Cache", icon: "💀", x: 41, y: 16, type: "wreck", description: "Possible wreck site with hidden loot." },
  { id: "item-04", name: "Storm Event", icon: "⛈️", x: 58, y: 20, type: "event", description: "Frequent storm cell with dangerous visibility." },
  { id: "item-05", name: "Supply Crates", icon: "🪵", x: 79, y: 19, type: "resource", description: "Floating supply resources and salvage." },

  { id: "item-06", name: "Black Prince Route", icon: "⚔️", x: 18, y: 35, type: "boss", description: "Combat-heavy route with stronger enemy traffic." },
  { id: "item-07", name: "Trader Crossing", icon: "📦", x: 34, y: 38, type: "merchant", description: "A reliable shipping lane for ambushes or escort." },
  { id: "item-08", name: "Broken Frigate", icon: "💀", x: 52, y: 33, type: "wreck", description: "Damaged frigate remains scattered in shallow water." },
  { id: "item-09", name: "Whirlpool Zone", icon: "⛈️", x: 67, y: 40, type: "event", description: "Hazardous current zone. Navigation risk is high." },
  { id: "item-10", name: "Timber Field", icon: "🪵", x: 84, y: 43, type: "resource", description: "Good region for gathering shipbuilding materials." },

  { id: "item-11", name: "La Royale Watch", icon: "⚔️", x: 13, y: 57, type: "boss", description: "Enemy fleet activity reported in this area." },
  { id: "item-12", name: "Open Market Lane", icon: "📦", x: 31, y: 55, type: "merchant", description: "High traffic lane with lighter escorts." },
  { id: "item-13", name: "Deepwater Wreck", icon: "💀", x: 49, y: 58, type: "wreck", description: "Deepwater recovery point with possible rare loot." },
  { id: "item-14", name: "Raid Event", icon: "⛈️", x: 63, y: 60, type: "event", description: "Dynamic skirmish zone that can escalate fast." },
  { id: "item-15", name: "Ore Cluster", icon: "🪵", x: 78, y: 63, type: "resource", description: "Resource-rich area for crafting materials." },

  { id: "item-16", name: "South Gate Fleet", icon: "⚔️", x: 21, y: 78, type: "boss", description: "Late-route combat hotspot near the southern lanes." },
  { id: "item-17", name: "Harbor Traders", icon: "📦", x: 39, y: 80, type: "merchant", description: "Common stop for supply and commodity movement." },
  { id: "item-18", name: "Lost Cargo", icon: "💀", x: 61, y: 81, type: "wreck", description: "Scattered cargo field from a destroyed convoy." },
  { id: "item-19", name: "Southern Salvage", icon: "🪵", x: 82, y: 84, type: "resource", description: "Dense salvage zone with frequent pickups." },
];

const TYPE_LABELS: Record<MapItem["type"], string> = {
  boss: "Boss / Combat",
  merchant: "Merchant",
  wreck: "Wreck / Loot",
  event: "Event",
  resource: "Resource",
};

export default function WosbMapPage() {
  const [visible, setVisible] = useState<Record<string, boolean>>(
    Object.fromEntries(MAP_ITEMS.map((item) => [item.id, true]))
  );
  const [selectedId, setSelectedId] = useState<string | null>(MAP_ITEMS[0]?.id ?? null);

  const selectedItem = useMemo(
    () => MAP_ITEMS.find((item) => item.id === selectedId) ?? null,
    [selectedId]
  );

  function toggleItem(id: string) {
    setVisible((prev) => ({ ...prev, [id]: !prev[id] }));
    if (selectedId === id && visible[id]) {
      setSelectedId(null);
    }
  }

  function showAll() {
    setVisible(Object.fromEntries(MAP_ITEMS.map((item) => [item.id, true])));
  }

  function hideAll() {
    setVisible(Object.fromEntries(MAP_ITEMS.map((item) => [item.id, false])));
    setSelectedId(null);
  }

  return (
    <div className="wosb-map-page">
      <header className="wosb-map-header">
        <div className="wosb-map-eyebrow">⚓ World of Sea Battle</div>
        <h1 className="wosb-map-title">Interactive Map</h1>
        <p className="wosb-map-subtitle">
          Toggle points of interest on the sea chart and click any marker to inspect it.
        </p>
      </header>

      <div className="wosb-map-layout">
        <section className="wosb-map-stage-card">
          <div className="wosb-map-stage-head">
            <div>
              <div className="wosb-map-section-label">Sea Chart</div>
              <div className="wosb-map-section-sub">19 map items placed on the world map</div>
            </div>

            <div className="wosb-map-actions">
              <button type="button" className="wosb-map-action-btn" onClick={showAll}>
                Show All
              </button>
              <button type="button" className="wosb-map-action-btn" onClick={hideAll}>
                Hide All
              </button>
            </div>
          </div>

          <div className="wosb-map-stage">
            <Image
              src="/images/wosb-map.png"
              alt="World of Sea Battle map"
              fill
              priority
              className="wosb-map-image"
              sizes="(max-width: 1100px) 100vw, 70vw"
            />

            {MAP_ITEMS.map((item) =>
              visible[item.id] ? (
                <button
                  key={item.id}
                  type="button"
                  className={`wosb-map-marker ${
                    selectedId === item.id ? "wosb-map-marker-active" : ""
                  }`}
                  style={{ left: `${item.x}%`, top: `${item.y}%` }}
                  onClick={() => setSelectedId(item.id)}
                  title={item.name}
                >
                  <span>{item.icon}</span>
                </button>
              ) : null
            )}
          </div>
        </section>

        <aside className="wosb-map-sidebar">
          <section className="wosb-map-panel">
            <div className="wosb-map-panel-title">Map Items</div>
            <div className="wosb-map-item-list">
              {MAP_ITEMS.map((item) => {
                const isOn = visible[item.id];
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`wosb-map-item-row ${selectedId === item.id ? "wosb-map-item-row-active" : ""}`}
                    onClick={() => {
                      if (!isOn) {
                        setVisible((prev) => ({ ...prev, [item.id]: true }));
                      }
                      setSelectedId(item.id);
                    }}
                  >
                    <span className="wosb-map-item-icon">{item.icon}</span>
                    <span className="wosb-map-item-name">{item.name}</span>

                    <span
                      className={`wosb-map-toggle ${isOn ? "wosb-map-toggle-on" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleItem(item.id);
                      }}
                    >
                      {isOn ? "ON" : "OFF"}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="wosb-map-panel">
            <div className="wosb-map-panel-title">Selected Item</div>

            {selectedItem ? (
              <div className="wosb-map-detail">
                <div className="wosb-map-detail-top">
                  <span className="wosb-map-detail-icon">{selectedItem.icon}</span>
                  <div>
                    <div className="wosb-map-detail-name">{selectedItem.name}</div>
                    <div className="wosb-map-detail-type">
                      {TYPE_LABELS[selectedItem.type]}
                    </div>
                  </div>
                </div>

                <p className="wosb-map-detail-desc">{selectedItem.description}</p>

                <div className="wosb-map-detail-coords">
                  Grid Position: {selectedItem.x.toFixed(1)}% / {selectedItem.y.toFixed(1)}%
                </div>
              </div>
            ) : (
              <div className="wosb-map-empty">
                Click a visible marker or choose an item from the list.
              </div>
            )}
          </section>
        </aside>
      </div>
    </div>
  );
}
