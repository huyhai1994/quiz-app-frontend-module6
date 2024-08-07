import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Page from '../../pages/Page';
import { format } from "date-fns";
import {ListTeacherQuizzes} from "../../../store/quizStore/QuizAxios";


const ListTeacherQuizzesComponent = () => {
    const dispatch = useDispatch();
    const { quizzes, loading, error } = useSelector((state) => state.quizzes);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    useEffect(() => {
        const userId = 1;
        dispatch(ListTeacherQuizzes(userId));
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const totalPages = Math.ceil(quizzes.length / pageSize);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return quizzes.slice(startIndex, endIndex);
    };

    const currentData = getCurrentPageData();

    return (
        <div>
            <h2>Teacher Quiz List</h2>
            <table className="table table-bordered table-striped">
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Tiêu đề</th>
                    <th>Mô tả</th>
                    <th>Người tạo</th>
                    <th>Thời gian tạo</th>
                </tr>
                </thead>
                <tbody>
                {currentData.length > 0 ? (
                    currentData.map((quiz, index) => (
                        <tr key={quiz.quizzesId}>
                            <td>{(currentPage - 1) * pageSize + index + 1}</td>
                            <td>{quiz.quizzesTitle}</td>
                            <td>{quiz.quizzesDescription}</td>
                            <td>{quiz.usersName}</td>
                            <td>{format(new Date(quiz.quizzesTimeCreate), 'dd-MM-yyyy - HH:mm:ss')}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5">Không có dữ liệu</td>
                    </tr>
                )}
                </tbody>
            </table>
            <Page
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default ListTeacherQuizzesComponent;
