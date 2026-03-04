"use client";

import { useEffect, useMemo, useState } from "react";
import { useWsbStore } from "@/lib/wsb/store";
import { calculateDamage } from "@/lib/wsb/calculator";
import { SHIPS } from "@/lib/wsb/ships";
import { AMMO_TYPES } from "@/lib/wsb/ammo";
import ShipSelector from "./ShipSelector";
import BroadsideConfig from "./BroadsideConfig";
import AmmoPanel from "./AmmoPanel";
import AttachmentsPanel from "./AttachmentsPanel";
import CrewPanel from "./CrewPanel";
import SupportPanel from "./SupportPanel";
import ShipStats from "./ShipStats";
import DamageReport from "./DamageReport";
import type { DamageReport as DamageReportType } from "@/lib/wsb/types";

export default function CalculatorShell() {
  const store = useWsbStore();
  const [report, setReport] = useState<DamageReportType | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const result = calculateDamage({
      shipId: store.shipId,
      targetShipId: store.targetShipId,
      ammoId: store.ammoId,
      cannonSlots: store.cannonSlots,
      attachmentIds: store.attachmentIds,
      crewIds: store.crewIds,
      supportIds: store.supportIds,
    });

    setReport(result);
  }, [
    mounted,
    store.shipId,
    store.targetShipId,
    store.ammoId,
    store.cannonSlots,
    store.attachmentIds,
    store.crewIds,
    store.supportIds,
  ]);

  const selectedShip = useMemo(
    () => SHIPS.find((ship) => ship.id === store.shipId),
    [store.shipId]
  );

  const targetShip = useMemo(
    () => SHIPS.find((ship) => ship.id === store.targetShipId),
    [store.targetShipId]
  );

  const selectedAmmo = useMemo(
    () => AMMO_TYPES.find((ammo) => ammo.id === store.ammoId),
    [store.ammoId]
  );

  if (!mounted) return null;

  return (
    <div className="calc-page">
      <header className="calc-hero">
        <div className="calc-hero-copy">
          <div className="calc-eyebrow">⚓ WORLD OF SEA BATTLE</div>
          <h1 className="calc-title">Cannon DPS Calculator</h1>
          <p className="calc-subtitle">
            Configure your ship, battery, ammo, crew, and support loadout to
            estimate broadside damage, DPS, and combat efficiency.
          </p>
        </div>

        <div className="calc-hero-badge" aria-hidden>
          💥
        </div>
      </header>

      <section className="calc-overview">
        <div className="calc-overview-card">
          <div className="calc-overview-label">Selected Ship</div>
          <div className="calc-overview-value">
            {selectedShip?.name ?? "No ship selected"}
          </div>
          <div className="calc-overview-meta">
            {selectedShip
              ? `${selectedShip.slots} slots · ${selectedShip.crew} crew`
              : "Choose your flagship"}
          </div>
        </div>

        <div className="calc-overview-card">
          <div className="calc-overview-label">Target</div>
          <div className="calc-overview-value">
            {targetShip?.name ?? "No target selected"}
          </div>
          <div className="calc-overview-meta">
            {targetShip
              ? `${targetShip.durability} durability · ${targetShip.broadsideArmor} armor`
              : "Optional target comparison"}
          </div>
        </div>

        <div className="calc-overview-card">
          <div className="calc-overview-label">Ammo</div>
          <div className="calc-overview-value">
            {selectedAmmo?.name ?? "No ammo selected"}
          </div>
          <div className="calc-overview-meta">
            Fine-tune your salvo profile
          </div>
        </div>

        <div className="calc-overview-card">
          <div className="calc-overview-label">Live Output</div>
          <div className="calc-overview-value">
            {report ? "Ready" : "Waiting"}
          </div>
          <div className="calc-overview-meta">
            Results update as you change loadout
          </div>
        </div>
      </section>

      <div className="calc-grid">
        <section className="calc-panel calc-span-2">
          <div className="calc-panel-head">
            <div>
              <div className="calc-panel-label">Ship Setup</div>
              <h2 className="calc-panel-title">Select your vessels</h2>
            </div>
          </div>

          <div className="calc-panel-body calc-two-up">
            <ShipSelector
              label="Choose Your Ship"
              icon="🚢"
              title="Vessel Selection"
              caption="Select your flagship to auto-build a valid battery layout and preview its command profile."
              value={store.shipId}
              onChange={store.setShip}
              ships={SHIPS}
              variant="player"
            />

            <ShipSelector
              label="Enemy Vessel"
              icon="🎯"
              title="Target Ship"
              caption="Choose a target to compare hull strength and see how much broadside armour your shots will lose per hit."
              value={store.targetShipId}
              onChange={store.setTargetShip}
              ships={[
                {
                  id: "none",
                  name: "— No Target —",
                  shipType: "Balanced",
                  rate: 1,
                  slots: 0,
                  durability: 0,
                  speed: 0,
                  maneuverability: 0,
                  broadsideArmor: 0,
                  hold: 0,
                  crew: 0,
                  hullDims: "—",
                  displacement: "—",
                  heavyWeapons: "—",
                  swivelGuns: 0,
                  integrity: null,
                  info: "",
                },
                ...SHIPS,
              ]}
              variant="target"
            />
          </div>
        </section>

        <section className="calc-panel">
          <div className="calc-panel-head">
            <div>
              <div className="calc-panel-label">Battery</div>
              <h2 className="calc-panel-title">Broadside config</h2>
            </div>
          </div>
          <div className="calc-panel-body">
            <BroadsideConfig />
          </div>
        </section>

        <section className="calc-panel">
          <div className="calc-panel-head">
            <div>
              <div className="calc-panel-label">Ammo</div>
              <h2 className="calc-panel-title">Shot selection</h2>
            </div>
          </div>
          <div className="calc-panel-body">
            <AmmoPanel ammoTypes={AMMO_TYPES} />
          </div>
        </section>

        <section className="calc-panel">
          <div className="calc-panel-head">
            <div>
              <div className="calc-panel-label">Attachments</div>
              <h2 className="calc-panel-title">Ship modifiers</h2>
            </div>
          </div>
          <div className="calc-panel-body">
            <AttachmentsPanel />
          </div>
        </section>

        <section className="calc-panel">
          <div className="calc-panel-head">
            <div>
              <div className="calc-panel-label">Crew</div>
              <h2 className="calc-panel-title">Crew bonuses</h2>
            </div>
          </div>
          <div className="calc-panel-body">
            <CrewPanel />
          </div>
        </section>

        <section className="calc-panel">
          <div className="calc-panel-head">
            <div>
              <div className="calc-panel-label">Support</div>
              <h2 className="calc-panel-title">Support effects</h2>
            </div>
          </div>
          <div className="calc-panel-body">
            <SupportPanel />
          </div>
        </section>

        <section className="calc-panel">
          <div className="calc-panel-head">
            <div>
              <div className="calc-panel-label">Ship Data</div>
              <h2 className="calc-panel-title">Current stats</h2>
            </div>
          </div>
          <div className="calc-panel-body">
            <ShipStats />
          </div>
        </section>

        <section className="calc-panel calc-span-3">
          <div className="calc-panel-head">
            <div>
              <div className="calc-panel-label">Results</div>
              <h2 className="calc-panel-title">Damage report</h2>
            </div>
          </div>
          <div className="calc-panel-body">
            <DamageReport report={report} />
          </div>
        </section>
      </div>

      <footer className="calc-footer">
        World of Sea Battle — Unofficial Calculator · Data saved locally ·
        Results may vary with game updates
      </footer>
    </div>
  );
}
