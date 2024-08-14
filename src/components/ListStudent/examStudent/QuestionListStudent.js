import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {getQuestionsByQuizId} from '../../../store/questionStore/QuestionAxios';
import {endQuizForUser} from '../../../store/resultStore/ResultAxios';
import Swal from 'sweetalert2';
import axios from 'axios';
import {
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Container,
    FormControlLabel,
    Radio,
    RadioGroup,
    Typography
} from '@mui/material';
import Timer from './Timer'; // Import the Timer component

const QuestionListStudent = () => {
    const {quizId} = useParams();
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [selectedOptions, setSelectedOptions] = useState({});
    const [resultId, setResultId] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [initialTime, setInitialTime] = useState(null); // Initialize as null

    const questions = useSelector((state) => state.questions.questions);
    console.log(`this is question: ${questions}`);
    const status = useSelector((state) => state.questions.status);
    const error = useSelector((state) => state.questions.error);

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const resultIdFromQuery = queryParams.get('resultId');
        console.log('result id: ', resultIdFromQuery);

        if (resultIdFromQuery) {
            setResultId(resultIdFromQuery);
        } else {
            console.error('Result ID not found in query params');
        }

        dispatch(getQuestionsByQuizId(quizId));

        // Fetch initial time left from the API
        axios.get(`http://localhost:8080/quiz/${quizId}/time`)
            .then(response => {
                const quizTimeInMinutes = response.data.quizTime;
                setInitialTime(quizTimeInMinutes * 60); // Convert minutes to seconds
            })
            .catch(error => {
                console.error('Error fetching quiz time:', error);
            });
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
                })
                .catch((err) => {
                    console.log(resultId);
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

    const handleNextQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => Math.min(prevIndex + 1, questions.length - 1));
    };

    const handlePreviousQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    if (status === 'loading' || initialTime === null) {
        return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress/></Box>;
    }

    if (status === 'failed') {
        return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><Typography variant="h6"
                                                                                                          color="error">Error: {error}</Typography></Box>;
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <Container>
            <Box my={4}>
                <Timer initialTime={initialTime} onTimeUp={handleSubmit}/>
                <Typography variant="h4" className='text-center' gutterBottom>
                    Câu hỏi của Quiz {quizId}
                </Typography>
                {currentQuestion ? (
                    <Card sx={{width: '70%', margin: '0 auto'}}>
                        <CardContent>
                            <Typography variant="h6">{currentQuestion.questionText}</Typography>
                            <RadioGroup
                                name={`question-${currentQuestion.id}`}
                                value={selectedOptions[currentQuestion.id] || ''}
                                onChange={(e) => handleOptionChange(currentQuestion.id, Number(e.target.value))}
                            >
                                {currentQuestion.options.map((option) => (
                                    <FormControlLabel
                                        key={option.id}
                                        value={option.id}
                                        control={<Radio/>}
                                        label={option.optionText}
                                    />
                                ))}
                            </RadioGroup>
                        </CardContent> <Typography variant='h4' className='text-center'>
                        Câu số {currentQuestionIndex + 1} / {questions.length}
                    </Typography>
                    </Card>
                ) : (
                    <Typography variant="body1">Không có câu hỏi nào cho quiz này.</Typography>
                )}
                <Box mt={4} display="flex" alignItems="center" justifyContent="center" gap={2}>
                    <Button
                        variant="contained"
                        onClick={handlePreviousQuestion}
                        disabled={currentQuestionIndex === 0}
                        sx={{width: {xs: '100px', sm: '150px', md: '200px'}}}
                    >
                        Câu hỏi trước
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleNextQuestion}
                        disabled={currentQuestionIndex === questions.length - 1}
                        sx={{width: {xs: '100px', sm: '150px', md: '200px'}}}
                    >
                        Câu hỏi tiếp theo
                    </Button>
                </Box>

                <Box mt={4} display="flex" justifyContent="center">
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Nộp bài thi
                    </Button>
                </Box>

            </Box>
        </Container>
    );
};

export default QuestionListStudent;
