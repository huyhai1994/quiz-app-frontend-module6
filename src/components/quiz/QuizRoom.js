import {Button, Typography, Box} from '@mui/material';
import SockJS from 'sockjs-client'
import {Stomp} from "@stomp/stompjs";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const QuizRoom = () => {
    const { quizId } = useParams();
    const navigate = useNavigate();
    const [roomCode, setRoomCode] = useState('');
    const [participants, setParticipants] = useState([]);
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/websocket');
        const client = Stomp.over(socket);

        client.connect({}, () => {
            setStompClient(client);

            // Create room
            fetch(`http://localhost:8080/api/quiz-rooms`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quizId, userId: localStorage.getItem('userId'), maxParticipants: 10 }),
            })
                .then(response => response.json())
                .then(data => {
                    setRoomCode(data.roomCode);

                    // Subscribe to room updates
                    client.subscribe(`/topic/room/${data.roomCode}`, (message) => {
                        const messageData = JSON.parse(message.body);
                        if (messageData.type === 'JOIN') {
                            setParticipants(prev => [...prev, messageData.sender]);
                        }
                    });
                });
        });

        return () => {
            if (client) {
                client.disconnect();
            }
        };
    }, [quizId]);

    useEffect(() => {
        const createRoom = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/quiz-rooms`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ quizId, userId: localStorage.getItem('userId') }),
                });
                const data = await response.json();
                setRoomCode(data.roomCode);
            } catch (error) {
                console.error('Error while creating room: ', error);
            }
        };
        createRoom();
    }, [quizId]);

    const handleStartQuiz = () => {
        if (stompClient) {
            fetch(`http://localhost:8080/api/quiz-rooms/${roomCode}/start`, { method: 'POST' })
                .then(() => {
                    navigate(`/teacher/quiz/${quizId}/active`);
                });
        }
    };

    return (
        <Box>
            <Typography variant="h4">Phòng chờ bài thi</Typography>
            <Typography variant="h6">Mã phòng: {roomCode}</Typography>
            <Typography variant="body1">Số người tham gia: {participants.length}</Typography>
            <Button variant="contained" color="primary" onClick={handleStartQuiz}>
                Bắt đầu thi
            </Button>
        </Box>
    )
}

export default QuizRoom