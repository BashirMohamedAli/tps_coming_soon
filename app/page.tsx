import ComingSoon from "../components/ComingSoon"
import { getTargetDate, getRemainingTime } from "../utils/dateUtils"

export default function Home() {
  const targetDate = getTargetDate()
  const initialTimeLeft = getRemainingTime(targetDate)

  return <ComingSoon targetDate={targetDate.toISOString()} initialTimeLeft={initialTimeLeft} />
}

