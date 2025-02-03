export function getTargetDate(): Date {
  const now = new Date();
  const targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 10);
  targetDate.setHours(0, 0, 0, 0);
  return targetDate;
}

export function getRemainingTime(targetDate: Date): {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  total: number;
} {
  const now = new Date();
  const total = Math.max(0, targetDate.getTime() - now.getTime());

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    days: days.toString().padStart(2, '0'),
    hours: hours.toString().padStart(2, '0'),
    minutes: minutes.toString().padStart(2, '0'),
    seconds: seconds.toString().padStart(2, '0'),
    total,
  };
}
