import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home";
import Master from "./pages/admin/Master";
import NotFound from "./pages/notfound/NotFound";
import TeacherApprovalPendingList from "./components/list/approval-pending/TeacherApprovalPendingList";
import React from "react";
import TeacherList from "./components/list/teachers/TeacherList";
import Categories from "./components/list/categories/Categories";
import EditCategory from "./components/list/categories/EditCategory";
import AddCategory from "./components/list/categories/AddCategory";
import TeacherApprovalApprovedList from "./components/list/approval-pending/TeacherApprovalApprovedList";
import QuestionList from "./components/list/question/QuestionList";
import QuizList from "./components/list/quiz/QuizList";
import StudentList from "./components/list/students/StudentList";
import AuthLayout from "./components/auth/AuthLayout";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";

function App() {
    return (
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/login" element={
                    <AuthLayout title="Login">
                        <LoginForm />
                    </AuthLayout>
                } />
                <Route path="/register" element={
                    <AuthLayout title="Register">
                        <RegisterForm />
                    </AuthLayout>
                } />
                <Route path="/admin" element={<Master/>}>
                    <Route path="categories" element={<Categories/>}/>
                    <Route path="add-category" element={<AddCategory/>}/>
                    <Route path="edit/:id" element={<EditCategory/>}/>
                    <Route path={"question"} element={<QuestionList/>}></Route>
                    <Route path={"quiz"} element={<QuizList/>}></Route>
                    <Route path={"teacher/approved"} element={<TeacherApprovalApprovedList/>}></Route>
                    <Route path="pending-list" element={<TeacherApprovalPendingList/>}/>
                    <Route path="teacher-list" element={<TeacherList/>}/>
                    <Route path="student-list" element={<StudentList/>}/>
                </Route>
                <Route path="*" element={<NotFound/>} />
            </Routes>
    );
}

export default App;
