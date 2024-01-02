import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Employee from "./pages/Employee"
import Project from "./pages/Project"
import Setting from "./pages/Setting"

const Routes = [
    { path: "/dashboard", element: <Dashboard/>, isPrivate: false},
    { path: "/login", element: <Login/>, isPrivate: false},
    { path: "/employees", element: <Employee/>, isPrivate: true},
    { path: "/projects", element: <Project/>, isPrivate: true},
    { path: "/setting", element: <Setting/>, isPrivate: true}
]

export const routes = {
    Routes
}