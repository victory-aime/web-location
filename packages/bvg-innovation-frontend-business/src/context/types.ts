/**
 * Structure des informations de version de l'application.
 */
export type HandleAppVersionBody = {
  /**
   * Description de la version dans plusieurs langues.
   */
  description?: {
    ar: string
    fr: string
    en: string
  }
  /**
   * Clé unique de la version.
   */
  versionKey?: string
  /**
   * Indique si une action est bloquée dans cette version.
   */
  blockedAction?: boolean
}

/**
 * Interface pour la gestion du contexte de l'application.
 */
export interface IApplicationContext {
  /**
   * Récupère la configuration de l'API.
   */
  getApiConfig(): any

  /**
   * Gère les erreurs globales.
   * @param response - La réponse de l'API ou l'objet d'erreur.
   */
  handleError(response: any): void

  /**
   * Gère les informations à afficher.
   * @param response - La réponse de l'API ou l'objet d'information.
   */
  handleInfo(response: any): void

  /**
   * Gère les informations de version de l'application.
   * @param response - Les données liées à la version.
   */
  handleAppVersion(response: HandleAppVersionBody): void

  /**
   * Gère les informations liées à l'appareil.
   * @param response - Données de l'appareil.
   */
  handleDeviceInfo(response: any): void

  /**
   * Récupère le service de chargement (loader).
   */
  getLoaderService(): any

  /**
   * Récupère les données de l'appareil sous forme de chaîne.
   */
  getDeviceDataAsString(): string

  /**
   * Récupère la langue actuelle de l'application.
   */
  getCurrentLanguage(): string

  /**
   * Récupère la chaîne de texte correspondant à la langue sélectionnée.
   * @param value - Objet contenant les traductions.
   */
  getAttributeLanguage(value: any): string

  /**
   * Récupère la version de l'application.
   */
  getAppVersion(): string

  /**
   * Détermine si la version de l'application a déjà été traitée.
   */
  handledAppVersion: boolean

  /**
   * Définit si la version a été traitée.
   * @param value - Booléen indiquant l'état de traitement.
   */
  setHandledAppVersion(value: boolean): void

  /**
   * Récupère l'état d'autorisation du gestionnaire d'erreurs.
   */
  getShouldHandleError(): boolean

  /**
   * Définit l'autorisation du gestionnaire d'erreurs.
   * @param value - Booléen d'autorisation.
   */
  setShouldHandleError(value: boolean): void

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


export interface InvokeOptions {
  showError?: boolean;
  headers?: Record<string, string>;
}