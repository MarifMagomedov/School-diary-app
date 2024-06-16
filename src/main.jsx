import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import RegisterPage from './pages/authPages/RegisterPage.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ManagerPage from "./pages/managerPages/ManagerPage.jsx";
import LoginPage from "./pages/authPages/LoginPage.jsx";

const router = createBrowserRouter(
    [
        {
            path: '/register',
            element: <RegisterPage/>
        },
        {
            path: '/login',
            element: <LoginPage/>
        },
        {
            path: '/manager',
            element: <ManagerPage/>
        }
    ]
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}></RouterProvider>
)
