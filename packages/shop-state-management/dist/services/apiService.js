import axios from 'axios'
import { applicationContext } from '../applicationContext'
const axiosInstance = axios.create()
axiosInstance.interceptors.request.use((config) => {
  const token = applicationContext.getToken()
  if (token && config.headers?.set) {
    config.headers.set('Authorization', `Bearer ${token}`)
  }
  return config
})
export const apiCall = async ({ url, method, responseType = 'json' }, data, params) => {
  const loaderService = applicationContext.getLoaderService()
  const apiConfig = applicationContext.getApiConfig()
  const handleError = applicationContext.handleError.bind(applicationContext)
  const handleInfo = applicationContext.handleInfo.bind(applicationContext)
  const deviceData = applicationContext.getDeviceDataAsString()
  const baseUrl = apiConfig?.baseUrl || ''
  const headers = {
    'Content-Type': 'application/json',
    'X-Device': deviceData,
  }
  const config = {
    method,
    url: `${baseUrl}${url}`,
    headers,
    data,
    params,
    responseType: responseType === 'json' ? 'json' : 'text',
  }
  try {
    loaderService?.showLoader()
    const response = await axiosInstance(config)
    handleInfo(response)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      handleError({ status: error.response?.status, message: error.response?.data })
      return Promise.reject(error.response)
    } else {
      handleError({
        status: 500,
        message: 'victory',
      })
      return Promise.reject({
        status: 500,
        message: error,
      })
    }
  } finally {
    loaderService?.hideLoader()
  }
}
//# sourceMappingURL=apiService.js.map
