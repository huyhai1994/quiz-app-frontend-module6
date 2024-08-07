import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListQuestion } from "../../../store/questionStore/QuestionAxios";
import { format } from "date-fns";
import Page from "../../pages/Page"; // Import component phân trang

const QuestionList = () => {
    const dispatch = useDispatch();
    const questions = useSelector((state) => state.questions.questions);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    useEffect(() => {
        dispatch(ListQuestion());
    }, [dispatch]);

    const totalPages = Math.ceil(questions.length / pageSize);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return questions.slice(startIndex, endIndex);
    };

    const currentData = getCurrentPageData();

    return (
        <div className="container mt-5">
            <h2>Questions List</h2>
            <table className="table table-bordered table-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Question</th>
                    <th>Category</th>
                    <th>Type</th>
                    <th>Time Created</th>
                </tr>
                </thead>
                <tbody>
                {currentData.length > 0 ? (
                    currentData.map((question) => (
                        <tr key={question.questionId}>
                            <td>{question.questionId}</td>
                            <td>{question.questionText}</td>
                            <td>{question.categoryName}</td>
                            <td>{question.typeName}</td>
                            <td>{format(new Date(question.timeCreate), 'dd-MM-yyyy - HH:mm:ss')}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5">No data available</td>
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

export default QuestionList;
