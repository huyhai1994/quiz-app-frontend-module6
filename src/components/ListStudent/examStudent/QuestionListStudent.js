import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {getQuestionsByQuizId} from '../../../store/questionStore/QuestionAxios';
import {endQuizForUser} from '../../../store/resultStore/ResultAxios';
import Swal from 'sweetalert2'; // Import SweetAlert2

const QuestionListStudent = () => {
    const {quizId} = useParams();
    const location = useLocation();
    const dispatch = useDispatch();
    const [selectedOptions, setSelectedOptions] = useState({});
    const [resultId, setResultId] = useState(null);
    const navigate = useNavigate();

    const questions = useSelector((state) => state.questions.questions);
    const status = useSelector((state) => state.questions.status);
    const error = useSelector((state) => state.questions.error);
    const userId = useSelector((state) => state.users.users.userId);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const resultIdFromQuery = queryParams.get('resultId');
        if (resultIdFromQuery) {
            setResultId(resultIdFromQuery);
        } else {
            console.error('Result ID not found in query params');
        }


        dispatch(getQuestionsByQuizId(quizId));
    }, [dispatch, quizId, location.search]);

    const handleOptionChange = useCallback((questionId, optionId) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [questionId]: optionId
        }));
    }, []);

    const handleSubmit = () => {
        if (resultId) {
            dispatch(endQuizForUser({
                resultId: Number(resultId),
                userAnswers: Object.keys(selectedOptions).map(questionId => ({
                    userId,
                    questionId: Number(questionId),
                    optionId: selectedOptions[questionId]
                }))
            }))
                .unwrap()
                .then(() => {
                    Swal.fire({
                        title: 'Thành công!',
                        text: 'Thi kết thúc thành công!',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    navigate(`/result/new/${resultId}`);
                })
                .catch((err) => {
                    Swal.fire({
                        title: 'Lỗi!',
                        text: `Không thể kết thúc thi: ${err.message}`,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                });
        } else {
            Swal.fire({
                title: 'Lỗi!',
                text: 'Result ID không có sẵn',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Câu hỏi của Quiz {quizId}</h1>
            <ul>
                {questions.length > 0 ? (
                    questions.map((question) => (
                        <li key={question.id}>
                            {question.questionText}
                            <ul>
                                {question.options.map((option) => (
                                    <li key={option.id}>
                                        <label>
                                            <input
                                                type="radio"
                                                name={`question-${question.id}`}
                                                value={option.id}
                                                checked={selectedOptions[question.id] === option.id}
                                                onChange={() => handleOptionChange(question.id, option.id)}
                                            />
                                            {option.optionText}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))
                ) : (
                    <p>Không có câu hỏi nào cho quiz này.</p>
                )}
            </ul>
            <button onClick={handleSubmit}>Nộp bài thi</button>
        </div>
    );
};

export default QuestionListStudent;
