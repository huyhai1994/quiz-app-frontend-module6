import axios from "axios";
import {API_ADD_CATEGORY_URL, API_CATEGORIES_URL} from "../configs/backend.configs";

class CategoryService {
    static async getAllCategories() {
        return await axios.get(API_CATEGORIES_URL)
    }
    static async addCategory(data) {
        return await axios.post(API_ADD_CATEGORY_URL, data);
    }

}

export default CategoryService;