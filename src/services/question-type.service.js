import axios from 'axios';
import {API_QUESTION_TYPE} from "../configs/backend.configs";

class QuestionTypeService {
    static async getAllQuestionTypes() {
        return await axios.get(API_QUESTION_TYPE + '/get-all');
    }

}

export default QuestionTypeService;

