import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {GetQuestionsByCategoryName} from "../../../store/questionStore/QuestionAxios";
import {TailSpin} from "react-loader-spinner";
import Swal from "sweetalert2";


const QuestionListByCategory = ({ categoryName, onQuestionSelect }) => {
    const dispatch = useDispatch();
    const { questions, loading, error } = useSelector((state) => state.questions);

    useEffect(() => {
        if (categoryName) {
            const userId = 2;
            dispatch(GetQuestionsByCategoryName({ categoryName, userId }));
        }
    }, [dispatch, categoryName]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <TailSpin color="#00BFFF" height={80} width={80} />
            </div>
        );
    }

    if (error) {
        Swal.fire('Lỗi', error, 'error');
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <ul className="list-group">
                {questions.map((question) => (
                    <li key={question.questionId} className="list-group-item d-flex align-items-center">
                        <input
                            type="checkbox"
                            className="me-3"
                            onChange={() => onQuestionSelect(question.questionId)}
                        />
                        {question.questionText} - Type: {question.questionTypeName}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuestionListByCategory;
