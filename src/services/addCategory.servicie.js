import axios from "axios";
import {API_ADD_CATEGORY_URL} from "../configs/backend.configs";

class AddCategoryServicie {
    static async addCategory() {
        return await axios.post(API_ADD_CATEGORY_URL);
    }
}

export default AddCategoryServicie;