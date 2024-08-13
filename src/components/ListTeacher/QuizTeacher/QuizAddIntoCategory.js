import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {GetCategoriesByUserId} from "../../../store/categoryStore/CategoryAxios";
import Swal from "sweetalert2";
import {TailSpin} from "react-loader-spinner";
import {AddQuestionsToQuiz} from "../../../store/quizStore/QuizAxios";
import Page from "../../pages/Page";
import QuestionListByCategory from "./QuestionAddIntoQuiz";


const QuizAddIntoCategory = () => {
    const dispatch = useDispatch();
    // eslint-disable-next-line no-undef
    const { category, loading, error } = useSelector((state) => state.category);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(null); // State to track selected category
    const [selectedQuestions, setSelectedQuestions] = useState([]); // State to track selected questions
    const pageSize = 5;
    const quizId = sessionStorage.getItem('createdQuizId');

    useEffect(() => {
        const userId = 2;
        dispatch(GetCategoriesByUserId(userId));
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            Swal.fire('Lỗi', error, 'error');
        }
    }, [error]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <TailSpin color="#00BFFF" height={80} width={80} />
            </div>
        );
    }

    const totalPages = Math.ceil(category.length / pageSize);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return category.slice(startIndex, endIndex);
    };

    const currentData = getCurrentPageData();

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const handleQuestionSelect = (questionId) => {
        setSelectedQuestions((prevSelected) =>
            prevSelected.includes(questionId)
                ? prevSelected.filter(id => id !== questionId)
                : [...prevSelected, questionId]
        );
    };

    const handleAddQuestions = async () => {
        try {
            if (quizId && selectedQuestions.length > 0) {
                await dispatch(AddQuestionsToQuiz({ quizId, questionIds: selectedQuestions })).unwrap();
                Swal.fire({
                    icon: 'success',
                    title: 'Câu hỏi đã được thêm vào quiz!',
                    showConfirmButton: false,
                    timer: 1500
                });
                setSelectedQuestions([]);
            } else {
                Swal.fire('Chưa có câu hỏi được chọn', 'Vui lòng chọn câu hỏi trước khi thêm.', 'warning');
            }
        } catch (error) {
            Swal.fire('Lỗi', error.message, 'error');
        }
    };

    return (
        <div>
            <h2>Danh sách danh mục</h2>
            <table className="table table-bordered table-striped">
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Tên danh mục</th>
                    <th>Mô tả</th>
                    <th>Chi tiết</th>
                </tr>
                </thead>
                <tbody>
                {currentData.length > 0 ? (
                    currentData.map((cat, index) => (
                        <tr key={cat.categoryId}>
                            <td>{(currentPage - 1) * pageSize + index + 1}</td>
                            <td>{cat.categoryName}</td>
                            <td>{cat.categoryDescription}</td>
                            <td>
                                <button
                                    className="btn btn-info btn-sm"
                                    onClick={() => handleCategoryClick(cat)}
                                >
                                    Xem câu hỏi
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4">Không có dữ liệu</td>
                    </tr>
                )}
                </tbody>
            </table>
            <Page
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
            {selectedCategory && (
                <div className="mt-4">
                    <h3>Câu hỏi trong danh mục: {selectedCategory.categoryName}</h3>
                    <QuestionListByCategory
                        categoryName={selectedCategory.categoryName}
                        onQuestionSelect={handleQuestionSelect}
                    />
                    <button
                        className="btn btn-primary mt-3"
                        onClick={handleAddQuestions}
                    >
                        Thêm câu hỏi vào quiz
                    </button>
                </div>
            )}
        </div>
    );
};

export default QuizAddIntoCategory;
