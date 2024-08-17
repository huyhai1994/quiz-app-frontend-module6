import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ListQuizStudent} from '../../../store/quizStore/QuizAxios';
import {useNavigate} from 'react-router-dom';
import {startQuizForUser} from "../../../store/resultStore/ResultAxios";
import {Alert, Button, Spin} from 'antd';
import {Card, Container} from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import './quizlist.css';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeft from '@mui/icons-material/ChevronLeft';

// Placeholder image URL
const placeholderImage = 'https://www.shutterstock.com/shutterstock/photos/2052894734/display_1500/stock-vector-quiz-and-question-marks-trivia-night-quiz-symbol-neon-sign-night-online-game-with-questions-2052894734.jpg';
const CustomLeftArrow = ({ onClick }) => (
   <ChevronLeft color="secondary" onClick={() => onClick()} className="custom-left-arrow" />
);
const CustomRightArrow = ({ onClick }) => {
    return <ChevronRightIcon color="secondary" onClick={() => onClick()} className="custom-right-arrow" />
};
const QuizListStudent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const quizzes = useSelector((state) => state.quizzes.quizzes);
    const status = useSelector((state) => state.quizzes.loading);
    const error = useSelector((state) => state.quizzes.error);
    const [resultId, setResultId] = useState(null);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        dispatch(ListQuizStudent());
    }, [dispatch, userId]);

    const handleStartQuiz = (quizId) => {
        dispatch(startQuizForUser({userId, quizId}))
            .unwrap()
            .then((result) => {
                if (result) {
                    setResultId(result.id);
                    navigate(`/student/quizzes/${quizId}/start?resultId=${result.id}`);
                } else {
                    console.error('Result ID is missing in the API response');
                }
            })
            .catch((err) => {
                console.error('Failed to start quiz:', err.message);
            });
    };

    if (status === 'loading') {
        return <Spin tip="Loading..."/>;
    }

    if (error) {
        return <Alert message="Error" description={error} type="error" showIcon/>;
    }

    const responsive = {
        superLargeDesktop: {
            breakpoint: {max: 4000, min: 1024},
            items: 3
        },
        desktop: {
            breakpoint: {max: 1024, min: 768},
            items: 3
        },
        tablet: {
            breakpoint: {max: 768, min: 464},
            items: 2
        },
        mobile: {
            breakpoint: {max: 464, min: 0},
            items: 1
        }
    };

    return (
        <Container>
            <h1>Danh sách các bài thi</h1>
            <Carousel arrows={true} customLeftArrow={<CustomLeftArrow />} customRightArrow={<CustomRightArrow />} responsive={responsive}>
                {quizzes.map((quiz) => (
                    <div key={quiz.id}>
                        <Card className='mx-3' onClick={() => handleStartQuiz(quiz.id)} style={{cursor: 'pointer'}}>
                            <Card.Img
                                variant="top"
                                src={quiz.image || placeholderImage}
                                alt={quiz.title}
                                style={{width: '100%', height: '200px', objectFit: 'cover'}}
                            />
                            <Card.Body>
                                <Card.Title>{quiz.title}</Card.Title>
                                <Card.Text>{quiz.quantity} câu hỏi</Card.Text>
                                <Button type="primary" className='btn button-start'
                                        onClick={() => handleStartQuiz(quiz.id)}>
                                    Bắt đầu thi
                                </Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </Carousel>
        </Container>
    );
};

export default QuizListStudent;