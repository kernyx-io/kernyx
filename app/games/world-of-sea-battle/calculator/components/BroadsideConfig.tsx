import { CalculatorState } from "../lib/types"

type Props = {
  state: CalculatorState
  dispatch: React.Dispatch<any>
}

export default function BroadsideConfig({ state, dispatch }: Props) {
