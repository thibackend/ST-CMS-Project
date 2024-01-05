import React, { useEffect, useState } from 'react';
import CookieService from './cookieStore';

const Auth = () => {
    const [dataAdmin, setDataAdmin] = useState([CookieService.getAuthCookie()]);
    const [status, setStatus] = useState({});

    useEffect(() => {
        if (dataAdmin && dataAdmin.length > 0) {
            setStatus({ st: true, setDataAdmin })
        } else {
            setStatus({ st: false, setDataAdmin })
        }
    }
        , [dataAdmin])

    return status

}
export default Auth;