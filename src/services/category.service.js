import axios from "axios";
import {API_CATEGORIES_URL} from "../configs/backend.configs";

class CategoryService {
    static async getAllCategories() {
        return await axios.get(API_CATEGORIES_URL)
    }
}

export default CategoryService;