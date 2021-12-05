/**
 * Contains methods for creating/updating/removing data from the user's local storage
 */
export default class WebStorage {
  private static lsKey = "movieRecommenderSystem";
  private static ssKey = "movieRecommenderSystem";

  // =================================================================================================================
  /**
   * Handles storing account data
   */
  // =================================================================================================================

  public static checkForData(): object | null {
    if (localStorage.getItem(this.lsKey) !== undefined) {
      // @ts-ignore
      return JSON.parse(localStorage.getItem(this.lsKey))
    }
    return null
  }

  public static updateData(data) {
    localStorage.setItem(this.lsKey, JSON.stringify(data))
  }

  public static deleteAllData() {
    localStorage.removeItem(this.lsKey)
    sessionStorage.removeItem(this.ssKey)
  }

  // =================================================================================================================
  /**
   * Handles storing user's auth in session storage
   */
  // =================================================================================================================

  public static authorizeUser(username: string) {
    sessionStorage.setItem(this.ssKey, username)
  }

  public static getCurrentAuthorizedUser(): string | null {
    if (sessionStorage.getItem(this.ssKey) !== undefined) {
      return sessionStorage.getItem(this.ssKey)
    }
    return null
  }

  public static logoutUser() {
    sessionStorage.removeItem(this.ssKey)
  }
}
