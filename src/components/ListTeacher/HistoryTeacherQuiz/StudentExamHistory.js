import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
    Box,
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from '@mui/material';

const StudentExamList = ({userId}) => {
    const [exams, setExams] = useState([]);
    const [status, setStatus] = useState('idle'); // idle, loading, succeeded, failed
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    if (status === 'loading') {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <CircularProgress/>
            </Box>
        );
    }

    if (status === 'failed') {
        return <Typography color="error">Lỗi: {error}</Typography>;
    }

    if (status === 'succeeded' && exams.length === 0) {
        return <Typography>Không có lịch sử kiểm tra.</Typography>;
    }

    return (
        <Box>
            <Typography variant="h6" gutterBottom>Lịch Sử Kiểm Tra</Typography>
            <TableContainer component={Paper} sx={{maxHeight: 400, overflow: 'auto'}}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell><Typography fontWeight="bold">STT</Typography></TableCell>
                            <TableCell><Typography fontWeight="bold">Thời gian làm bài</Typography></TableCell>
                            <TableCell><Typography fontWeight="bold">Tên người thi</Typography></TableCell>
                            <TableCell><Typography fontWeight="bold">Điểm số</Typography></TableCell>
                            <TableCell><Typography fontWeight="bold">Câu trả lời đúng/Tổng số</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {exams.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((exam, index) => (
                            <TableRow key={exam.id}>
                                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                <TableCell>{exam.time}</TableCell>
                                <TableCell>{exam.userName}</TableCell>
                                <TableCell>{formatScore(exam.score)}</TableCell>
                                <TableCell>{exam.answerCorrect} / {exam.answerTotal}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={exams.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[10, 25, 50]}
                labelRowsPerPage="Số hàng mỗi trang"
            />
        </Box>
    );
};

export default StudentExamList;
