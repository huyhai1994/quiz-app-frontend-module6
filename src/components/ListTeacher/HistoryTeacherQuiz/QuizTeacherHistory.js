import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThreeDots } from 'react-loader-spinner';
import {fetchQuizHistoryByTeacher} from "../../../store/quizStore/QuizAxios";

const QuizTeacherHistory = () => {
    const dispatch = useDispatch();
    const { historyTeacher, loading, error } = useSelector((state) => state.quizzes);

    useEffect(() => {
        dispatch(fetchQuizHistoryByTeacher());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center">
                <ThreeDots color="#00BFFF" height={80} width={80} />
            </div>
        );
    }

    if (error) {
        return <div className="alert alert-danger" role="alert">Error: {error}</div>;
    }

    return (
        <div className="container">
            <h1 className="my-4">Quiz History</h1>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Difficulty</th>
                    <th>Finish Time</th>
                    <th>Score</th>
                    <th>Quantity Exam</th>
                </tr>
                </thead>
                <tbody>
                {historyTeacher.map((quiz, index) => (
                    <tr key={index}>
                        <td>{quiz.id}</td>
                        <td>{quiz.name}</td>
                        <td>{quiz.quantity}</td>
                        <td>{quiz.difficulty}</td>
                        <td>{quiz.finishTime}</td>
                        <td>{quiz.score}</td>
                        <td>{quiz.quantityExam}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default QuizTeacherHistory;
