import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Page from "../../pages/Page";
import {ListTeacherQuestion} from "../../../store/questionStore/QuestionAxios";

const ListTeacherQuestions = () => {
    const dispatch = useDispatch();
    const { questions, loading, error } = useSelector((state) => state.questions);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    useEffect(() => {
        const userId = 2;
        dispatch(ListTeacherQuestion(userId));
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
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
            <h2>Teacher Questions List</h2>
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
