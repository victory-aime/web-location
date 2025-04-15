import 'dayjs/locale/fr'
export declare const APP_DATE_FORMAT = 'DD/MM/YYYY'
export declare const APP_DATE_PATTERN = 'DD MMM YYYY'
export declare const COMMON_FORMAT_DATE = 'dd/MM/yyyy'
export declare const AMOUNT_DEFAULT_CURRENCY = '$'
/**
 * Converts a date in a standard format (e.g., 'YYYY-MM-DD') to the application's specific format.
 * @param date - The date to convert
 * @param inputFormat
 * @returns Formatted date according to the application format
 */
export declare const convertDateFormat: (date: string | Date, inputFormat?: string) => string
/**
 * Calculates the period in months based on the contract type.
 * @param nbePeriod - Number of periods
 * @param period - Period type ('T' = quarterly, 'S' = semiannual, 'A' = annual)
 * @returns The number of months corresponding to the period
 */
export declare const getPeriodInMonths: (nbePeriod: number, period: 'QUARTERLY' | 'SEMIANNUAL' | 'ANNUAL' | string) => number
/**
 * Formats the date for the audit table
 * @param date - The date to format
 * @returns The formatted date for the audit table
 */
export declare const formatDateFormAuditTable: (date: string) => string
/**
 * Returns the time value of a date in 'HH:mm' format.
 * @param date - The date to extract the time from
 * @returns The time in 'HH:mm' format
 */
export declare const getTimeValue: (date: string) => string
/**
 * Formats the createdAt date to a human-readable string.
 * @param createdAt - The createdAt date string
 * @returns The formatted date string
 */
export declare const formatCreatedAt: (createdAt: string) => string
/**
 * Finds an object by id in a list.
 * @param id - The id to search for
 * @param list - The list to search in
 * @returns The found object or null if not found
 */
export declare const findDynamicIdInList: (id: string | undefined, list: any) => any
/**
 * A generic function to parse a date from a string.
 * @param date - The date string to parse (e.g., '22/11/2024')
 * @param inputFormat - The expected input format (default is 'DD/MM/YYYY')
 * @returns A Date object or null if the date is invalid
 */
export declare const parseDateString: (date: Date | string | null | undefined, inputFormat?: string) => Date | null
/**
 * Parse and format a date string into a readable format like '12 Dec 2025'.
 * @param date - A date string, Date object, or null
 * @param inputFormat - Expected input format if not ISO (default 'DD/MM/YYYY')
 * @returns A formatted string or null if invalid
 */
export declare const formatDisplayDate: (date: Date | string | null | undefined, inputFormat?: string) => string | null
/**
 * Retrieves the month from a date string.
 * @param dateString - The date string (e.g., '22/11/2024')
 * @param inputFormat - The expected input format (default is 'DD/MM/YYYY')
 * @param locale - Locale for the month (default is 'fr')
 * @returns The full month name (e.g., 'november') or null if the date is invalid
 */
export declare const getMonthFromDateString: (dateString: string, inputFormat?: string, locale?: string) => string | null
/**
 * Function to format data to get createdInfo and updatedInfo
 * @param data - The array of items to be formatted
 * @returns A new array with formatted items
 */
export declare const convertToCreatedUpdatedInfo: <
  T extends {
    createdBy?: string
    createdAt?: string
    updatedBy?: string
    updatedAt?: string
  },
>(
  data: T[]
) => Array<
  T & {
    createdInfo: {
      createdBy?: string
      createdAt?: string
    }
    updatedInfo: {
      updatedBy?: string
      updatedAt?: string
    }
  }
>
/**
 * Function to compress images files
 */
export declare const compressImagesFiles: (file: File) => Promise<File>
/**
 * Convert image files into base64
 */
export declare const fileToBase64: (file: File) => Promise<string>
/**
 * Convert base64 filte to File
 */
export declare const base64ToFile: (base64: string, filename: string) => File
//# sourceMappingURL=utilityFunctions.d.ts.map
