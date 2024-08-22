import React, {useState} from 'react';
import {Button, Input, message} from 'antd';
import {useNavigate} from 'react-router-dom';

const SearchQuizRoom = () => {
    const [roomCode, setRoomCode] = useState('');
    const navigate = useNavigate();

    const handleSearch = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/quiz-rooms/${roomCode}`)
            if (!response.ok) {
                throw new Error('Phòng thi không tồn tại');
            }
            const data = await response.json();
            if (data.status === 'WAITING') {
                navigate(`/quiz/${data.quizId}/room`, {state: {isHost: false, roomCode}})
            } else {
                message.error('Rất tiếc, phòng thi này đã/đang được bắt đầu rồi')
            }
        } catch (error) {
            message.error(error.message);
        }
    }

    return (
        <div style={{maxWidth: '400px', margin: '0 auto', padding: '20px'}}>
            <h2>Tìm kiếm phòng thi</h2>
            <Input
                placeholder="Nhập mã phòng thi"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                style={{marginBottom: '10px'}}
            />
            <Button type="primary" onClick={handleSearch}>
                Tìm kiếm
            </Button>
        </div>
    )
}

export default SearchQuizRoom;
