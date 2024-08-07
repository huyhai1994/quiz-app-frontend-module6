import axios from 'axios';
import {API_USER_URL} from '../configs/backend.configs'

class StudentService {
    static async getAllStudents() {
        return await axios.get(API_USER_URL + '/students');
    }


    static async getStudentByNameAndEmail(name, email) {
        return await axios.get(API_USER_URL + '/search-student?email=' + email + '&name=' + name);
    }
}

export default StudentService;
