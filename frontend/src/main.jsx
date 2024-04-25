import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import RegisterPage from './pages/authPages/RegisterPage.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ManagerPage from "./pages/managerPages/ManagerPage.jsx";

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <RegisterPage/>
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
