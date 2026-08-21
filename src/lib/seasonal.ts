const AUGUST_2026_START = new Date("2026-08-01T00:00:00+02:00").getTime();
const SEPTEMBER_2026_START = new Date("2026-09-01T00:00:00+02:00").getTime();

export function isAugust2026(date = new Date()) {
  const timestamp = date.getTime();
  return timestamp >= AUGUST_2026_START && timestamp < SEPTEMBER_2026_START;
}
