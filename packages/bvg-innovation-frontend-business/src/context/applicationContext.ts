import { HandleAppVersionBody, IApplicationContext } from './types'

/**
 * Implémentation par défaut du contexte de l'application.
 * Doit être étendue ou redéfinie dans le projet UI selon les besoins.
 */
export class ApplicationContext implements IApplicationContext {
  protected apiConfigs?: any
  protected loaderService?: any

  /**
   * Indique si la version de l'app a été traitée.
   */
  handledAppVersion = false

  /**
   * Indique si les erreurs doivent être gérées globalement.
   */
  private shouldHandleError = true

  /**
   * Clé utilisée pour le handover token dans les requêtes API.
   */
  handoverTokenKey = ''

  constructor() {}

  /**
   * @inheritdoc
   */
  getApiConfig(): any {
    return this.apiConfigs
  }

  /**
   * @inheritdoc
   */
  handleError(response: { status: number; message: string }): void {
    console.error('Global error:', response)
  }

  /**
   * Méthode générique pour gérer des informations à afficher.
   * @param response - Informations à afficher.
   */
  handleInfo(response: { data: any; status: number }): void {
    console.info('Global info:', response)
  }

  /**
   * @inheritdoc
   */
  handleAppVersion(response: HandleAppVersionBody): void {
    console.log('App version info:', response)
  }

  /**
   * @inheritdoc
   */
  handleDeviceInfo(response: any): void {
    console.log('Device info:', response)
  }

  /**
   * @inheritdoc
   */
  getLoaderService(): any {
    return this.loaderService
  }

  /**
   * @inheritdoc
   */
  getDeviceDataAsString(): string {
    return JSON.stringify({
      platform: 'mobile',
      os: 'unknown',
    })
  }

  /**
   * @inheritdoc
   */
  getCurrentLanguage(): string {
    return 'en'
  }

  /**
   * @inheritdoc
   */
  getAttributeLanguage(value: any): string {
    const lang = this.getCurrentLanguage()
    return value?.[lang] ?? ''
  }

  /**
   * @inheritdoc
   */
  getAppVersion(): string {
    return '1.0.0'
  }

  /**
   * @inheritdoc
   */
  setHandledAppVersion(value: boolean): void {
    this.handledAppVersion = value
  }

  /**
   * @inheritdoc
   */
  getShouldHandleError(): boolean {
    return this.shouldHandleError
  }

  /**
   * @inheritdoc
   */
  setShouldHandleError(value: boolean): void {
    this.shouldHandleError = value
  }

  /**
   * Récupère le mapping des challenge handlers personnalisés.
   */
  getChallengeHandlersMapping(): any {
    return {}
  }

  /**
   * Récupère le nom du canal courant (mobile, web, etc.).
   */
  getChannel(): string {
    return 'default'
  }

  /**
   * Token d'authentification à utiliser dans les appels API.
   */
  private authToken?: string

  /**
   * Définit le token d'authentification.
   * @param token - Le token à utiliser.
   */
  setToken(token: string): void {
    console.log('[Token] Auth token set.', token)
    this.authToken = token
  }

  /**
   * Récupère le token d'authentification courant.
   */
  getToken(): string | undefined {
    return this.authToken
  }
}

/**
 * Instance par défaut du contexte de l'application.
 */
export const defaultApplicationContext = new ApplicationContext()
