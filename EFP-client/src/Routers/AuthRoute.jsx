import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Auth';
import NotFound from '../pages/NOTFOUND';
const AuthRoute = ({ handleCookieDataAdmin }) => {
    return (
        <Routes>
            <Route
                path={'/'}
                element={<Login handleCookieDataAdmin={handleCookieDataAdmin} />}
            />
           
            {/* <Route
                path={'*'}
                element={<NotFound />}
            /> */}
        </Routes>
    )
}

export default AuthRoute;