import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';

const StudentExamList = ({ userId }) => {
    const [exams, setExams] = useState([]);
    const [status, setStatus] = useState('idle'); // idle, loading, succeeded, failed
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            if (userId) {
                setStatus('loading');
                try {
                    const response = await axios.get(`http://localhost:8080/result/user/${userId}`);
                    setExams(response.data);
                    setStatus('succeeded');
                } catch (err) {
                    setError(err.message || 'Có lỗi xảy ra');
                    setStatus('failed');
                }
            }
        };

        fetchResults();
    }, [userId]);

    const formatScore = (score) => {
        return score ? parseFloat(score).toFixed(2) : '0.00';
    };

    if (status === 'loading') {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <TailSpin color="#00BFFF" height={80} width={80} />
            </div>
        );
    }

    if (status === 'failed') {
        return <div className="alert alert-danger" role="alert">Lỗi: {error}</div>;
    }

    if (status === 'succeeded' && exams.length === 0) {
        return <p>Không có lịch sử kiểm tra.</p>;
    }

    return (
        <div>
            <h3>Lịch Sử Kiểm Tra</h3>
            <table className="table">
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Thời gian làm bài</th>
                    <th>Tên người thi</th>
                    <th>Điểm số</th>
                    <th>Câu trả lời đúng/Tổng số</th>
                </tr>
                </thead>
                <tbody>
                {exams.map((exam, index) => (
                    <tr key={exam.id}>
                        <td>{index + 1}</td>
                        <td>{exam.time}</td>
                        <td>{exam.userName}</td>
                        <td>{formatScore(exam.score)}</td>
                        <td>{exam.answerCorrect} / {exam.answerTotal}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentExamList;
