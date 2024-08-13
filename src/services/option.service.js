import axios from 'axios';
import {API_OPTION_URL} from "../configs/backend.configs";

class OptionService {
    static async addOption(data, userId) {
        const payload = {
            question: {id: data.questionId}, // Set the question field with the questionId
            optionText: data.optionText, correct: data.correct, createdBy: {id: userId}
        };
        return await axios.post(API_OPTION_URL + '/create', payload);
    }
}

export default OptionService;
