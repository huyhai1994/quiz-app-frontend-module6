import React, {useEffect, useState} from "react";
import {format} from "date-fns";
import Swal from "sweetalert2";
import {TailSpin} from "react-loader-spinner";
import {useParams} from "react-router-dom";
import axios from "axios";
import {Box, Card, CardContent, Grid, Typography} from "@mui/material";
import {Cell, Legend, Pie, PieChart, Tooltip} from "recharts";
import Confetti from "react-confetti";
import '../../../styles/vars.css';

const ResultStudentList = () => {
    const {resultId} = useParams();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showConfetti, setShowConfetti] = useState(false);

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

    useEffect(() => {
        if (results.length > 0 && results[0].score >= 50) {
            setShowConfetti(true);
            const timer = setTimeout(() => {
                setShowConfetti(false);
                Swal.fire('Xin chúc mừng', 'Bạn đã qua được bài thi', 'success');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [results]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
                <TailSpin color="#00BFFF" height={80} width={80}/>
            </div>
        );
    }

    const COLORS = ['var(--color-primary)', 'var(--color-secondary)'];

    return (
        <Box display="flex" justifyContent="center" minHeight="100vh" className='mt-5'>
            <Box width="80%">
                <Grid container spacing={3} justifyContent="center" alignItems="center">
                    {results.length > 0 ? (
                        results.map((result, index) => (
                            <Grid item xs={12} sm={6} md={4} key={result.id}>
                                <Card>
                                    <CardContent>
                                        {showConfetti && <Confetti/>}
                                        <Typography variant="h4" align="center" gutterBottom>
                                            Kết quả Quiz
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            Người dùng: {result.userName}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            Thời gian hoàn
                                            thành: {result.finishTime ? format(new Date(result.finishTime), 'dd-MM-yyyy - HH:mm:ss') : 'N/A'}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            Điểm số: {result.score}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            Số câu trả lời đúng: {result.correctAnswers}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            Số câu trả lời sai: {result.incorrectAnswers}
                                        </Typography>
                                        {result.score >= 50 && (
                                            <Typography variant="h6" color="primary" align="center" gutterBottom>
                                                Congratulations!
                                            </Typography>
                                        )}
                                        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
                                            <PieChart width={200} height={200}>
                                                <Pie
                                                    data={[
                                                        {name: '% đúng', value: result.correctAnswers},
                                                        {name: '% sai', value: result.incorrectAnswers}
                                                    ]}
                                                    cx="50%"
                                                    cy="50%"
                                                    outerRadius={80}
                                                    fill="#8884d8"
                                                    dataKey="value"
                                                >
                                                    {[
                                                        {name: 'Correct', value: result.correctAnswers},
                                                        {name: 'Incorrect', value: result.incorrectAnswers}
                                                    ].map((entry, index) => (
                                                        <Cell key={`cell-${index}`}
                                                              fill={COLORS[index % COLORS.length]}/>
                                                    ))}
                                                </Pie>
                                                <Tooltip/>
                                                <Legend/>
                                            </PieChart>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Grid item xs={12}>
                            <Typography variant="body1" color="text.secondary" align="center">
                                Không có dữ liệu
                            </Typography>
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Box>
    );
};

export default ResultStudentList;
