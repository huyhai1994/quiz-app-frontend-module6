import axios from 'axios';
import {API_USER_URL} from '../configs/backend.configs'


class TeacherService {
    static async getAllTeachers() {
        return await axios.get(API_USER_URL + '/teachers');
    }

    static async getPendingTeachers() {
        return await axios.get(API_USER_URL + '/approval-pending');
    }

    static async deleteTeacher(teacherId) {
        return await axios.delete(API_USER_URL + '/delete/' + teacherId);
    }


    static async approveTeacher(teacherId) {
        return await axios.put(API_USER_URL + '/approval/' + teacherId);
    }

    static async getTeacherByNameAndEmail(name, email) {
        return await axios.get(API_USER_URL + '/search-teacher?email=' + email + '&name=' + name);
    }
}

export default TeacherService;
