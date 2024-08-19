import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import { ListTeacherQuizzes } from "../../../store/quizStore/QuizAxios";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Page from "../../pages/Page";

const ListTeacherQuizzesComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { quizzes, loading, error } = useSelector((state) => state.quizzes);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        dispatch(ListTeacherQuizzes(2));
    }, [dispatch, 2]);

    useEffect(() => {
        if (error) {
            Swal.fire('Lỗi', error, 'error');
        }
    }, [error]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleViewHistory = (quizId) => {
        navigate(`/teacher/quizzes/${quizId}/user-history`);
    };

    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return quizzes.slice(startIndex, endIndex);
    };

    const currentData = getCurrentPageData();

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <TailSpin color="#00BFFF" height={80} width={80} />
            </div>
        );
    }

    return (
        <div>
            <h2>Danh sách bài kiểm tra của giáo viên</h2>
            <table className="table table-bordered table-striped">
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Tiêu đề</th>
                    <th>Mô tả</th>
                    <th>Thời gian tạo</th>
                    <th>Thời gian làm bài(phút)</th>
                    <th>Số lượng</th>
                    <th>Điểm đạt</th>
                    <th>Độ khó</th>
                    <th>Hành động</th>
                </tr>
                </thead>
                <tbody>
                {currentData.length > 0 ? (
                    currentData.map((quiz, index) => {
                        const timeCreate = new Date(quiz.quizzesTimeCreate);
                        const formattedDate = isNaN(timeCreate.getTime()) ? 'N/A' : format(timeCreate, 'dd-MM-yyyy - HH:mm:ss');
                        return (
                            <tr key={quiz.quizzesId}>
                                <td>{(currentPage - 1) * pageSize + index + 1}</td>
                                <td>{quiz.quizzesTitle}</td>
                                <td>{quiz.quizzesDescription}</td>
                                <td>{formattedDate}</td>
                                <td>{quiz.quizTime}</td>
                                <td>{quiz.quantity}</td>
                                <td>{quiz.passingScore}</td>
                                <td>{quiz.difficulty}</td>
                                <td>
                                    <button
                                        className="btn btn-info"
                                        onClick={() => handleViewHistory(quiz.quizzesId)}
                                    >
                                        Xem lịch sử
                                    </button>
                                </td>
                            </tr>
                        );
                    })
                ) : (
                    <tr>
                        <td colSpan="9">Không có dữ liệu</td>
                    </tr>
                )}
                </tbody>
            </table>
            <Page
                currentPage={currentPage}
                totalPages={Math.ceil(quizzes.length / pageSize)}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default ListTeacherQuizzesComponent;
