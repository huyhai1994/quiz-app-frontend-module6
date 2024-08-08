import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { ListQuiz } from "../../../store/quizStore/QuizAxios";
import Page from "../../pages/Page";
import { TailSpin } from 'react-loader-spinner';

const QuizList = () => {
    const dispatch = useDispatch();
    const { quizzes, loading, error } = useSelector((state) => state.quizzes);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    useEffect(() => {
        dispatch(ListQuiz());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Đã có lỗi xảy ra!',
                footer: `<p>${error}</p>`
            });
        }
    }, [error]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <TailSpin color="#00BFFF" height={80} width={80} />
            </div>
        );
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
            <h2>Quiz List</h2>
            <table className="table table-bordered table-striped">
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Tiêu đề</th>
                    <th>Mô tả</th>
                    <th>Người tạo</th>
                    <th>Email người tạo</th>
                    <th>Thời gian tạo</th>
                </tr>
                </thead>
                <tbody>
                {currentData.length > 0 ? (
                    currentData.map((quiz , index) => (
                        <tr key={quiz.quizzesId}>
                            <td>{(currentPage - 1) * pageSize + index + 1}</td>
                            <td>{quiz.quizzesTitle}</td>
                            <td>{quiz.quizzesDescription}</td>
                            <td>{quiz.usersName}</td>
                            <td>{quiz.userEmail}</td>
                            <td>{format(new Date(quiz.quizzesTimeCreate), 'dd-MM-yyyy - HH:mm:ss')}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6">Không có dữ liệu</td>
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

export default QuizList;
