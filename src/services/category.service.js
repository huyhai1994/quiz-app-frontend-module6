import axios from "axios";
import {API_USER_URL} from "../configs/backend.configs";

class CategoryService {
    static async getAllCategories() {
        return await axios.get("http://localhost:8080/category/list")
    }
}

export default CategoryService;