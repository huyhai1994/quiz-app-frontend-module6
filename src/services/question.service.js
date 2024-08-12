import axios from 'axios';

import {API_QUESTION_URL} from "../configs/backend.configs";

class QuestionService {
    static async addQuestion(data) {
        return await axios.post(API_QUESTION_URL + '/create', data);
    }
}

export default QuestionService;
