/**
 * Implémentation par défaut du contexte de l'application.
 * Doit être étendue ou redéfinie dans le projet UI selon les besoins.
 */
export class ApplicationContext {
  constructor() {
    /**
     * Indique si la version de l'app a été traitée.
     */
    this.handledAppVersion = false
    /**
     * Indique si les erreurs doivent être gérées globalement.
     */
    this.shouldHandleError = true
    /**
     * Clé utilisée pour le handover token dans les requêtes API.
     */
    this.handoverTokenKey = ''
  }
  /**
   * @inheritdoc
   */
  getApiConfig() {
    return this.apiConfigs
  }
  /**
   * @inheritdoc
   */
  handleError(response) {
    console.error('Global error:', response)
  }
  /**
   * Méthode générique pour gérer des informations à afficher.
   * @param response - Informations à afficher.
   */
  handleInfo(response) {
    console.info('Global info:', response)
  }
  /**
   * @inheritdoc
   */
  handleAppVersion(response) {
    console.log('App version info:', response)
  }
  /**
   * @inheritdoc
   */
  handleDeviceInfo(response) {
    console.log('Device info:', response)
  }
  /**
   * @inheritdoc
   */
  getLoaderService() {
    return this.loaderService
  }
  /**
   * @inheritdoc
   */
  getDeviceDataAsString() {
    return JSON.stringify({
      platform: 'mobile',
      os: 'unknown',
    })
  }
  /**
   * @inheritdoc
   */
  getCurrentLanguage() {
    return 'en'
  }
  /**
   * @inheritdoc
   */
  getAttributeLanguage(value) {
    const lang = this.getCurrentLanguage()
    return value?.[lang] ?? ''
  }
  /**
   * @inheritdoc
   */
  getAppVersion() {
    return '1.0.0'
  }
  /**
   * @inheritdoc
   */
  setHandledAppVersion(value) {
    this.handledAppVersion = value
  }
  /**
   * @inheritdoc
   */
  getShouldHandleError() {
    return this.shouldHandleError
  }
  /**
   * @inheritdoc
   */
  setShouldHandleError(value) {
    this.shouldHandleError = value
  }
  /**
   * Récupère le mapping des challenge handlers personnalisés.
   */
  getChallengeHandlersMapping() {
    return {}
  }
  /**
   * Récupère le nom du canal courant (mobile, web, etc.).
   */
  getChannel() {
    return 'default'
  }
  /**
   * Définit le token d'authentification.
   * @param token - Le token à utiliser.
   */
  setToken(token) {
    console.log('[Token] Auth token set.', token)
    this.authToken = token
  }
  /**
   * Récupère le token d'authentification courant.
   */
  getToken() {
    return this.authToken
  }
}
/**
 * Instance par défaut du contexte de l'application.
 */
export const defaultApplicationContext = new ApplicationContext()
//# sourceMappingURL=applicationContext.js.map
