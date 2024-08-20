import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const QuizActive = () => {
    const { quizId } = useParams();
    const navigate = useNavigate();
    const [stompClient, setStompClient] = useState(null);
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        const socket = new SockJS(`http://localhost:8080/websocket`)
        const client = Stomp.over(socket)

        client.connect({}, () => {
            setStompClient(client)

            client.subscribe(`/topic/quiz/${quizId}`, (message) => {
                const updatedQuiz = JSON.parse(message.body);
                setParticipants(updatedQuiz.participants);
            });
        })

        return () => {
            if (client) {
                client.disconnect();
            }
        };
    }, [quizId]);

    const handleEndQuiz = () => {
        if (stompClient) {
            stompClient.send(`/app/quiz.endQuiz`, {}, JSON.stringify({ quizId }));
            navigate(`/teacher/quiz/${quizId}/results`);
        }
    }

    return (
        <Box>
            <Typography variant="h4">Bài thi đang diễn ra</Typography>
            <Typography variant="body1">Số người tham gia: {participants.length}</Typography>
            <Button variant="contained" color="secondary" onClick={handleEndQuiz}>
                Kết thúc bài thi
            </Button>
        </Box>
    )
}

export default QuizActive