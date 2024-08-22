import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {TailSpin} from "react-loader-spinner";

const QuizTeacherHistory = () => {
    const {id} = useParams();
    const [quizTeacherHistory, setQuizTeacherHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8080/quiz/${id}/user-info`);
                setQuizTeacherHistory(response.data);
            } catch (err) {
                setError(err.message || 'Có lỗi xảy ra');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchHistory();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center">
                <TailSpin type="ThreeDots" color="#00BFFF" height={80} width={80}/>
            </div>
        );
    }

    if (error) {
        return <div className="alert alert-danger" role="alert">Lỗi: {error}</div>;
    }

    return (
        <div className="container mt-4">
            <h2>Lịch sử Bài Kiểm Tra</h2>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Tên Người Dùng</th>
                    <th>Email Người Dùng</th>
                    <th>Số Lần Thử</th>
                </tr>
                </thead>
                <tbody>
                {quizTeacherHistory.map((history, index) => (
                    <tr key={history.id}>
                        <td>{index + 1}</td>
                        <td>{history.userName}</td>
                        <td>{history.userEmail}</td>
                        <td>{history.attemptCount}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default QuizTeacherHistory;
