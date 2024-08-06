import axios from "axios";
import {API_USER_URL} from "../configs/backend.configs";

class CategoryService {
    static async getAllCategories() {
        return await axios.get(API_USER_URL + "/categories")
    }
}

export default CategoryService;