import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    CircularProgress,
    Container,
    FormControlLabel,
    Radio,
    RadioGroup,
    Typography
} from '@mui/material';
import {getQuestionsByQuizId} from '../../../store/questionStore/QuestionAxios';
import {endQuizForUser} from '../../../store/resultStore/ResultAxios';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import Swal from 'sweetalert2';
import Timer from "./Timer";
import SendIcon from '@mui/icons-material/Send';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import './QuestionListStudent.css';

const QuestionListStudent = () => {
    const {quizId} = useParams();
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [selectedOptions, setSelectedOptions] = useState({});
    const [resultId, setResultId] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [initialTime, setInitialTime] = useState(null);

    const questions = useSelector(state => state.questions.questions);
    const status = useSelector(state => state.questions.status);
    const error = useSelector(state => state.questions.error);

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const resultIdFromQuery = queryParams.get('resultId');
        setResultId(resultIdFromQuery);

        dispatch(getQuestionsByQuizId(quizId));
        axios.get(`http://localhost:8080/quiz/${quizId}/time`)
            .then(response => setInitialTime(response.data.quizTime * 60))
            .catch(error => console.error('Error fetching quiz time:', error));
    }, [dispatch, quizId, location.search]);

    const handleOptionChange = useCallback((questionId, optionId, isMultiple) => {
        setSelectedOptions(prev => {
            if (isMultiple) {
                const currentSelections = prev[questionId] || {};
                return {
                    ...prev,
                    [questionId]: {
                        ...currentSelections,
                        [optionId]: !currentSelections[optionId]
                    }
                };
            }
            return {...prev, [questionId]: optionId};
        });
    }, []);

    const handleSubmit = () => {
        if (resultId) {
            const userAnswers = Object.entries(selectedOptions).flatMap(([questionId, answer]) => {
                if (typeof answer === 'object') {
                    return Object.entries(answer).filter(([, selected]) => selected).map(([optionId]) => ({
                        userId,
                        questionId: Number(questionId),
                        optionId: Number(optionId)
                    }));
                }
                return [{userId, questionId: Number(questionId), optionId: answer}];
            });

            dispatch(endQuizForUser({resultId: Number(resultId), userAnswers}))
                .unwrap()
                .then(() => {
                    Swal.fire('Thành công!', 'Thi kết thúc thành công!', 'success')
                        .then(() => navigate(`/student/result/new/${resultId}`));
                })
                .catch(err => Swal.fire('Lỗi!', `Không thể kết thúc thi: ${err.message}`, 'error'));
        } else {
            Swal.fire('Lỗi!', 'Result ID không có sẵn', 'error');
        }
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
            <Box display="flex" justifyContent="space-between" alignItems="flex-start" minHeight="100vh" my={4}>
                <Box className='question-container' flex="1" mr={2}>
                    <Timer initialTime={initialTime} onTimeUp={handleSubmit}/>
                    <Typography variant="h4" className='text-center' gutterBottom>
                        Câu hỏi của Quiz {quizId}
                    </Typography>
                    {currentQuestion ? (
                        <Card sx={{width: '70%', margin: '0 auto'}}>
                            <CardContent>
                                <Typography variant="h6">{currentQuestion.questionText}</Typography>
                                {currentQuestion.typeName === 'MANY' ? (
                                    <Box>
                                        {currentQuestion.options.map(option => (
                                            <FormControlLabel
                                                key={option.id}
                                                control={
                                                    <Checkbox
                                                        checked={!!selectedOptions[currentQuestion.id]?.[option.id]}
                                                        onChange={() => handleOptionChange(currentQuestion.id, option.id, true)}
                                                        icon={<RadioButtonUncheckedIcon/>}
                                                        checkedIcon={<RadioButtonCheckedIcon/>}
                                                    />
                                                }
                                                label={option.optionText}
                                            />
                                        ))}
                                    </Box>
                                ) : (
                                    <RadioGroup
                                        name={`question-${currentQuestion.id}`}
                                        value={selectedOptions[currentQuestion.id] || ''}
                                        onChange={(e) => handleOptionChange(currentQuestion.id, Number(e.target.value), false)}
                                    >
                                        {currentQuestion.options.map(option => (
                                            <FormControlLabel
                                                key={option.id}
                                                value={option.id}
                                                control={<Radio icon={<RadioButtonUncheckedIcon/>}
                                                                checkedIcon={<RadioButtonCheckedIcon/>}/>}
                                                label={option.optionText}
                                            />
                                        ))}
                                    </RadioGroup>
                                )}
                            </CardContent>
                            <Typography variant='h4' className='text-center'>
                                Câu số {currentQuestionIndex + 1} / {questions.length}
                            </Typography>
                        </Card>
                    ) : (
                        <Typography variant="body1">Không có câu hỏi nào cho quiz này.</Typography>
                    )}
                    <Box mt={5} display="flex" justifyContent="center">
                        <Button variant="contained" onClick={handleSubmit} className='btn-submit' endIcon={<SendIcon/>}>
                            Nộp bài thi
                        </Button>
                    </Box>
                </Box>
                <Box className='paginating-container' flex="0 0 300px" display="flex" flexDirection="column"
                     justifyContent="center" alignItems="center" height="100%">
                    <Box className='shadow p-3 d-flex align-items-center justify-content-center' display="flex"
                         flexWrap="wrap" gap={1} sx={{marginTop: 'calc(50vh - 200px)'}}>
                        {questions.map((_, index) => (
                            <Button
                                key={index}
                                variant={index === currentQuestionIndex ? "contained" : "outlined"}
                                onClick={() => setCurrentQuestionIndex(index)}
                                size="large"
                                sx={{
                                    backgroundColor: index === currentQuestionIndex ? 'var(--color-primary)' : 'inherit',
                                    color: index === currentQuestionIndex ? '#fff' : 'inherit',
                                    '&:hover': {
                                        backgroundColor: index === currentQuestionIndex ? 'var(--color-primary)' : 'rgba(0, 0, 0, 0.04)',
                                    }
                                }}
                            >
                                {index + 1}
                            </Button>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default QuestionListStudent;
