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
import AuthLayout from "./components/layout/AuthLayout";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import {ConfigProvider, theme} from "antd";
import ChangePasswordForm from "./components/user-service/ChangePasswordForm";
import PasswordReset from "./components/user-service/PasswordReset";
import AdminEdit from "./pages/admin/admin-edit/AdminEdit";
import TeacherHome from "./pages/teacher/teacher-home/TeacherHome";
import TeacherMain from "./pages/teacher/teacher-home/main/TeacherMain";
import UserProfile from "./components/user-service/UserProfile";
import UserProfileLayout from "./components/layout/UserProfileLayout";
import StudentHome from "./pages/student/student-home/StudentHome";
import StudentMain from "./pages/student/student-home/main/StudentMain";
import QuizComponent from "./components/list/quiz-component/QuizComponent";
import QuestionCreate from "./components/list/question/question-create/QuestionCreate";
import OptionCreate from "./components/list/option/option-create/OptionCreate";
import QuizCreate from "./components/list/quiz/quiz-create/QuizzCreate";
import QuizTeacherList from "./components/ListTeacher/QuizTeacher/QuizTeacherList";
import ListTeacherQuestions from "./components/ListTeacher/QuestionTeacher/QuestionTeacherList";
import QuizHistoryList from "./components/ListStudent/StudentResultList/QuizHistoryList";
import QuizListStudent from "./components/ListStudent/examStudent/QuizListStudent";
import QuestionListStudent from "./components/ListStudent/examStudent/QuestionListStudent";
import ResultStudentList from "./components/ListStudent/StudentResultList/ResultStudentList";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";



function App() {
    return (<ConfigProvider theme={{
        algorithm: [theme.defaultAlgorithm], cssVar: true, token: {
            // Seed Token
            // colorPrimary: '#00b96b',
            // borderRadius: 2,

            // Alias Token
            // colorBgContainer: '#f6ffed',
            // colorPrimaryBg: '#e6f7ff',
            // colorLink: '#1890ff',
            // headerBg: '#5a2c82',
        }, components: {
            Layout: {
                lightTriggerBg: 'var(--color-bg)',
                lightTriggerColor: 'var(--color-primary)',
                lightSiderBg: 'var(--color-bg)',
            }, Menu: {
                itemBg: 'var(--color-bg)',
                itemColor: 'var(--color-primary)',
                itemHoverColor: 'var(--color-primary)',
                itemSelectedBg: 'var(--color-secondary)',
                itemActiveBg: 'var(--color-bg)',
                itemSelectedColor: 'var(--color-dark)',
            }, Dropdown: {
                background: 'var(--color-bg)',
            },
        },
    }}>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path={"/teacher-quizzes"} element={<QuizTeacherList/>}></Route>
            <Route path={"/result/history"} element={<QuizHistoryList/>}></Route>
            <Route path={"/teacher-question"} element={<ListTeacherQuestions/>}></Route>
            <Route path="/quizzes" element={<QuizListStudent />} />
            <Route path={"/result/new/:resultId"} element={<ResultStudentList/>}></Route>
            <Route path="/quizzes/:quizId/start" element={<QuestionListStudent />} />
            <Route path="/login" element={<AuthLayout title="Login">
                <LoginForm />
            </AuthLayout>} />
            <Route path="/register" element={<AuthLayout title="Register">
                <RegisterForm />
            </AuthLayout>} />
            <Route path="/profile" element={<UserProfileLayout />}>
                <Route index element={<UserProfile />} />
                <Route path="change-password" element={<ChangePasswordForm />} />
                <Route path="reset-password" element={<PasswordReset />} />
            </Route>
            <Route path="/admin" element={<Master/>}>

                <Route path="categories" element={<Categories/>}/>
                <Route path="update-info" element={<AdminEdit/>}/>
                <Route path="add-category" element={<AddCategory/>}/>
                <Route path="edit/:id" element={<EditCategory/>}/>
                <Route path="question" element={<QuestionList/>}/>
                <Route path="quiz" element={<QuizList/>}/>
                <Route path="teacher/approved" element={<TeacherApprovalApprovedList/>}/>
                <Route path="pending-list" element={<TeacherApprovalPendingList/>}/>
                <Route path="teacher-list" element={<TeacherList/>}/>
                <Route path="student-list" element={<StudentList/>}/>
            </Route>
            <Route path="/teacher" element={<TeacherHome/>}>
                <Route path="" element={<TeacherMain/>}/>
                <Route path="profile" element={<UserProfile/>}/>
                <Route path="change-password" element={<ChangePasswordForm/>}/>
                <Route path="question" element={<QuestionList/>}/>
                <Route path="question/create" element={<QuestionCreate/>}/>
                <Route path="option/create" element={<OptionCreate/>}/>
                <Route path="quiz/create" element={<QuizCreate/>}/>
            </Route>
            <Route path="/student" element={<StudentHome/>}>
                <Route path="" element={<StudentMain/>}/>
                <Route path="profile" element={<UserProfile/>}/>
                <Route path="change-password" element={<ChangePasswordForm/>}/>
                <Route path="quiz" element={<QuizList/>}/>
                <Route path="question" element={<QuizComponent/>}/>
            </Route>
            <Route path="/teacher" element={<Home/>}>

            </Route>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    </ConfigProvider>)
}

export default App;
