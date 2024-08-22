import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {TailSpin} from 'react-loader-spinner';
import {format} from 'date-fns';
import {ResultDetailHistory} from "../../../store/resultStore/ResultAxios";

const QuizHistoryDetail = React.memo(() => {
    const dispatch = useDispatch();
    const {quiz, status, error} = useSelector((state) => state.results);
    const selectedQuizId = useSelector((state) => state.selectedQuizId);

    useEffect(() => {
        if (selectedQuizId) {
            dispatch(ResultDetailHistory(selectedQuizId));
        }
    }, [dispatch, selectedQuizId]);

    const formatDate = (dateString) => {
        let date = new Date(dateString);
        if (!(date instanceof Date) || isNaN(date.getTime())) {
            date = new Date(); // Fallback to current date if the dateString is invalid
        }
        return format(date, 'dd-MM-yyyy - HH:mm:ss');
    };

    if (status === 'loading') {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
                <TailSpin color="#00BFFF" height={80} width={80}/>
            </div>
        );
    }

    if (status === 'failed') {
        return <p>Error: {error}</p>;
    }

    if (!quiz) {
        return <p>Loading details...</p>;
    }

    return (
        <div>
            <p><strong>Tên quiz:</strong> {quiz.quizName}</p>
            <p><strong>Thời gian hoàn thành:</strong> {quiz.submitTime ? formatDate(quiz.submitTime) : ''}</p>
            <p><strong>Điểm số:</strong> {quiz.score}</p>
            <p><strong>Tổng số câu đúng:</strong> {quiz.correctAnswers}</p>
            <p><strong>Tổng số câu sai:</strong> {quiz.incorrectAnswers}</p>
            <p><strong>Xếp hạng:</strong> {quiz.rank}</p>
        </div>
    );
});

export default QuizHistoryDetail;
