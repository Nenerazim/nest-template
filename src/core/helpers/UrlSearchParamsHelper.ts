export class UrlSearchParamsHelper {
  static objectToUrlSearchParams<T = Record<string, string | string[]>>(obj: T) {
    const params = new URLSearchParams();
    for (const key in obj) {
      if (Array.isArray(obj[key])) {
        (obj[key] as string[]).forEach((param) => {
          params.append(key, param);
        });
      } else {
        if (obj[key]) {
          params.append(key, String(obj[key]));
        }
      }
    }
    return params;
  }
}
