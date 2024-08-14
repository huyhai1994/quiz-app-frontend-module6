import {format} from "date-fns";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import {TailSpin} from "react-loader-spinner";
import {useParams} from "react-router-dom";
import axios from "axios";
import {Card, CardContent, Grid, Typography} from "@mui/material";

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
            <Grid container spacing={3}>
                {results.length > 0 ? (
                    results.map((result, index) => (
                        <Grid item xs={12} sm={6} md={4} key={result.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        STT: {index + 1}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Người dùng: {result.userName}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Thời gian hoàn
                                        thành: {result.finishTime ? format(new Date(result.finishTime), 'dd-MM-yyyy - HH:mm:ss') : 'N/A'}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Điểm số: {result.score}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Số câu trả lời đúng: {result.correctAnswers}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Số câu trả lời sai: {result.incorrectAnswers}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12}>
                        <Typography variant="body2" color="text.secondary">
                            Không có dữ liệu
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </div>
    );
};

export default ResultStudentList;
