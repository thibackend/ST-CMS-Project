import React, { useEffect, useState } from 'react';
import CookieService from './cookieStore';

export default function Auth() {
    const [dataAdmin, setDataAdmin] = useState([]);

    const handleCookieDataAdmin = async (dataCookie = '', method = 'set') => {
        if (method == 'remove') {
            await CookieService.removeAuthCookies();
        }
        else {
            CookieService.setAuthCookie(dataCookie);
        }
        setDataAdmin(dataCookie);
    }

    const fetchAdminData = async () => {
        const dataCookie = await CookieService.getAuthCookie();
        setDataAdmin(dataCookie);
    }
    useEffect(() => {
        fetchAdminData();
    }, [])

    if (dataAdmin && dataAdmin.length > 0) {
        return { st: true, handleCookieDataAdmin }
    }
    else {
        return { st: false, handleCookieDataAdmin }
    }
}