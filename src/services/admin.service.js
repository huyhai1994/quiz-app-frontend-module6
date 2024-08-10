import axios from "axios";
import {API_USER_URL} from '../configs/backend.configs';

class AdminService {
    static async updateAdmin(data) {
        const formData = new FormData();
        formData.append('id', data.id);
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('currentPassword', data.currentPassword);
        formData.append('newPassword', data.newPassword);
        if (data.avatar) {
            formData.append('avatar', data.avatar);
        }

        return await axios.put(`${API_USER_URL}/update-admin-info`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    static async findAdmin() {
        return await axios.get(`${API_USER_URL}/admin-info`);
    }
}

export default AdminService;
