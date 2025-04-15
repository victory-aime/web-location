/**
 * Function to check if the error is an API error
 * @param error
 * @returns
 */

export function isApiError(error: unknown): error is { status: number; data: { message: string } } {
  if (typeof error !== 'object' || error === null) {
    return false
  }
  const hasStatus = 'status' in error && typeof (error as { status: unknown }).status === 'number'
  const hasData = 'data' in error && typeof (error as { data: unknown }).data === 'object'
  if (!hasStatus || !hasData) {
    return false
  }
  const data = (error as { data: unknown }).data
  return typeof (data as { message: unknown }).message === 'string'
}
