/**
 * Pull requests opened per day (UTC), from GitHub: author:pwmikolajek, type:pr.
 * Counts only: no repo names or titles. Refresh with:
 *   gh api -X GET search/issues -f q='author:pwmikolajek type:pr created:>=YYYY-MM-DD' \
 *     -f per_page=100 --jq '.items[].created_at'
 * and tally by date, then bump ACTIVITY_END.
 */

export const ACTIVITY_END = "2026-10-09";
const WEEKS = 53;

const COUNTS: Record<string, number> = {
  "2025-10-30": 1,
  "2025-11-08": 2,
  "2026-02-27": 1,
  "2026-04-22": 1,
  "2026-05-06": 1,
  "2026-05-07": 3,
  "2026-05-08": 3,
  "2026-05-15": 1,
  "2026-05-16": 6,
  "2026-05-18": 1,
  "2026-05-19": 2,
  "2026-05-26": 1,
  "2026-05-27": 8,
  "2026-05-28": 2,
  "2026-05-29": 3,
  "2026-06-01": 5,
  "2026-06-02": 3,
  "2026-06-03": 1,
  "2026-06-09": 2,
  "2026-06-11": 15,
  "2026-06-12": 5,
  "2026-06-13": 4,
  "2026-06-15": 1,
  "2026-06-16": 4,
  "2026-08-05": 1,
  "2026-09-10": 1,
  "2026-09-15": 3,
  "2026-09-17": 3,
  "2026-09-21": 4,
  "2026-09-22": 2,
  "2026-09-23": 7,
  "2026-09-24": 2,
  "2026-09-25": 5,
  "2026-09-28": 18,
  "2026-09-29": 8,
  "2026-09-30": 7,
  "2026-10-01": 2,
  "2026-10-05": 2,
  "2026-10-06": 7,
  "2026-10-07": 2,
  "2026-10-08": 2,
  "2026-10-09": 8,
};

export type ActivityDay = { date: string; count: number } | null;

/** Columns are weeks (Sunday first); rows are days. Future days are null. */
export function buildActivity(): { weeks: ActivityDay[][]; total: number } {
  const end = new Date(`${ACTIVITY_END}T00:00:00Z`);
  const start = new Date(end);
  start.setUTCDate(end.getUTCDate() - ((WEEKS - 1) * 7 + end.getUTCDay()));

  let total = 0;
  const weeks: ActivityDay[][] = [];
  for (let w = 0; w < WEEKS; w++) {
    const days: ActivityDay[] = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(start);
      date.setUTCDate(start.getUTCDate() + w * 7 + d);
      if (date > end) {
        days.push(null);
        continue;
      }
      const iso = date.toISOString().slice(0, 10);
      const count = COUNTS[iso] ?? 0;
      total += count;
      days.push({ date: iso, count });
    }
    weeks.push(days);
  }
  return { weeks, total };
}

export function levelFor(count: number) {
  if (count === 0) return 0;
  if (count === 1) return 1;
  if (count <= 3) return 2;
  if (count <= 5) return 3;
  return 4;
}
