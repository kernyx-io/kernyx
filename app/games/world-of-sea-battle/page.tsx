import styles from "./page.module.css";
import WoSBClient from "./WoSBClient";

export const metadata = {
  title: "World of Sea Battle | Kernyx",
  description:
    "Cannon DPS calculators, ship build guides, and naval strategy for World of Sea Battle.",
};

export default function Page() {
  return <WoSBClient />;
}
