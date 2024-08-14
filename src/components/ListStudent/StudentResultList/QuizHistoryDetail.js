import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TailSpin } from 'react-loader-spinner';
import { format } from 'date-fns';
import {ResultDetailHistory} from "../../../store/resultStore/ResultAxios";

const QuizHistoryDetail = React.memo(() => {
    const dispatch = useDispatch();
    const { quiz, status, error } = useSelector((state) => state.results);
    const selectedQuizId = useSelector((state) => state.selectedQuizId);

    useEffect(() => {
        if (selectedQuizId) {
            dispatch(ResultDetailHistory(selectedQuizId));
        }
    }, [dispatch, selectedQuizId]);

    if (status === 'loading') return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <TailSpin color="#00BFFF" height={80} width={80} />
        </div>
    );

    if (status === 'failed') return <p>Error: {error}</p>;

    if (!quiz) return <p>Loading details...</p>;

    return (
        <div>
            <p><strong>Quiz Name:</strong> {quiz.quizName}</p>
            <p><strong>Submit Time:</strong> {quiz.submitTime ? format(new Date(quiz.submitTime), 'dd-MM-yyyy - HH:mm:ss') : ''}</p>
            <p><strong>Score:</strong> {quiz.score}</p>
            <p><strong>Correct Answers:</strong> {quiz.correctAnswers}</p>
            <p><strong>Incorrect Answers:</strong> {quiz.incorrectAnswers}</p>
            <p><strong>Rank:</strong> {quiz.rank}</p>
        </div>
    );
});

export default QuizHistoryDetail;
