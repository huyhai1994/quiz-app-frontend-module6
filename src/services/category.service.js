import axios from "axios";
import {
    API_ADD_CATEGORY_URL,
    API_CATEGORIES_URL,
    API_DELETE_CATEGORY_URL,
    API_UPDATE_CATEGORY_URL
} from "../configs/backend.configs";

class CategoryService {
    static async getAllCategories() {
        return await axios.get(API_CATEGORIES_URL)
    }

    static async addCategory(data) {
        return await axios.post(API_ADD_CATEGORY_URL, data);
    }

    static async updateCategory(categoryId, data) {
        return await axios.put(`${API_UPDATE_CATEGORY_URL}/${categoryId}`, data);
    }

    static async findCategoryById(categoryId) {
        return await axios.get(`${API_CATEGORIES_URL}/${categoryId}`);
    }

    static async destroyCategory(categoryId) {
        return await axios.delete(`${API_DELETE_CATEGORY_URL}/${categoryId}`);
    }


}

export default CategoryService;
