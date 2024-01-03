import Dashboard from "./pages/Dashboard"
import Employee from "./pages/Employee"
import Project from "./pages/Project"
import Setting from "./pages/Setting"
import EditProject from "./components/EditProject/EditProject"
import Login from "./pages/Auth/Login"
import InfoCard from './components/Dashboard/InfoCard'
import Cards from './components/Dashboard/Cards'

const Routes = [
    { path: "/dashboard", element: <Dashboard/>, isPrivate: true},
    { path: "/", element: <Login/>, isPrivate: false},
    { path: "/employees", element: <Employee/>, isPrivate: true},
    { path: "/projects", element: <Project/>, isPrivate: true},
    { path: "/setting", element: <Setting/>, isPrivate: true},
    { path: "/employees/edit", element: <EditProject />, isPrivate: true },
    { path: "/inforcard", element: <InfoCard />, isPrivate: true },
    { path: "/card", element: <Cards/>, isPrivate: true},
]

export const routes = {
    Routes
}