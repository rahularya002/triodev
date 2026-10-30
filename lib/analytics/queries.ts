import { createSupabaseServerClient } from "@/lib/supabase/server"
import {
  RANGE_DAYS,
  type AnalyticsOverview,
  type AnalyticsRange,
  type BreakdownDimension,
  type BreakdownRow,
  type TimeseriesPoint,
} from "./types"

export async function getAnalyticsOverview(range: AnalyticsRange): Promise<AnalyticsOverview | null> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.rpc("analytics_overview", {
    period_days: RANGE_DAYS[range],
  })
  if (error) {
    console.error("[analytics] overview failed:", error.message)
    return null
  }
  return data as AnalyticsOverview
}

export async function getAnalyticsTimeseries(range: AnalyticsRange): Promise<TimeseriesPoint[]> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.rpc("analytics_timeseries", {
    period_days: RANGE_DAYS[range],
  })
  if (error) {
    console.error("[analytics] timeseries failed:", error.message)
    return []
  }
  return (data ?? []) as TimeseriesPoint[]
}

export async function getAnalyticsBreakdown(
  range: AnalyticsRange,
  dimension: BreakdownDimension
): Promise<BreakdownRow[]> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.rpc("analytics_breakdown", {
    period_days: RANGE_DAYS[range],
    dimension,
  })
  if (error) {
    console.error(`[analytics] breakdown (${dimension}) failed:`, error.message)
    return []
  }
  return (data ?? []) as BreakdownRow[]
}
