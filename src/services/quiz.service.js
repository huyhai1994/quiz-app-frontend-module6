import axios from "axios";
import {API_QUIZ_URL} from "../configs/backend.configs";

class QuizService{
    static async getAllQuizzes(){
        return await axios.get(API_QUIZ_URL);


    }
}

export default QuizService;