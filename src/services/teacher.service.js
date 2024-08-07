import axios from 'axios';
import {API_USER_URL} from '../configs/backend.configs'


class TeacherService {
    static async getAllTeachers() {
        return await axios.get(API_USER_URL + '/teachers');
    }

    static async getPendingTeachers() {
        return await axios.get(API_USER_URL + '/approval-pending');
    }

    static async approveTeacher(teacherId) {
        return await axios.put(API_USER_URL + '/approval/' + teacherId);

    }
}

export default TeacherService;