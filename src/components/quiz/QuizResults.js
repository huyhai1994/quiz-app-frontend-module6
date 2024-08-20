import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Typography, Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const QuizResults = () => {
    const { quizId } = useParams();
    const navigate = useNavigate();
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/quiz-rooms/${quizId}/results`);
                const data = await response.json();
                setResults(data);
            } catch (error) {
                console.error('Error fetching results:', error);
            }
        };
        fetchResults();
    }, [quizId]);

    const handleRestartQuiz = async () => {
        try {
            await fetch(`http://localhost:8080/api/quiz-rooms/${quizId}/restart`, { method: 'POST' });
            navigate(`/teacher/quiz/${quizId}/room`);
        } catch (error) {
            console.error('Error restarting quiz:', error);
        }
    };

    return (
        <Box>
            <Typography variant="h4">Kết quả bài thi</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Người chơi</TableCell>
                        <TableCell>Câu trả lời đúng</TableCell>
                        <TableCell>Câu trả lời sai</TableCell>
                        <TableCell>Điểm số</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {results.map((result) => (
                        <TableRow key={result.userId}>
                            <TableCell>{result.userName}</TableCell>
                            <TableCell>{result.correctAnswers}</TableCell>
                            <TableCell>{result.incorrectAnswers}</TableCell>
                            <TableCell>{result.score}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button variant="contained" color="primary" onClick={handleRestartQuiz}>
                Bắt đầu lại
            </Button>
        </Box>
    )
}

export default QuizResults