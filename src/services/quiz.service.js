import axios from 'axios';
import {API_QUIZ_URL} from "../configs/backend.configs";

class QuizService {
    static async addQuiz(data) {
        const userId = localStorage.getItem('userId');
        return await axios.post(`${API_QUIZ_URL}/create?userId=${userId}`, data);
    }
}

export default QuizService;
