import axios from 'axios';
import {API_QUESTION_URL} from "../configs/backend.configs";

class QuestionService {
    static async addQuestion(data) {
        const userId = localStorage.getItem('userId');
        const payload = {
            questionText: data.title,
            questionType: {id: data.questionType},
            category: {id: data.category},
            createdBy: {id: userId},
            difficulty: data.difficulty,
            options: data.options
        };
        return await axios.post(API_QUESTION_URL, payload);
    };

    static async getQuestionById(id) {
        return await axios.get(`${API_QUESTION_URL}/${id}`);
    }

    static async updateQuestion(id, updateQuestionData) {
        const userId = localStorage.getItem('userId');
        const payload = {
            questionText: updateQuestionData.title,
            questionType: {id: updateQuestionData.questionType},
            category: {id: updateQuestionData.category},
            createdBy: {id: userId},
            difficulty: updateQuestionData.difficulty,
            options: updateQuestionData.options
        };
        return await axios.put(`${API_QUESTION_URL}/${id}`, payload);

    }
}

export default QuestionService;
