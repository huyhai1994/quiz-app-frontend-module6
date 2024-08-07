import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListQuestion, SearchQuestions } from "../../../store/questionStore/QuestionAxios";
import { format } from "date-fns";
import Page from "../../pages/Page";

const QuestionList = () => {
    const dispatch = useDispatch();
    const questions = useSelector((state) => state.questions.questions);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchCategory, setSearchCategory] = useState("");
    const [searchQuestion, setSearchQuestion] = useState("");
    const pageSize = 5;
    const searchButtonRef = useRef(null);

    useEffect(() => {
        dispatch(ListQuestion());
    }, [dispatch]);

    const handleSearch = () => {
        dispatch(SearchQuestions({ category: searchCategory, question: searchQuestion }));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (searchButtonRef.current) {
                searchButtonRef.current.click();
            }
        }
    };

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
            <h2>Danh sách câu hỏi</h2>
            <div className="mb-3 d-flex">
                <div className="me-2 flex-grow-1">
                    <input
                        type="text"
                        value={searchQuestion}
                        onChange={(e) => setSearchQuestion(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Tìm kiếm theo câu hỏi"
                        className="form-control"
                    />
                </div>
                <div className="me-2 flex-grow-1">
                    <input
                        type="text"
                        value={searchCategory}
                        onChange={(e) => setSearchCategory(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Tìm kiếm theo danh mục"
                        className="form-control"
                    />
                </div>
                <button
                    className="btn btn-primary"
                    onClick={handleSearch}
                    ref={searchButtonRef}
                >
                    Tìm kiếm
                </button>
            </div>
            <table className="table table-bordered table-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Câu hỏi</th>
                    <th>Danh mục</th>
                    <th>Loại</th>
                    <th>Thời gian tạo</th>
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

export default QuestionList;
