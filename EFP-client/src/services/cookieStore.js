import Cookies from 'js-cookie';
const COOKIE_KEY = 'ADMIN_CREDENTIAL';

const CookieService = {
    setCookie: (key, value, options = {}) => {
        Cookies.set(key, value, options);
    },

    getCookie: (key) => {
        return Cookies.get(key);
    },

    removeCookie: (key) => {
        Cookies.remove(key);
    },

    //Auth

    setAuthCookie: (userData) => {
        CookieService.setCookie(COOKIE_KEY, JSON.stringify(userData));
    },

    getAuthCookie: () => {
        const cookieData = CookieService.getCookie(COOKIE_KEY.toString())
        return cookieData ? JSON.parse(cookieData) : null;
    },

    removeAuthCookies: async () => {
        // Xóa các giá trị cookie liên quan đến authentication
        CookieService.removeCookie(COOKIE_KEY);
      },
};

export default CookieService;