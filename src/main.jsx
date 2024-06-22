import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import RegisterPage from './pages/authPages/RegisterPage.jsx'
import {BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes} from 'react-router-dom'
import ManagerPage from "./pages/managerPages/ManagerPage.jsx";
import LoginPage from "./pages/authPages/LoginPage.jsx";
import StudentPage from "./pages/studentPages/StudentPage.jsx"
import Diary from "./components/diaryComponents/Diary.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/manager" element={<ManagerPage />} />
            <Route path="/student/*" element={<StudentPage />} >
                <Route path="diary" element={<Diary />} />
            </Route>
        </Routes>
    </BrowserRouter>
)
