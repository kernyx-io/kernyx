export default function DamageReport({ results }: any) {
  return (
    <section>
      <h2>Damage Output Report</h2>
      <p>Adjusted Damage: {results.adjustedDamage}</p>
      <p>Adjusted Reload: {results.adjustedReload}s</p>
      <p>Volley Damage: {results.volleyDamage}</p>
      <p>DPS: {results.dps}</p>
    </section>
  )
}
