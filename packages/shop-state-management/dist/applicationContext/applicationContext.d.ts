import { HandleAppVersionBody, IApplicationContext } from './types'
/**
 * Implémentation par défaut du contexte de l'application.
 * Doit être étendue ou redéfinie dans le projet UI selon les besoins.
 */
export declare class ApplicationContext implements IApplicationContext {
  protected apiConfigs?: any
  protected loaderService?: any
  /**
   * Indique si la version de l'app a été traitée.
   */
  handledAppVersion: boolean
  /**
   * Indique si les erreurs doivent être gérées globalement.
   */
  private shouldHandleError
  /**
   * Clé utilisée pour le handover token dans les requêtes API.
   */
  handoverTokenKey: string
  constructor()
  /**
   * @inheritdoc
   */
  getApiConfig(): any
  /**
   * @inheritdoc
   */
  handleError(response: { status: number; message: string }): void
  /**
   * Méthode générique pour gérer des informations à afficher.
   * @param response - Informations à afficher.
   */
  handleInfo(response: { data: any; status: number }): void
  /**
   * @inheritdoc
   */
  handleAppVersion(response: HandleAppVersionBody): void
  /**
   * @inheritdoc
   */
  handleDeviceInfo(response: any): void
  /**
   * @inheritdoc
   */
  getLoaderService(): any
  /**
   * @inheritdoc
   */
  getDeviceDataAsString(): string
  /**
   * @inheritdoc
   */
  getCurrentLanguage(): string
  /**
   * @inheritdoc
   */
  getAttributeLanguage(value: any): string
  /**
   * @inheritdoc
   */
  getAppVersion(): string
  /**
   * @inheritdoc
   */
  setHandledAppVersion(value: boolean): void
  /**
   * @inheritdoc
   */
  getShouldHandleError(): boolean
  /**
   * @inheritdoc
   */
  setShouldHandleError(value: boolean): void
  /**
   * Récupère le mapping des challenge handlers personnalisés.
   */
  getChallengeHandlersMapping(): any
  /**
   * Récupère le nom du canal courant (mobile, web, etc.).
   */
  getChannel(): string
  /**
   * Token d'authentification à utiliser dans les appels API.
   */
  private authToken?
  /**
   * Définit le token d'authentification.
   * @param token - Le token à utiliser.
   */
  setToken(token: string): void
  /**
   * Récupère le token d'authentification courant.
   */
  getToken(): string | undefined
}
/**
 * Instance par défaut du contexte de l'application.
 */
export declare const defaultApplicationContext: ApplicationContext
//# sourceMappingURL=applicationContext.d.ts.map
