import React from "react"
import { Route, Routes } from 'react-router-dom'
import Dashboard from "../pages/Dashboard"
import Login from "../pages/Auth"
import Project from "../pages/Project"
import Employee from "../pages/Employee"
import EditProject from "../pages/Project/EditProject"
import AddEmployee from "../pages/Employee/AddEmployee"
import AddProject from "../pages/Project/AddProject"

const Routers = [
    { path: "/", element: <Dashboard/>, isPrivate: true},
    { path: "/login", element: <Login />, isPrivate: false},
    { path: "/employees", element: <Employee />, isPrivate: true},
    { path: "/projects", element: <Project />, isPrivate: true},
    { path: "/employees/edit", element: <EditProject />, isPrivate: true},
    { path: "/employees/add", element: <AddEmployee />, isPrivate: true},
    { path: "/projects/add", element: <AddProject />, isPrivate: true},
    { path: "/projects/edit", element: <EditProject />, isPrivate: true},
]

const AppRoutes = () => {
    return (
        <Routes>
              {Routers.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
        </Routes>
    )
}

export default AppRoutes;