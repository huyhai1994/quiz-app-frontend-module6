import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {startQuizForUser} from "../../../store/resultStore/ResultAxios";


const QuizListStudent = () => {
    const dispatch = useDispatch();
    const quizzes = useSelector((state) => state.quizzes.quizzes);
    const status = useSelector((state) => state.quizzes.loading);
    const error = useSelector((state) => state.quizzes.error);
    const userId = 1; // Thay đổi theo cách bạn lấy userId

    const handleStartQuiz = (quizId) => {
        dispatch(startQuizForUser({ userId, quizId }))
            .unwrap()
            .then(() => {
                window.location.href = `/questions/${quizId}`;
            })
            .catch((err) => {
                console.error('Failed to start quiz:', err.message);
            });
    };

    if (status) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Danh sách các Quiz</h1>
            <ul>
                {quizzes.length > 0 ? (
                    quizzes.map((quiz) => (
                        <li key={quiz.id}>
                            {quiz.title} - {quiz.quantity} câu hỏi
                            <button onClick={() => handleStartQuiz(quiz.id)}>Bắt đầu thi</button>
                        </li>
                    ))
                ) : (
                    <p>Không có dữ liệu quiz hoặc dữ liệu không hợp lệ.</p>
                )}
            </ul>
        </div>
    );
};

export default QuizListStudent;
