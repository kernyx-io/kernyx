import type { Metadata } from 'next'
import CalculatorShell from './components/CalculatorShell'

export const metadata: Metadata = {
  title: 'Cannon DPS Calculator — World of Sea Battle',
  description: 'Artillery damage estimator for World of Sea Battle. Configure ships, cannons, crew, ammo and get live broadside DPS output.',
}

export default function WsbCalculatorPage() {
  return <CalculatorShell />
}
