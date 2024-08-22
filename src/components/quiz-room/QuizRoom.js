import {Button, Typography, Box} from '@mui/material';
import SockJS from 'sockjs-client'
import {Stomp} from "@stomp/stompjs";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {message} from "antd";

const QuizRoom = () => {
    const { quizId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [roomCode, setRoomCode] = useState('');
    const [participants, setParticipants] = useState([]);
    const [stompClient, setStompClient] = useState(null);
    const [isHost, setIsHost] = useState(false);

    useEffect(() => {
        const initializeWebSocket = async () => {
            try {
                const socket = new SockJS('http://localhost:8080/websocket');
                const client = Stomp.over(socket);
                await new Promise((resolve, reject) => {
                    client.connect({}, () => {
                        setStompClient(client);
                        if (location.state && location.state.roomCode) {
                            // Người tham gia
                            setRoomCode(location.state.roomCode);
                            subscribeToRoom(location.state.roomCode, client);
                        } else {
                            // Chủ phòng
                            createRoom(client);
                        }
                        resolve();
                    }, (error) => {
                        reject(error);
                    });
                });
            } catch (error) {
                console.error('Error connecting to WebSocket:', error);
            }
        };
        initializeWebSocket();
    }, [quizId, location.state]);

    const createRoom = async (client) => {
        try {
            const response = await fetch(`http://localhost:8080/api/quiz-rooms`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quizId, userId: localStorage.getItem('userId'), maxParticipants: 10 }),
            });
            const data = await response.json();
            setRoomCode(data.roomCode);
            setIsHost(true);
            subscribeToRoom(data.roomCode, client);
        } catch (error) {
            console.error('Error while creating room: ', error);
            message.error('Đã xảy ra lỗi trong phòng thi. Vui lòng thử lại sau.');
        }
    };

    const subscribeToRoom = (code, client) => {
        if (!client) {
            console.error("STOMP client is not initialized.");
            return;
        }
        client.subscribe(`/topic/room/${code}`, (message) => {
            const messageData = JSON.parse(message.body);
            if (messageData.type === 'JOIN') {
                setParticipants(prev => [...prev, messageData.sender]);
            }
        });
    };

    const handleStartQuiz = () => {
        fetch(`http://localhost:8080/api/quiz-rooms/${roomCode}/start`, {
            method: 'POST',
        })
            .then(() => {
                navigate(`/quiz/${quizId}/active`);
            })
            .catch((error) => {
                console.error('Error starting quiz:', error);
            });
    };

    const handleLeaveRoom = () => {
        navigate('/student/home');
    };

    return (
        <Box>
            <Typography variant="h4">Phòng chờ bài thi</Typography>
            <Typography variant="h6">Mã phòng: {roomCode}</Typography>
            <Typography variant="body1">Số người tham gia: {participants.length}</Typography>
            {isHost ? (
                <Button variant="contained" color="primary" onClick={handleStartQuiz}>
                    Bắt đầu thi
                </Button>
            ) : (
                <Button variant="contained" color="secondary" onClick={handleLeaveRoom}>
                    Thoát
                </Button>
            )}
        </Box>
    )
}

export default QuizRoom