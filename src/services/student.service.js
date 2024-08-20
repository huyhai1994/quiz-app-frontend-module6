import axios from 'axios';
import {API_USER_URL} from '../configs/backend.configs';

class StudentService {
    static async getAllStudents() {
        return await axios.get(API_USER_URL + '/students');
    }

    static async getStudentByNameAndEmail(name, email) {
        return await axios.get(API_USER_URL + '/search-student?email=' + email + '&name=' + name);
    }

    static async getStudentUpgradeStatus() {
        return await axios.get(API_USER_URL + '/upgrade');
    }

    static async upgradeStudent() {
        const userId = localStorage.getItem('userId');
        const payload = {user_id: userId};
        return await axios.post(API_USER_URL + '/request-teacher-role', payload);
    }
}

export default StudentService;
