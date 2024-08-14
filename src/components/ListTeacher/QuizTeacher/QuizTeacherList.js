import {format} from 'date-fns';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ListTeacherQuizzes} from "../../../store/quizStore/QuizAxios";
import Page from "../../pages/Page";
import Swal from "sweetalert2";
import {TailSpin} from "react-loader-spinner";

const ListTeacherQuizzesComponent = () => {
    const dispatch = useDispatch();
    const {quizzes, loading, error} = useSelector((state) => state.quizzes);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        dispatch(ListTeacherQuizzes(userId));
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            Swal.fire('Lỗi', error, 'error');
        }
    }, [error]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
                <TailSpin color="#00BFFF" height={80} width={80}/>
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
            <h2>Danh sách bài kiểm tra của giáo viên</h2>
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
                    currentData.map((quiz, index) => {
                        const timeCreate = new Date(quiz.quizzesTimeCreate);
                        const formattedDate = isNaN(timeCreate.getTime()) ? 'N/A' : format(timeCreate, 'dd-MM-yyyy - HH:mm:ss');
                        return (
                            <tr key={quiz.quizzesId}>
                                <td>{(currentPage - 1) * pageSize + index + 1}</td>
                                <td>{quiz.quizzesTitle}</td>
                                <td>{quiz.quizzesDescription}</td>
                                <td>{quiz.usersName}</td>
                                <td>{formattedDate}</td>
                            </tr>
                        );
                    })
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
