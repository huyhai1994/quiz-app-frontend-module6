import {configureStore} from "@reduxjs/toolkit";
import categoryReducer from "./categoryStore/CategoryService";
import optionReducer from "./optionStore/OptionSlice";
import questionReducer from "./questionStore/QuestionSlice";
import quizReducer from "./quizStore/QuizSlice";
import resultReducer from "./resultStore/ResultSlice";
import roleReducer from "./roleStore/RoleSlice";
import teacherApprovalReducer from "./teacherApprovalStore/TeacherApprovalSlice";
import userReducer from "./userStore/UserSlice";

const store = configureStore({
    reducer: {
        category: categoryReducer,
        options: optionReducer,
        questions: questionReducer,
        quizzes: quizReducer,
        results: resultReducer,
        roles: roleReducer,
        teacherApprovals: teacherApprovalReducer,
        users: userReducer
    }
})

export default store;