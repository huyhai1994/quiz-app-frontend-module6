import axios from 'axios';

class QuizRoomService {
    async joinQuizRoom(roomCode, userId) {
        try {
            const response = await axios.post(`http://localhost:8080/api/quiz-rooms/${roomCode}/join?userId=${userId}`);
            console.log('API response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error joining quiz room:', error);
            throw error;
        }
    }
    async startQuiz(roomCode) {
        try {
            const response = await axios.post(`http://localhost:8080/api/quiz-rooms/${roomCode}/start`);
            return response.data;
        } catch (error) {
            console.error('Error starting quiz:', error);
            throw error;
        }
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new QuizRoomService();
