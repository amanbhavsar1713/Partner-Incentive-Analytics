export function money(n: number, compact = false): string {
  if (!isFinite(n)) return "—";
  if (compact) {
    const abs = Math.abs(n);
    if (abs >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
    if (abs >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  }
  return `$${Math.round(n).toLocaleString()}`;
}

export function pct(n: number, digits = 0): string {
  if (!isFinite(n)) return "—";
  return `${n.toFixed(digits)}%`;
}

export function count(n: number): string {
  return Math.round(n).toLocaleString();
}

export function monthLabel(ym: string): string {
  // "2026-01" -> "Jan 2026"
  const [y, m] = ym.split("-").map(Number);
  const names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${names[(m ?? 1) - 1]} ${y}`;
}
