import {format} from "date-fns";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import {TailSpin} from "react-loader-spinner";
import {useParams} from "react-router-dom";
import axios from "axios";

const ResultStudentList = () => {
    const {resultId} = useParams();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (resultId) {
            const fetchResults = async () => {
                setLoading(true);
                try {
                    const response = await axios.get(`http://localhost:8080/result/${resultId}`);
                    setResults([response.data]);
                } catch (error) {
                    setError(error.message);
                    console.error('Error fetching quiz results:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchResults();
        }
    }, [resultId]);

    useEffect(() => {
        if (error) {
            Swal.fire('Lỗi', error, 'error');
        }
    }, [error]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
                <TailSpin color="#00BFFF" height={80} width={80}/>
            </div>
        );
    }

    return (
        <div>
            <h2>Kết quả Quiz</h2>
            <table className="table table-bordered table-striped">
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Người dùng</th>
                    <th>Thời gian hoàn thành</th>
                    <th>Điểm số</th>
                    <th>Số câu trả lời đúng</th>
                    <th>Số câu trả lời sai</th>
                </tr>
                </thead>
                <tbody>
                {results.length > 0 ? (
                    results.map((result, index) => (
                        <tr key={result.id}>
                            <td>{index + 1}</td>
                            <td>{result.userName}</td>
                            <td>{result.finishTime ? format(new Date(result.finishTime), 'dd-MM-yyyy - HH:mm:ss') : 'N/A'}</td>
                            <td>{result.score}</td>
                            <td>{result.correctAnswers}</td>
                            <td>{result.incorrectAnswers}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6">Không có dữ liệu</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default ResultStudentList;
