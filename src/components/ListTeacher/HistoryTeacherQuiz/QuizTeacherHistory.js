import React, {useCallback, useEffect, useMemo, useState} from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    CircularProgress,
    Modal,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import {useParams} from 'react-router-dom';
import StudentExamList from "./StudentExamHistory";
import NoDataImage from '../../../asset/No data-amico.svg'; // Adjust the path as necessary

const QuizTeacherHistory = () => {
    const {id} = useParams();
    const [quizTeacherHistory, setQuizTeacherHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

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

    const handlePageChange = useCallback((event, pageNumber) => {
        setCurrentPage(pageNumber);
    }, []);

    const getCurrentPageData = useCallback(() => {
        const startIndex = (currentPage - 1) * pageSize;
        return quizTeacherHistory.slice(startIndex, startIndex + pageSize);
    }, [currentPage, quizTeacherHistory]);

    const handleViewDetail = useCallback((userId) => {
        setSelectedUserId(userId);
        setShowModal(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setShowModal(false);
        setSelectedUserId(null);
    }, []);

    const currentData = getCurrentPageData();

    const totalPages = useMemo(() => Math.ceil(quizTeacherHistory.length / pageSize), [quizTeacherHistory.length, pageSize]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress/>
            </Box>
        );
    }

    if (error) {
        return <Typography color="error">Lỗi: {error}</Typography>;
    }

    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom>Lịch sử thi của học sinh</Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><Typography fontWeight="bold">STT</Typography></TableCell>
                            <TableCell><Typography fontWeight="bold">Tên Người Dùng</Typography></TableCell>
                            <TableCell><Typography fontWeight="bold">Email Người Dùng</Typography></TableCell>
                            <TableCell><Typography fontWeight="bold">Số Lần Thử</Typography></TableCell>
                            <TableCell><Typography fontWeight="bold">Chi Tiết</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentData.length > 0 ? (
                            currentData.map((entry, index) => (
                                <TableRow key={entry.id}>
                                    <TableCell>{(currentPage - 1) * pageSize + index + 1}</TableCell>
                                    <TableCell>{entry.userName}</TableCell>
                                    <TableCell>{entry.userEmail}</TableCell>
                                    <TableCell>{entry.attemptCount}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary"
                                                onClick={() => handleViewDetail(entry.id)}>
                                            Xem Chi Tiết
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5}>
                                    <Box display="flex" justifyContent="center" alignItems="center">
                                        <img src={NoDataImage} alt="No Data"
                                             style={{maxWidth: '50%', height: 'auto'}}/>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box display="flex" justifyContent="center" mt={2}>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>

            <Modal open={showModal} onClose={handleCloseModal}>
                <Box
                    position="absolute"
                    top="20%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    width="50%"
                    maxHeight="50vh"
                    overflow="auto"
                    bgcolor="background.paper"
                    borderRadius={3}
                    boxShadow={24}
                    p={4}
                >
                    <Typography variant="h6" component="h2" gutterBottom>
                        Danh Sách Kết Quả
                    </Typography>
                    {selectedUserId && <StudentExamList userId={selectedUserId}/>}
                    <Box mt={2} display="flex" justifyContent="flex-end">
                        <Button variant="contained" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default QuizTeacherHistory;
