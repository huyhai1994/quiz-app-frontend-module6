import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {getQuestionsByQuizId} from '../../../store/questionStore/QuestionAxios';
import {useDispatch, useSelector} from 'react-redux';
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
import {endQuizForUser} from '../../../store/resultStore/ResultAxios';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import Swal from 'sweetalert2';
import Timer from "./Timer";
import SendIcon from '@mui/icons-material/Send';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './QuestionListStudent.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

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
    const status = useSelector((state) => state.questions.status);
    const error = useSelector((state) => state.questions.error);

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const resultIdFromQuery = queryParams.get('resultId');
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
                    }).then(() => {
                        navigate(`/student/result/new/${resultId}`);
                    });
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

    if (status === 'loading' || initialTime === null) {
        return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress/></Box>;
    }

    if (status === 'failed') {
        return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><Typography variant="h6"
                                                                                                          color="error">Error: {error}</Typography></Box>;
    }

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: currentQuestionIndex,
        afterChange: (current) => setCurrentQuestionIndex(current),
        nextArrow: <ArrowForwardIosIcon/>,
        prevArrow: <ArrowBackIosIcon/>
    };

    return (
        <Container>
            <Box my={4}>
                <Timer initialTime={initialTime} onTimeUp={handleSubmit}/>
                <Typography variant="h4" className='text-center' gutterBottom>
                    Câu hỏi của Quiz {quizId}
                </Typography>
                {questions.length > 0 ? (
                    <Slider {...settings}>
                        {questions.map((question, index) => (
                            <div key={question.id}>
                                <Card sx={{width: '70%', margin: '0 auto'}}>
                                    <CardContent>
                                        <Typography variant="h6">{question.questionText}</Typography>
                                        <RadioGroup
                                            name={`question-${question.id}`}
                                            value={selectedOptions[question.id] || ''}
                                            onChange={(e) => handleOptionChange(question.id, Number(e.target.value))}
                                        >
                                            {question.options.map((option) => (
                                                <FormControlLabel
                                                    key={option.id}
                                                    value={option.id}
                                                    control={<Radio
                                                        icon={<RadioButtonUncheckedIcon/>}
                                                        checkedIcon={<RadioButtonCheckedIcon/>}
                                                    />}
                                                    label={option.optionText}
                                                    className={`option-label ${selectedOptions[question.id] === option.id ? 'selected' : ''}`}
                                                />
                                            ))}
                                        </RadioGroup>
                                    </CardContent>
                                    <Typography variant='h4' className='text-center'>
                                        Câu số {index + 1} / {questions.length}
                                    </Typography>
                                </Card>
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <Typography variant="body1">Không có câu hỏi nào cho quiz này.</Typography>
                )}

                <Box mt={5} display="flex" justifyContent="center">
                    <Button variant="contained"
                            onClick={handleSubmit}
                            className='btn-submit'
                            endIcon={<SendIcon/>}>
                        Nộp bài thi
                    </Button>
                </Box>

            </Box>
        </Container>
    );
};

export default QuestionListStudent;