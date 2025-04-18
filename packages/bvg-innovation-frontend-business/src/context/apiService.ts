import axios, { AxiosRequestConfig } from 'axios'
import { APIObjectType } from 'bvg-innovation-shared'
import { InvokeOptions, IApplicationContext } from './'

export class ApiService {
  constructor(private applicationContext: IApplicationContext) {}

  invoke<RQ = any, RS = any>(
    endpoint: APIObjectType,
    requestData?: RQ,
    options?: InvokeOptions
  ): Promise<RS> {
    const config: AxiosRequestConfig = {
      url: endpoint.url,
      method: endpoint.method,
      responseType: endpoint.responseType as any,
      headers: {
        ...(endpoint.headers || {}),
        ...(options?.headers || {}),
      },
    }

    // Cas POST, PUT, PATCH → on envoie dans data
    if (['POST', 'PUT', 'PATCH'].includes(endpoint.method)) {
      config.data = requestData
    } else {
      config.params = requestData
    }

    return axios(config)
      .then((res) => {
        this.applicationContext.handleInfo(res.data)
        return res.data as RS
      })
      .catch((error) => {
        if (!endpoint.handleErrorManually) {
          this.applicationContext.handleError({
            status: error?.response?.status,
            message: error?.message || 'Une erreur est survenue',
          })
        }
        throw error
      })
  }
}
