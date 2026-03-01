import { ships } from "../lib/data"
import styles from "../calculator.module.css"

export default function VesselSelection({ state, dispatch }: any) {
  return (
    <section className={styles.section}>
      <h2>Vessel Selection</h2>

      <select
        value={state.ship.id}
        onChange={(e) =>
          dispatch({
            type: "SET_SHIP",
            payload: ships.find(s => s.id === e.target.value),
          })
        }
      >
        {ships.map((ship) => (
          <option key={ship.id} value={ship.id}>
            {ship.name}
          </option>
        ))}
      </select>
    </section>
  )
}
