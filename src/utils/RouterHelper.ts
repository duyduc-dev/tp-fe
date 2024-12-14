import qs from 'qs';

class RouterHelper {
  redirectUrl = (url: string, redirectUrl?: string, params?: any) => {
    let redirectPath = redirectUrl;
    if (redirectUrl?.includes(window.origin)) {
      redirectPath = redirectUrl.slice(window.origin.length);
    }
    if (redirectPath) {
      redirectPath = encodeURI(redirectPath);
    }
    return `${url}?redirect=${redirectPath}&${qs.stringify(params)}`;
  };

  addParams(url: string, params?: any) {
    return `${url}?${qs.stringify(params)}`;
  }
}

export default new RouterHelper();
