type StyleNumberFormat = "decimal" | "percent" | "currency";

interface FormatNumberProps {
  value: number;
  maximumDigits?: number;
  minimumDigits?: number;
  notation?: "compact" | "standard" | "scientific" | "engineering";
  style?: StyleNumberFormat;
  currencyCode?: string;
  isLocale?: boolean;
}

export type { FormatNumberProps };
