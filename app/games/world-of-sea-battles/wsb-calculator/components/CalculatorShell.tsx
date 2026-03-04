"use client";

import { useEffect, useState } from "react";
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

  if (!mounted) return null;

  return (
    <div className="calc-page">
      <header className="calc-header">
        <div className="calc-eyebrow">⚓ World of Sea Battle</div>
        <h1 className="calc-title">Cannon DPS Calculator</h1>
        <p className="calc-subtitle">
          Build your ship loadout step by step, then see how your base stats turn
          into real broadside damage.
        </p>
      </header>

      <section className="calc-step-card">
        <div className="calc-step-head">
          <span className="calc-step-number">1</span>
          <div>
            <div className="calc-step-label">Ship Setup</div>
            <h2 className="calc-step-title">Choose your ship and target</h2>
          </div>
        </div>

        <div className="calc-two-col">
          <div className="calc-panel-inner">
            <ShipSelector
              label="Choose Your Ship"
              icon="🚢"
              title="Vessel Selection"
              caption="Pick your ship first. This sets your battery layout and base stat profile."
              value={store.shipId}
              onChange={store.setShip}
              ships={SHIPS}
              variant="player"
            />
          </div>

          <div className="calc-panel-inner">
            <ShipSelector
              label="Enemy Vessel"
              icon="🎯"
              title="Target Ship"
              caption="Optional, but useful for comparing your shots against target durability and armor."
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
        </div>
      </section>

      <section className="calc-step-card">
        <div className="calc-step-head">
          <span className="calc-step-number">2</span>
          <div>
            <div className="calc-step-label">Loadout</div>
            <h2 className="calc-step-title">Choose ammo and configure cannons</h2>
          </div>
        </div>

        <div className="calc-two-col calc-top-align">
          <div className="calc-panel-inner">
            <AmmoPanel ammoTypes={AMMO_TYPES} />
          </div>

          <div className="calc-panel-inner">
            <BroadsideConfig />
          </div>
        </div>
      </section>

      <section className="calc-step-card">
        <div className="calc-step-head">
          <span className="calc-step-number">3</span>
          <div>
            <div className="calc-step-label">Upgrades</div>
            <h2 className="calc-step-title">Fit the ship with bonuses</h2>
          </div>
        </div>

        <div className="calc-three-col">
          <div className="calc-panel-inner">
            <AttachmentsPanel />
          </div>

          <div className="calc-panel-inner">
            <CrewPanel />
          </div>

          <div className="calc-panel-inner">
            <SupportPanel />
          </div>
        </div>
      </section>

      <section className="calc-step-card">
        <div className="calc-step-head">
          <span className="calc-step-number">4</span>
          <div>
            <div className="calc-step-label">Results</div>
            <h2 className="calc-step-title">See what your final build becomes</h2>
          </div>
        </div>

        <div className="calc-two-col calc-top-align">
          <div className="calc-panel-inner">
            <ShipStats />
          </div>

          <div className="calc-panel-inner calc-results-panel">
            <DamageReport report={report} />
          </div>
        </div>
      </section>

      <footer className="calc-footer">
        Unofficial calculator · values update live as you change your build
      </footer>
    </div>
  );
}
