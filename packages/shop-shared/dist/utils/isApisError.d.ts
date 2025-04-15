/**
 * Function to check if the error is an API error
 * @param error
 * @returns
 */
export declare function isApiError(error: unknown): error is {
  status: number
  data: {
    message: string
  }
}
//# sourceMappingURL=isApisError.d.ts.map
