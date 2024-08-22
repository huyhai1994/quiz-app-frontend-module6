import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ListQuizStudent} from '../../../store/quizStore/QuizAxios';
import {useNavigate} from 'react-router-dom';
import {startQuizForUser} from "../../../store/resultStore/ResultAxios";
import {Alert, Button, Pagination, Spin} from 'antd'; // Import Pagination from Ant Design
import {Card, Container} from 'react-bootstrap';
import './QuizListStudent.css';

const placeholderImage = 'https://www.shutterstock.com/shutterstock/photos/2052894734/display_1500/stock-vector-quiz-and-question-marks-trivia-night-quiz-symbol-neon-sign-night-online-game-with-questions-2052894734.jpg';

const QuizListStudent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const quizzes = useSelector((state) => state.quizzes.quizzes);
    const status = useSelector((state) => state.quizzes.loading);
    const error = useSelector((state) => state.quizzes.error);
    const [resultId, setResultId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // State for the current page
    const [quizzesPerPage] = useState(8); // Number of quizzes per page
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
                console.error('Failed to start quiz-room:', err.message);
            });
    };

    if (status === 'loading') {
        return <Spin tip="Loading..."/>;
    }

    if (error) {
        return <Alert message="Error" description={error} type="error" showIcon/>;
    }
    // Get current quizzes
    const indexOfLastQuiz = currentPage * quizzesPerPage;
    const indexOfFirstQuiz = indexOfLastQuiz - quizzesPerPage;
    const currentQuizzes = quizzes.slice(indexOfFirstQuiz, indexOfLastQuiz);
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (<Container>
        <div className="quiz-list">
            <div className="quiz-grid">
                {currentQuizzes.map((quiz) => (
                    <Card key={quiz.id} className='mx-3' onClick={() => handleStartQuiz(quiz.id)}
                          style={{cursor: 'pointer'}}>
                        <Card.Img
                            variant="top"
                            src={quiz.image || placeholderImage}
                            alt={quiz.title}
                            className="card-img-top"
                        />
                        <Card.Body>
                            <Card.Title>{quiz.title}</Card.Title>
                            <Card.Text>{quiz.quantity} câu hỏi</Card.Text>
                            <Button type="primary" className='btn button-start'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleStartQuiz(quiz.id);
                                    }}>
                                Bắt đầu thi
                            </Button>
                        </Card.Body>
                    </Card>))}
            </div>
            <div className="pagination-container">
                <Pagination
                    current={currentPage}
                    total={quizzes.length}
                    pageSize={quizzesPerPage}
                    onChange={paginate}
                />
            </div>
        </div>
    </Container>);
};

export default QuizListStudent;