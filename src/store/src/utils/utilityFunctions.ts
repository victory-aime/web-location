import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/fr'; // Import French locale if needed
import imageCompression from 'browser-image-compression';
import { isEmpty } from 'lodash';
dayjs.extend(customParseFormat); // Extend Dayjs with the custom parse format plugin
dayjs.locale('fr'); // Set the default locale to French

export const APP_DATE_FORMAT = 'DD/MM/YYYY'; // Application date format
export const APP_DATE_PATTERN = 'YYYY-MM-DD'; // Default date pattern
export const COMMON_FORMAT_DATE = 'dd/MM/yyyy'; // Common date format
export const AMOUNT_DEFAULT_CURRENCY = 'FCFA'; // Default currency (FCFA)

/**
 * Converts a date in a standard format (e.g., 'YYYY-MM-DD') to the application's specific format.
 * @param date - The date to convert
 * @returns Formatted date according to the application format
 */
export const convertDateFormat = (date: string | Date): string => {
  return dayjs(date).isValid() ? dayjs(date).format(APP_DATE_FORMAT) : '';
};

/**
 * Calculates the period in months based on the contract type.
 * @param nbePeriod - Number of periods
 * @param period - Period type ('T' = quarterly, 'S' = semiannual, 'A' = annual)
 * @returns The number of months corresponding to the period
 */
export const getPeriodInMonths = (
  nbePeriod: number,
  period: 'QUARTERLY' | 'SEMIANNUAL' | 'ANNUAL' | string
): number => {
  switch (period) {
    case 'QUARTERLY':
      return nbePeriod * 3;
    case 'SEMIANNUAL':
      return nbePeriod * 6;
    case 'ANNUAL':
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
  if (!date || !dayjs(date).isValid()) return '';
  return dayjs(date).format('DD MMM YYYY');
};

/**
 * Returns the time value of a date in 'HH:mm' format.
 * @param date - The date to extract the time from
 * @returns The time in 'HH:mm' format
 */
export const getTimeValue = (date: string): string => {
  if (!date || !dayjs(date).isValid()) return '';
  return dayjs(date).format('HH:mm');
};

/**
 * Calculates the difference in days between two dates.
 * @param now - The current date
 * @param date - The date to compare
 * @returns The difference in days
 */
function differenceInDays(now: Date, date: Date): number {
  return dayjs(now).diff(dayjs(date), 'day');
}

/**
 * Formats the createdAt date to a human-readable string.
 * @param createdAt - The createdAt date string
 * @returns The formatted date string
 */
export const formatCreatedAt = (createdAt: string): string => {
  if (!createdAt || !dayjs(createdAt).isValid()) return '';

  const date = dayjs(createdAt);
  const now = dayjs();
  const diffDays = now.diff(date, 'day');

  if (diffDays === 0) return `Auj. ${date.format('HH:mm')}`;
  if (diffDays === 1) return `Hier ${date.format('HH:mm')}`;
  if (diffDays < 7) return `Il y a ${diffDays}j`;
  return date.format('DD MMM YYYY');
};

/**
 * Finds an object by id in a list.
 * @param id - The id to search for
 * @param list - The list to search in
 * @returns The found object or null if not found
 */
export const findDynamicIdInList = (id: string | undefined, list: any) => {
  if (!id || !list) return null;

  const array = Array.isArray(list) ? list : Array.isArray(list.content) ? list.content : null;
  if (!array) return null;

  return array.find((item: { id: string }) => item.id === id) || null;
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
): Date | null => {
  if (!date) return null;

  if (date instanceof Date) {
    return date;
  }
  const parsedDate = dayjs(date, inputFormat, true);
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
  locale: string = 'fr'
): string | null => {
  if (!dateString) return null;

  const parsedDate = dayjs(dateString, inputFormat, true);
  if (!parsedDate.isValid()) return null;

  return parsedDate.locale(locale).format('MMMM');
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

/**
 * Function to compress images files
 */

export const compressImagesFiles = async (file: File) => {
  const options = {
    fileType: 'image/webp', // Convertir en WebP
    maxSizeMB: 1, // Limiter à 1MB pour un bon compromis taille/qualité
    maxWidthOrHeight: 1920, // Limite la résolution à du Full HD
    initialQuality: 0.8, // Compression légère (1 = qualité max)
    useWebWorker: true,
  };
  return await imageCompression(file, options);
};

/**
 * Convert image files into base64
 */

export const fileToBase64 = async (file: File): Promise<string> => {
  const compressedFiles = await compressImagesFiles(file);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(compressedFiles);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Convert base64 filte to File
 */
export const base64ToFile = (base64: string, filename: string): File => {
  const arr = base64.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};
