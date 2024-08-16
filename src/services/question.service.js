import axios from 'axios';
import {API_QUESTION_URL} from "../configs/backend.configs";

class QuestionService {
    static async addQuestion(data, userId) {
        const payload = {
            questionText: data.title,
            questionType: {id: data.questionType},
            category: {id: data.category},
            createdBy: {id: userId},
            difficulty: data.difficulty
        };
        return await axios.post(`${API_QUESTION_URL}`, payload);
    }
}

export default QuestionService;
