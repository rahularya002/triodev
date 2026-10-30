export type AnalyticsRange = "7d" | "30d" | "90d"

export const RANGE_DAYS: Record<AnalyticsRange, number> = {
  "7d": 7,
  "30d": 30,
  "90d": 90,
}

export interface AnalyticsOverview {
  views: number
  visitors: number
  views_per_visitor: number
  prev_views: number
  prev_visitors: number
  top_country: string | null
}

export interface TimeseriesPoint {
  day: string
  views: number
  visitors: number
}

export interface BreakdownRow {
  label: string
  views: number
  visitors: number
}

export type BreakdownDimension =
  | "path"
  | "referrer_domain"
  | "country"
  | "device"
  | "browser"
  | "os"
