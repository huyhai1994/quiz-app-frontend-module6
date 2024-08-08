import {format} from "date-fns";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {ListQuiz} from "../../../store/quizStore/QuizAxios";
import Page from "../../pages/Page"; // Import component phân trang

const QuizList = () => {
    const dispatch = useDispatch();
    const {quizzes, loading, error} = useSelector((state) => state.quizzes);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    useEffect(() => {
        dispatch(ListQuiz());
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
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
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Creator Name</th>
                    <th>Creator Email</th>
                    <th>Time Created</th>
                </tr>
                </thead>
                <tbody>
                {currentData.length > 0 ? (
                    currentData.map((quiz) => (
                        <tr key={quiz.quizzesId}>
                            <td>{quiz.quizzesId}</td>
                            <td>{quiz.quizzesTitle}</td>
                            <td>{quiz.quizzesDescription}</td>
                            <td>{quiz.usersName}</td>
                            <td>{quiz.userEmail}</td>
                            <td>{format(new Date(quiz.quizzesTimeCreate), 'dd-MM-yyyy - HH:mm:ss')}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6">No data available</td>
                    </tr>
                )}
                </tbody>
            </table>

            <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                <Page
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default QuizList;
