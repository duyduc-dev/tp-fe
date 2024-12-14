const _prefix = '_techplatform_';

export enum CookieKeys {
  ACCESS_TOKEN = `${_prefix}_token`,
  TOKEN_EXPIRY_TIME = `${_prefix}_expiry_token`,
}

class CookieHelper {
  // Method to get a cookie value by name
  getCookie(name: string): string | null {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=').map((c) => c.trim());
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  }
  // Method to set a cookie with a name, value, and optional expiration date
  setCookie(name: string, value: string, expires?: Date): void {
    this.deleteCookie(name);
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    if (expires) {
      cookieString += `;expires=${expires.toUTCString()}`;
    }
    document.cookie = cookieString;
  }

  // Method to delete a cookie by name
  deleteCookie(name: string): void {
    document.cookie = `${encodeURIComponent(name)}=;expires=0`;
  }
}

export default new CookieHelper();
