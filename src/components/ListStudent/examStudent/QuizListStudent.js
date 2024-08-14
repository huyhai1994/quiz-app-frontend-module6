import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListQuizStudent,  } from '../../../store/quizStore/QuizAxios';
import { useNavigate } from 'react-router-dom';
import {startQuizForUser} from "../../../store/resultStore/ResultAxios";

const QuizListStudent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const quizzes = useSelector((state) => state.quizzes.quizzes);
    const status = useSelector((state) => state.quizzes.loading);
    const error = useSelector((state) => state.quizzes.error);
    const [resultId, setResultId] = useState(null);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        dispatch(ListQuizStudent());
    }, [dispatch]);

    const handleStartQuiz = (quizId) => {
        dispatch(startQuizForUser({ userId, quizId }))
            .unwrap()
            .then((result) => {
                if (result) {
                    setResultId(result.id);
                    navigate(`/quizzes/${quizId}/start?resultId=${result.id}`);
                } else {
                    console.error('Result ID is missing in the API response');
                }
            })
            .catch((err) => {
                console.error('Failed to start quiz:', err.message);
            });
    };

    if (status === 'loading') {
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
