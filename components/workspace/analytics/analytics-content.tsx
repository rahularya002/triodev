import { BarChart3, Eye, Globe, MousePointerClick, Users } from "lucide-react"
import { Card } from "@/components/ui/card"
import { PageHeader, MetricCard, EmptyState } from "@/components/workspace/shared"
import { RangeTabs } from "./range-tabs"
import { VisitorsChart } from "./visitors-chart"
import { BreakdownList } from "./breakdown-list"
import type {
  AnalyticsOverview,
  AnalyticsRange,
  BreakdownRow,
  TimeseriesPoint,
} from "@/lib/analytics/types"

const COUNTRY_NAMES = new Intl.DisplayNames(["en"], { type: "region" })

function countryLabel(code: string): string {
  if (!code || code === "unknown") return "Unknown"
  try {
    return COUNTRY_NAMES.of(code.toUpperCase()) ?? code
  } catch {
    return code
  }
}

function deltaTrend(current: number, previous: number): { trend: string; trendColor: string } {
  if (previous === 0) {
    return current > 0
      ? { trend: "New this period", trendColor: "text-primary" }
      : { trend: "No previous data", trendColor: "text-muted" }
  }
  const pct = Math.round(((current - previous) / previous) * 100)
  if (pct >= 0) return { trend: `+${pct}% vs prev period`, trendColor: "text-primary" }
  return { trend: `${pct}% vs prev period`, trendColor: "text-red-500" }
}

interface AnalyticsContentProps {
  range: AnalyticsRange
  overview: AnalyticsOverview | null
  timeseries: TimeseriesPoint[]
  pages: BreakdownRow[]
  referrers: BreakdownRow[]
  countries: BreakdownRow[]
  devices: BreakdownRow[]
  browsers: BreakdownRow[]
}

export function AnalyticsContent({
  range,
  overview,
  timeseries,
  pages,
  referrers,
  countries,
  devices,
  browsers,
}: AnalyticsContentProps) {
  const hasData = (overview?.views ?? 0) > 0

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Insights"
        title="Analytics"
        description="First-party traffic insights for the public website — visitors, page views, referrers, and audience breakdowns."
        actions={<RangeTabs active={range} />}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <MetricCard
          label="Visitors"
          value={(overview?.visitors ?? 0).toLocaleString()}
          icon={Users}
          {...deltaTrend(overview?.visitors ?? 0, overview?.prev_visitors ?? 0)}
        />
        <MetricCard
          label="Page Views"
          value={(overview?.views ?? 0).toLocaleString()}
          icon={Eye}
          {...deltaTrend(overview?.views ?? 0, overview?.prev_views ?? 0)}
        />
        <MetricCard
          label="Views / Visitor"
          value={String(overview?.views_per_visitor ?? 0)}
          icon={MousePointerClick}
        />
        <MetricCard
          label="Top Country"
          value={overview?.top_country ? countryLabel(overview.top_country) : "—"}
          icon={Globe}
        />
      </div>

      <Card className="p-6 bg-surface border-primary/16 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold font-mono tracking-[0.2em] text-muted uppercase">
            Views &amp; Visitors
          </h3>
          <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-muted">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-0.5 bg-primary rounded-full" /> Views
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-0.5 bg-primary/50 rounded-full" /> Visitors
            </span>
          </div>
        </div>
        {hasData ? (
          <VisitorsChart data={timeseries} />
        ) : (
          <EmptyState
            icon={BarChart3}
            title="No traffic yet"
            description="Analytics will appear here once the public site starts receiving visits. Data is collected automatically by the tracking beacon."
          />
        )}
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <BreakdownList title="Top Pages" rows={pages} emptyLabel="No page views recorded yet." />
        <BreakdownList
          title="Referrers"
          rows={referrers}
          emptyLabel="No external referrers yet."
          formatLabel={(label) => (label === "unknown" ? "Direct / None" : label)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <BreakdownList
          title="Countries"
          rows={countries}
          emptyLabel="No location data yet."
          formatLabel={countryLabel}
        />
        <BreakdownList
          title="Devices"
          rows={devices}
          emptyLabel="No device data yet."
          formatLabel={(label) => label.charAt(0).toUpperCase() + label.slice(1)}
        />
        <BreakdownList title="Browsers" rows={browsers} emptyLabel="No browser data yet." />
      </div>
    </div>
  )
}
