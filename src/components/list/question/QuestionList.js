import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListQuestion, SearchQuestions } from "../../../store/questionStore/QuestionAxios";
import { format } from "date-fns";
import Page from "../../pages/Page";
import { TailSpin } from 'react-loader-spinner';
import Swal from 'sweetalert2';

const QuestionList = () => {
    const dispatch = useDispatch();
    const { questions, loading, error } = useSelector((state) => state.questions);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const pageSize = 5;

    useEffect(() => {
        dispatch(ListQuestion());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            Swal.fire({
                icon: 'error', title: 'Oops...', text: 'Đã có lỗi xảy ra!', footer: `<p>${error}</p>`
            });
        }
    }, [error]);

    const handleSearch = () => {
        dispatch(SearchQuestions(searchTerm));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    };

    // Simulate the error by adding an invalid date to the questions array
    const simulatedQuestions = [...questions, {
        questionId: 'invalid-date',
        questionText: 'This is a question with an invalid date',
        categoryName: 'Category',
        typeName: 'Type',
        timeCreate: 'invalid-date-string' // Invalid date string
    }];

    const totalPages = Math.ceil(simulatedQuestions.length / pageSize);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return simulatedQuestions.slice(startIndex, endIndex);
    };

    const currentData = getCurrentPageData();

    if (loading) {
        return (<div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <TailSpin color="#00BFFF" height={80} width={80} />
        </div>);
    }

    return (<div className="container mt-5">
        <h2>Danh sách câu hỏi</h2>
        <div className="mb-3 d-flex">
            <div className="flex-grow-1">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Tìm kiếm theo danh mục hoặc câu hỏi"
                    className="form-control"
                />
            </div>
            <button className="btn btn-primary ms-2" onClick={handleSearch}>
                Tìm kiếm
            </button>
        </div>
        <table className="table table-bordered table-striped">
            <thead>
            <tr>
                <th>STT</th>
                <th>Câu hỏi</th>
                <th>Danh mục</th>
                <th>Loại</th>
                <th>Thời gian tạo</th>
                <th>Thao tác</th>
            </tr>
            </thead>
            <tbody>
            {currentData.length > 0 ? (currentData.map((question, index) => {
                const date = new Date(question.timeCreate);
                const formattedDate = isNaN(date) || !question.timeCreate ? 'Invalid date' : format(date, 'dd-MM-yyyy - HH:mm:ss');
                return (<tr key={question.questionId}>
                    <td>{(currentPage - 1) * pageSize + index + 1}</td>
                    <td>{question.questionText}</td>
                    <td>{question.categoryName}</td>
                    <td>{question.typeName}</td>
                    <td>{formattedDate}</td>
                </tr>);
            })) : (<tr>
                <td colSpan="6">Không có dữ liệu</td>
            </tr>)}
            </tbody>
        </table>
        <Page
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
        />
    </div>);
};

export default QuestionList;
