import ComingSoon from "../components/ComingSoon"
import { getTargetDate } from "../utils/dateUtils"

export default function Home() {
  const targetDate = getTargetDate()
  return <ComingSoon targetDate={targetDate.toISOString()} />
}

