import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import {Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from '@mui/material';
import './QuizComponent.css';

const QuizComponent = () => {
    const [timeLeft, setTimeLeft] = useState(300); // 300 seconds = 5 minutes
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = 4; // Assume you have 4 pages/questions

    useEffect(() => {
        if (timeLeft <= 0) {
            // Handle what happens when the timer reaches 0, like auto-submitting the quiz-room
            return;
        }

        const intervalId = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(intervalId); // Clear interval on component unmount
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <Container fluid className="p-4">
            <Row className="mb-4">
                <Col className="text-center">
                    <h5>Thời gian còn lại: {formatTime(timeLeft)}</h5>
                </Col>
            </Row>
            <Row>
                <Col md={8} className="border rounded p-4 bg-white">
                    <h4>SCX - Scrum Essence</h4>
                    <p>Question {currentPage}</p>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">
                            {currentPage === 1 && "Nhiệm vụ chính yếu của Nhóm Phát triển trong một Sprint là gì?"}
                            {currentPage === 2 && "Câu hỏi thứ 2 - Nội dung gì?"}
                            {currentPage === 3 && "Câu hỏi thứ 3 - Nội dung gì?"}
                            {currentPage === 4 && "Câu hỏi thứ 4 - Nội dung gì?"}
                        </FormLabel>
                        <RadioGroup aria-label="quiz" name="quiz">
                            {currentPage === 1 && (
                                <>
                                    <FormControlLabel value="a" control={<Radio/>}
                                                      label="Thực hiện các yêu cầu của Product Owner"/>
                                    <FormControlLabel value="b" control={<Radio/>}
                                                      label="Thực hiện các yêu cầu của Scrum Master"/>
                                    <FormControlLabel value="c" control={<Radio/>} label="Lập kế hoạch"/>
                                    <FormControlLabel value="d" control={<Radio/>}
                                                      label="Chuyển giao phần tăng trưởng ở cuối Sprint"/>
                                </>
                            )}
                            {currentPage === 2 && (
                                <>
                                    <FormControlLabel value="a" control={<Radio/>}
                                                      label="Lựa chọn thứ nhất cho câu hỏi 2"/>
                                    <FormControlLabel value="b" control={<Radio/>}
                                                      label="Lựa chọn thứ hai cho câu hỏi 2"/>
                                    <FormControlLabel value="c" control={<Radio/>}
                                                      label="Lựa chọn thứ ba cho câu hỏi 2"/>
                                    <FormControlLabel value="d" control={<Radio/>}
                                                      label="Lựa chọn thứ tư cho câu hỏi 2"/>
                                </>
                            )}
                            {currentPage === 3 && (
                                <>
                                    <FormControlLabel value="a" control={<Radio/>}
                                                      label="Lựa chọn thứ nhất cho câu hỏi 3"/>
                                    <FormControlLabel value="b" control={<Radio/>}
                                                      label="Lựa chọn thứ hai cho câu hỏi 3"/>
                                    <FormControlLabel value="c" control={<Radio/>}
                                                      label="Lựa chọn thứ ba cho câu hỏi 3"/>
                                    <FormControlLabel value="d" control={<Radio/>}
                                                      label="Lựa chọn thứ tư cho câu hỏi 3"/>
                                </>
                            )}
                            {currentPage === 4 && (
                                <>
                                    <FormControlLabel value="a" control={<Radio/>}
                                                      label="Lựa chọn thứ nhất cho câu hỏi 4"/>
                                    <FormControlLabel value="b" control={<Radio/>}
                                                      label="Lựa chọn thứ hai cho câu hỏi 4"/>
                                    <FormControlLabel value="c" control={<Radio/>}
                                                      label="Lựa chọn thứ ba cho câu hỏi 4"/>
                                    <FormControlLabel value="d" control={<Radio/>}
                                                      label="Lựa chọn thứ tư cho câu hỏi 4"/>
                                </>
                            )}
                        </RadioGroup>
                    </FormControl>
                </Col>
                <Col md={4} className="border rounded p-4 bg-white">
                    <h5>Bảng câu hỏi</h5>
                    {[...Array(totalPages)].map((_, index) => (
                        <Button
                            key={index + 1}
                            variant="outlined"
                            className="m-2"
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </Button>
                    ))}
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <Box display="flex" justifyContent="center" sx={{mx: '20px'}}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            sx={{mx: 1, width: '10rem'}}
                        >
                            Trang Trước
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            sx={{mx: 1, width: '10rem'}}
                        >
                            Trang Tiếp
                        </Button>
                    </Box>
                </Col>
            </Row>
        </Container>
    );
};

export default QuizComponent;
