import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import QuizRoomService from "../quiz-room-service/QuizRoomService";

const FindQuizRoom = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const quizRoom = await QuizRoomService.joinQuizRoom(values.roomCode, localStorage.getItem('userId'));
            console.log('Received quizRoom:', quizRoom);
            if (quizRoom.roomStatus === 'WAITING') {
                navigate(`/quiz/${quizRoom.quizzesId}/room`, { state: { roomCode: values.roomCode } });
                // navigate(`/quiz/${quizRoom.quizTitle}/room`, { state: { roomCode: values.roomCode } });
            } else {
                message.error(`Phòng thi này có trạng thái là ${quizRoom.roomStatus}, không thể gia nhập.`);
            }
        } catch (error) {
            console.error('Error joining quiz room:', error);
            message.error(`Không thể gia nhập phòng thi. Lỗi: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <Form form={form} name="findQuizRoom" onFinish={onFinish}>
            <Form.Item
                name="roomCode"
                rules={[{ required: true, message: 'Vui lòng nhập mã phòng thi!' }]}
            >
                <Input placeholder="Nhập mã phòng thi" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Gia Nhập
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FindQuizRoom;