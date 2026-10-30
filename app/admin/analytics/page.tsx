import { AnalyticsContent } from "@/components/workspace/analytics/analytics-content"
import {
  getAnalyticsBreakdown,
  getAnalyticsOverview,
  getAnalyticsTimeseries,
} from "@/lib/analytics/queries"
import type { AnalyticsRange } from "@/lib/analytics/types"

export const dynamic = "force-dynamic"

const VALID_RANGES: AnalyticsRange[] = ["7d", "30d", "90d"]

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>
}) {
  const params = await searchParams
  const range: AnalyticsRange = VALID_RANGES.includes(params.range as AnalyticsRange)
    ? (params.range as AnalyticsRange)
    : "30d"

  const [overview, timeseries, pages, referrers, countries, devices, browsers] =
    await Promise.all([
      getAnalyticsOverview(range),
      getAnalyticsTimeseries(range),
      getAnalyticsBreakdown(range, "path"),
      getAnalyticsBreakdown(range, "referrer_domain"),
      getAnalyticsBreakdown(range, "country"),
      getAnalyticsBreakdown(range, "device"),
      getAnalyticsBreakdown(range, "browser"),
    ])

  return (
    <AnalyticsContent
      range={range}
      overview={overview}
      timeseries={timeseries}
      pages={pages}
      referrers={referrers}
      countries={countries}
      devices={devices}
      browsers={browsers}
    />
  )
}
