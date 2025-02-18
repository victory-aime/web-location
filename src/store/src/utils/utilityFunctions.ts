import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/fr"; // Import French locale if needed
dayjs.extend(customParseFormat); // Extend Dayjs with the custom parse format plugin
dayjs.locale("fr"); // Set the default locale to French

export const APP_DATE_FORMAT = "DD/MM/YYYY"; // Application date format
export const APP_DATE_PATTERN = "YYYY-MM-DD"; // Default date pattern
export const COMMON_FORMAT_DATE = "dd/MM/yyyy"; // Common date format
export const AMOUNT_DEFAULT_CURRENCY = "FCFA"; // Default currency (FCFA)

/**
 * Converts a date in a standard format (e.g., 'YYYY-MM-DD') to the application's specific format.
 * @param date - The date to convert
 * @returns Formatted date according to the application format
 */
export const convertDateFormat = (date: string | Date): string => {
  return dayjs(date).isValid() ? dayjs(date).format(APP_DATE_FORMAT) : "";
};

/**
 * Calculates the period in months based on the contract type.
 * @param nbePeriod - Number of periods
 * @param period - Period type ('T' = quarterly, 'S' = semiannual, 'A' = annual)
 * @returns The number of months corresponding to the period
 */
export const getPeriodInMonths = (
  nbePeriod: number,
  period: "QUARTERLY" | "SEMIANNUAL" | "ANNUAL" | string
): number => {
  switch (period) {
    case "QUARTERLY":
      return nbePeriod * 3;
    case "SEMIANNUAL":
      return nbePeriod * 6;
    case "ANNUAL":
      return nbePeriod * 12;
    default:
      return nbePeriod;
  }
};

/**
 * Formats the date for the audit table
 * @param date - The date to format
 * @returns The formatted date for the audit table
 */
export const formatDateFormAuditTable = (date: string): string => {
  if (!date) {
    return "";
  }
  const dateFormat = new Date(date);
  return dateFormat.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/**
 * Returns the time value of a date in 'HH:mm' format.
 * @param date - The date to extract the time from
 * @returns The time in 'HH:mm' format
 */
export const getTimeValue = (date: string): string => {
  if (!date) {
    return "";
  }
  const dateFormat = new Date(date);
  return dateFormat?.toLocaleTimeString("fr-FR", {
    hour: "numeric",
    minute: "numeric",
  });
};

/**
 * Finds an object by id in a list.
 * @param id - The id to search for
 * @param list - The list to search in
 * @returns The found object or null if not found
 */
export const findDynamicIdInList = (id: string | undefined, list: any) => {
  if (!list?.content?.length || !id) {
    return null;
  }
  const findItem = list?.content?.find(
    (item: { id: string }) => item.id === id
  );
  return findItem || null;
};

/**
 * A generic function to parse a date from a string.
 * @param date - The date string to parse (e.g., '22/11/2024')
 * @param inputFormat - The expected input format (default is 'DD/MM/YYYY')
 * @returns A Date object or null if the date is invalid
 */
export const parseDateString = (
  date: Date | string | null | undefined,
  inputFormat: string = APP_DATE_FORMAT
) => {
  if (!date) return null;
  const dateString =
    date instanceof Date ? dayjs(date).format(inputFormat) : date;
  const parsedDate = dayjs(dateString, inputFormat, true);
  return parsedDate.isValid() ? parsedDate.toDate() : null;
};

/**
 * Retrieves the month from a date string.
 * @param dateString - The date string (e.g., '22/11/2024')
 * @param inputFormat - The expected input format (default is 'DD/MM/YYYY')
 * @param locale - Locale for the month (default is 'fr')
 * @returns The full month name (e.g., 'november') or null if the date is invalid
 */
export const getMonthFromDateString = (
  dateString: string,
  inputFormat: string = APP_DATE_FORMAT,
  locale: string = "fr"
): string | null => {
  try {
    if (!dateString) {
      return null;
    }
    const parsedDate = dayjs(dateString, inputFormat);
    if (!parsedDate.isValid()) {
      return null;
    }
    return parsedDate.locale(locale).format("MMMM");
  } catch (e) {
    console.error("Error parsing date:", e);
    return null;
  }
};

/**
 * Function to format data to get createdInfo and updatedInfo
 * @param data - The array of items to be formatted
 * @returns A new array with formatted items
 */
export const convertToCreatedUpdatedInfo = <
  T extends {
    createdBy?: string;
    createdAt?: string;
    updatedBy?: string;
    updatedAt?: string;
  },
>(
  data: T[]
): Array<
  T & {
    createdInfo: { createdBy?: string; createdAt?: string };
    updatedInfo: { updatedBy?: string; updatedAt?: string };
  }
> => {
  return data?.map((item) => ({
    ...item,
    createdInfo: {
      createdBy: item.createdBy,
      createdAt: item.createdAt,
    },
    updatedInfo: {
      updatedBy: item.updatedBy,
      updatedAt: item.updatedAt,
    },
  }));
};
