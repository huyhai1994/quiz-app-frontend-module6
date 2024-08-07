import axios from "axios";

class CategoryService {
    static async getAllCategories() {
        return await axios.get("http://localhost:8080/category/list")
    }
}

export default CategoryService;
