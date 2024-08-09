import axios from "axios";

import {API_USER_URL} from '../configs/backend.configs'

class AdminService {

    static async updateAdmin(adminId, data) {
        return await axios.put(`${API_USER_URL}/update-admin-info`, data);
    }

    static async findAdmin() {
        return await axios.get(`${API_USER_URL}/admin-info`);
    }
}

export default AdminService;
