import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { TailSpin } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { fetchQuizResultsByUserId } from "../../../store/resultStore/ResultAxios";

const ResultStudentList = () => {
    const dispatch = useDispatch();
    const { resultId } = useParams();
    const { results, loading, error } = useSelector((state) => state.results);

    useEffect(() => {
        if (resultId) {
            dispatch(fetchQuizResultsByUserId(resultId));
        }
    }, [dispatch, resultId]);

    useEffect(() => {
        if (error) {
            Swal.fire('Lỗi', error, 'error');
        }
    }, [error]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <TailSpin color="#00BFFF" height={80} width={80} />
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
                {results && results.length > 0 ? (
                    results.map((result, index) => (
                        <tr key={result.id}>
                            <td>{index + 1}</td>
                            <td>{result.userName}</td>
                            <td>{format(new Date(result.finishTime), 'dd-MM-yyyy - HH:mm:ss')}</td>
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
