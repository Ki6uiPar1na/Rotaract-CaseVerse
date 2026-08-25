import { useState, useEffect, useCallback } from "react";
import { getTimeRemaining } from "@/lib/utils";

export function useCountdown(targetDate: string) {
  const calculate = useCallback(() => getTimeRemaining(targetDate), [targetDate]);
  const [time, setTime] = useState(calculate);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculate());
    }, 1000);
    return () => clearInterval(interval);
  }, [calculate]);

  return time;
}
