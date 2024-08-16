import axios from "axios";
import axiosInstance from "../utils/axiosConfig";
import {API_QUIZ_URL} from "../configs/backend.configs";

class QuizService {

    static async addQuiz(data) {
        const userId = localStorage.getItem('userId');
        const payload = {
            title: data.title,
            description: data.description,
            quizTime: data.quizTime,
            quantity: data.quantity,
            passingScore: data.passingScore,
            questionIds: data.questionIds,
            timeCreated: data.timeCreated
        };
        return await axiosInstance.post(API_QUIZ_URL, payload, {
            params: {userId}
        });
    }

    static async getAllQuizzes() {
        return await axios.get(API_QUIZ_URL);
    }

    static async searchQuizzes(title, category) {
        return await axios.get(`${API_QUIZ_URL}/search`, {
            params: {title, category}
        });
    }

}

export default QuizService;
