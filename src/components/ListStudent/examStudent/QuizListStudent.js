import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ListQuizStudent} from '../../../store/quizStore/QuizAxios';
import {useNavigate} from 'react-router-dom';
import {startQuizForUser} from "../../../store/resultStore/ResultAxios";
import {Alert, Button, Spin} from 'antd';
import {Card, Col, Container, Pagination, Row} from 'react-bootstrap';

// Placeholder image URL
const placeholderImage = 'https://www.shutterstock.com/shutterstock/photos/2052894734/display_1500/stock-vector-quiz-and-question-marks-trivia-night-quiz-symbol-neon-sign-night-online-game-with-questions-2052894734.jpg';

const QuizListStudent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const quizzes = useSelector((state) => state.quizzes.quizzes);
    const status = useSelector((state) => state.quizzes.loading);
    const error = useSelector((state) => state.quizzes.error);
    const [resultId, setResultId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const quizzesPerPage = 4;
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
                    navigate(`${quizId}/start?resultId=${result.id}`);
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

    // Calculate the quizzes to display based on the current page
    const indexOfLastQuiz = currentPage * quizzesPerPage;
    const indexOfFirstQuiz = indexOfLastQuiz - quizzesPerPage;
    const currentQuizzes = quizzes.slice(indexOfFirstQuiz, indexOfLastQuiz);

    // Calculate the total number of pages
    const totalPages = Math.ceil(quizzes.length / quizzesPerPage);

    // Add blank default cards if there are fewer than 4 quizzes on the current page
    const blankCardsCount = quizzesPerPage - currentQuizzes.length;
    const blankCards = Array.from({length: blankCardsCount}, (_, index) => (
        <Col key={`blank-${index}`} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card>
                <Card.Img
                    variant="top"
                    src={placeholderImage}
                    alt="Blank card"
                    style={{width: '100%', height: '200px', objectFit: 'cover'}}
                />
                <Card.Body>
                    <Card.Title>Blank Card</Card.Title>
                    <Card.Text>No quiz available</Card.Text>
                    <Button type="primary" disabled>
                        Bắt đầu thi
                    </Button>
                </Card.Body>
            </Card>
        </Col>));

    return (<Container>
        <h1>Danh sách các bài thi</h1>
        <Row>
            {currentQuizzes.map((quiz) => (<Col key={quiz.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <Card>
                    <Card.Img
                        variant="top"
                        src={quiz.image || placeholderImage}
                        alt={quiz.title}
                        style={{width: '100%', height: '200px', objectFit: 'cover'}}
                    />
                    <Card.Body>
                        <Card.Title>{quiz.title}</Card.Title>
                        <Card.Text>{quiz.quantity} câu hỏi</Card.Text>
                        <Button type="primary" onClick={() => handleStartQuiz(quiz.id)}>
                            Bắt đầu thi
                        </Button>
                    </Card.Body>
                </Card>
            </Col>))}
            {blankCards}
        </Row>
        <Pagination className="justify-content-center mt-4">
            <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1}/>
            <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                             disabled={currentPage === 1}/>
            {[...Array(totalPages).keys()].map(number => (
                <Pagination.Item key={number + 1} active={number + 1 === currentPage}
                                 onClick={() => setCurrentPage(number + 1)}>
                    {number + 1}
                </Pagination.Item>))}
            <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                             disabled={currentPage === totalPages}/>
            <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}/>
        </Pagination>
    </Container>);
};

export default QuizListStudent;
