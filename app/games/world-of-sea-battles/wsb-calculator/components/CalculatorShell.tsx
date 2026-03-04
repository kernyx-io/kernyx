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
    <div className="wsb-calc">
      <header className="wsb-header">
        <div className="wsb-header-anchor">
          <span className="wsb-anchor-icon">⚓</span>
          <h1>Cannon DPS Calculator</h1>
          <span className="wsb-anchor-icon">⚓</span>
        </div>
        <p className="wsb-subtitle">World of Sea Battle — Artillery Damage Estimator</p>
        <div className="wsb-rope-divider" />
      </header>

      <div className="wsb-grid">
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

        <BroadsideConfig />
        <AmmoPanel ammoTypes={AMMO_TYPES} />
        <AttachmentsPanel />
        <CrewPanel />
        <SupportPanel />
        <ShipStats />
        <DamageReport report={report} />
      </div>

      <footer className="wsb-footer">
        World of Sea Battle — Unofficial Calculator · Data saved locally · Results may vary with game updates
      </footer>
    </div>
  );
}
