import axios from "axios";
import {API_QUIZ_URL} from "../configs/backend.configs";

class QuizService{
    static async getQuizByTitle(){
        return await axios.get(API_QUIZ_URL +  )
    }
}