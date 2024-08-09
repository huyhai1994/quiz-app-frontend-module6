import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Breadcrumb} from "antd";
import {ListQuestion} from "../../../store/questionStore/QuestionAxios";
import {format} from "date-fns";
import Page from "../../pages/Page"; // Import component phân trang
import './QuestionList.css'; // Import the CSS file

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

    const handleDelete = (questionId) => {
        // Implement the delete logic here
        console.log(`Delete question with ID: ${questionId}`);
    };

    const currentData = getCurrentPageData();

    return (
        <div>
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>Danh Sách</Breadcrumb.Item>
                <Breadcrumb.Item>Câu hỏi</Breadcrumb.Item>
            </Breadcrumb>
            <div className="container-fluid mt-5">
                <h1>Danh Sách Câu Hỏi</h1>
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Câu Hỏi</th>
                            <th>Danh Mục Câu Hỏi</th>
                            <th>Lựa Chọn (số lượng)</th>
                            <th>Thời gian tạo</th>
                            <th>Hành động</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentData.length > 0 ? (
                            currentData.map((question, index) => (
                                <tr key={question.questionId}>
                                    <td>{index + 1 + (currentPage - 1) * pageSize}</td>
                                    <td>{question.questionText}</td>
                                    <td>{question.categoryName}</td>
                                    <td>{question.typeName}</td>
                                    <td>{format(new Date(question.timeCreate), 'dd-MM-yyyy - HH:mm:ss')}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(question.questionId)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">No data available</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                    <Page
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default QuestionList;
