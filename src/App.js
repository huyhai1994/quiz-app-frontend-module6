import './App.css';
import {Route, Routes} from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Master from "./pages/admin/Master";
import NotFound from "./pages/notfound/NotFound";
import TeacherApprovalPendingList from "./components/list/approval-pending/TeacherApprovalPendingList";
import React from "react";
import TeacherList from "./components/list/teachers/TeacherList";
import Categories from "./components/list/categories/Categories";


function App() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/admin" element={<Master/>}>
                <Route path="categories" element={<Categories/>}/>
                <Route path="pending-list" element={<TeacherApprovalPendingList/>}/>
                <Route path="teacher-list" element={<TeacherList/>}/>
            </Route>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
        ;
}

export default App;
