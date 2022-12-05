export default function currentWeek() {
  return Math.floor((Date.now() + 345_600_000) / 604_800_000);
}
