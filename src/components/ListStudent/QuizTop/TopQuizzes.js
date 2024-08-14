import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TailSpin } from 'react-loader-spinner';
import Swal from 'sweetalert2';
import {fetchTopQuizzes} from "../../../store/quizStore/QuizAxios";

const TopQuizzes = () => {
    const dispatch = useDispatch();
    const { topQuizzes, loading, error } = useSelector((state) => state.quizzes);

    useEffect(() => {
        dispatch(fetchTopQuizzes());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            Swal.fire('Lỗi', error, 'error');
        }
    }, [error]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <TailSpin color="#00BFFF" height={80} width={80} />
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h2>Bài Thi Phổ Biến Nhất</h2>
            <table className="table table-bordered table-striped mt-3">
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Tiêu đề</th>
                    <th>Số lượt thi</th>
                </tr>
                </thead>
                <tbody>
                {topQuizzes.length > 0 ? (
                    topQuizzes.map((quiz, index) => (
                        <tr key={quiz.id}>
                            <td>{index + 1}</td>
                            <td>{quiz.title}</td>
                            <td>{quiz.resultCount}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3">Không có dữ liệu</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default TopQuizzes;
