import {format} from "date-fns";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import Page from "../../pages/Page";
import {DeleteQuestion, ListTeacherQuestion} from "../../../store/questionStore/QuestionAxios";
import Swal from "sweetalert2";
import {TailSpin} from "react-loader-spinner";

const ListTeacherQuestions = () => {
    const dispatch = useDispatch();
    const {questions, loading, error} = useSelector((state) => state.questions);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        dispatch(ListTeacherQuestion(userId))
    }, [dispatch]);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Bạn có chắc chắn muốn xóa câu hỏi này?',
            text: "Bạn sẽ không thể hoàn tác hành động này!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Có, xóa nó!',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(DeleteQuestion(id)).then(() => {
                    Swal.fire(
                        'Đã xóa!',
                        'Câu hỏi đã được xóa.',
                        'success'
                    );
                });
            }
        });
    };

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
        <div>
            <h2>Danh sách câu hỏi của giáo viên</h2>
            <table className="table table-bordered table-striped">
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Câu hỏi</th>
                    <th>Danh mục</th>
                    <th>Loại</th>
                    <th>Thời gian tạo</th>
                </tr>
                </thead>
                <tbody>
                {currentData.length > 0 ? (
                    currentData.map((question, index) => (
                        <tr key={question.questionId}>
                            <td>{(currentPage - 1) * pageSize + index + 1}</td>
                            <td>{question.questionText}</td>
                            <td>{question.categoryName}</td>
                            <td>{question.typeName}</td>
                            <td>{format(new Date(question.timeCreate), 'dd-MM-yyyy - HH:mm:ss')}</td>
                            <td>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(question.questionId)}
                                >
                                    Xóa
                                </button>
                            </td>
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

export default ListTeacherQuestions;
