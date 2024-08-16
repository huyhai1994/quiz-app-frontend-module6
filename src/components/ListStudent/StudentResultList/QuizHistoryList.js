import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HistoryResultsByUserId, ResultDetailHistory } from "../../../store/resultStore/ResultAxios";
import { format } from "date-fns";
import Page from "../../pages/Page";
import { TailSpin } from 'react-loader-spinner';
import Swal from 'sweetalert2';
import { Table, Button, Modal } from "react-bootstrap";
import QuizHistoryDetail from './QuizHistoryDetail';

const QuizHistoryList = () => {
    const dispatch = useDispatch();
    const { history, status, error } = useSelector((state) => state.results);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedQuizId, setSelectedQuizId] = useState(null);
    const pageSize = 5;
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        dispatch(HistoryResultsByUserId(userId));
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Đã có lỗi xảy ra!',
                footer: `<p>${error}</p>`
            });
        }
    }, [error]);

    const totalPages = useMemo(() => Math.ceil(history.length / pageSize), [history.length, pageSize]);

    const handlePageChange = useCallback((pageNumber) => {
        setCurrentPage(pageNumber);
    }, []);

    const getCurrentPageData = useCallback(() => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return history.slice(startIndex, endIndex);
    }, [currentPage, history]);

    const handleViewDetail = useCallback((id) => {
        setSelectedQuizId(id);
    }, []);

    const handleCloseModal = useCallback(() => {
        setSelectedQuizId(null);
    }, []);

    // Fetch details when selectedQuizId changes
    useEffect(() => {
        if (selectedQuizId !== null) {
            dispatch(ResultDetailHistory(selectedQuizId));
        }
    }, [dispatch, selectedQuizId]);

    const currentData = getCurrentPageData();

    if (status === 'loading') return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <TailSpin color="#00BFFF" height={80} width={80} />
        </div>
    );

    if (status === 'failed') return <p>Error: {error}</p>;

    return (
        <div className="container mt-5">
            <h2>Quiz History</h2>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Quiz Name</th>
                    <th>Finish Time</th>
                    <th>Duration (Minutes)</th>
                    <th>Score</th>
                    <th>Attempt Number</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {currentData.length > 0 ? (
                    currentData.map((entry, index) => (
                        <tr key={entry.id}>
                            <td>{(currentPage - 1) * pageSize + index + 1}</td>
                            <td>{entry.quizName}</td>
                            <td>{format(new Date(entry.finishTime), 'dd-MM-yyyy - HH:mm:ss')}</td>
                            <td>{entry.durationMinutes}</td>
                            <td>{entry.score}</td>
                            <td>{entry.attemptNumber}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleViewDetail(entry.id)}>
                                    Chi tiết
                                </Button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="7">No data available</td>
                    </tr>
                )}
                </tbody>
            </Table>
            <Page
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
            <Modal show={!!selectedQuizId} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Quiz Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <QuizHistoryDetail />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default QuizHistoryList;
