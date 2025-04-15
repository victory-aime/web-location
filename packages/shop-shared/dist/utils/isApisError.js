/**
 * Function to check if the error is an API error
 * @param error
 * @returns
 */
export function isApiError(error) {
  if (typeof error !== 'object' || error === null) {
    return false
  }
  const hasStatus = 'status' in error && typeof error.status === 'number'
  const hasData = 'data' in error && typeof error.data === 'object'
  if (!hasStatus || !hasData) {
    return false
  }
  const data = error.data
  return typeof data.message === 'string'
}
//# sourceMappingURL=isApisError.js.map
