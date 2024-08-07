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
import TeacherApprovalApprovedList from "./components/list/approval-pending/TeacherApprovalApprovedList";
import QuestionList from "./components/list/question/QuestionList";
import QuizList from "./components/list/quiz/QuizList";
import QuizTeacherList from "./components/ListTeacher/QuizTeacher/QuizTeacherList";
import ListTeacherQuestions from "./components/ListTeacher/QuestionTeacher/QuestionTeacherList";


function App() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path={"/teacher-quizzes"} element={<QuizTeacherList/>}></Route>
            <Route path={"/teacher-question"} element={<ListTeacherQuestions/>}></Route>
            <Route path="/admin" element={<Master/>}>

                <Route path="categories" element={<Categories/>}/>
                <Route path={"question"} element={<QuestionList/>}></Route>
                <Route path={"quiz"} element={<QuizList/>}></Route>
                <Route path={"teacher/approved"} element={<TeacherApprovalApprovedList/>}></Route>
                <Route path="pending-list" element={<TeacherApprovalPendingList/>}/>
                <Route path="teacher-list" element={<TeacherList/>}/>
            </Route>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
        ;
}

export default App;
