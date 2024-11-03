export class CookieHelper {
  static objectToString(cookies: Record<string, string>) {
    let cookieString = '';
    for (const key in cookies) {
      cookieString += `${key}=${cookies[key]};`;
    }
    return cookieString.slice(0, -1);
  }

  static objectToArray(cookies: Record<string, string>) {
    const cookieArray: string[] = [];
    for (const key in cookies) {
      cookieArray.push(`${key}=${cookies[key]};`);
    }
    return cookieArray;
  }

  static arrayToObject(arrCookies: string[]) {
    const cookies: Record<string, string> = {};
    for (const cookie of arrCookies) {
      if (cookie.includes(';')) {
        const arrOfValues = cookie.split(';');
        const keyValueArr = arrOfValues[0].split('=');
        cookies[keyValueArr[0]] = keyValueArr[1];
      } else {
        const keyValueArr = cookie.split('=');
        cookies[keyValueArr[0]] = keyValueArr[1];
      }
    }
    return cookies;
  }
}
