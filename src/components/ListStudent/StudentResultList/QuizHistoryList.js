import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {HistoryResultsByUserId, ResultDetailHistory} from "../../../store/resultStore/ResultAxios";
import {format} from "date-fns";
import Page from "../../pages/Page";
import {TailSpin} from 'react-loader-spinner';
import Swal from 'sweetalert2';
import {Alert, Button, Modal, Table} from "react-bootstrap";
import QuizHistoryDetail from './QuizHistoryDetail';

const QuizHistoryList = () => {
    const dispatch = useDispatch();
    const {history, status, error} = useSelector((state) => state.results);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedQuizId, setSelectedQuizId] = useState(null);
    const pageSize = 5;
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        dispatch(HistoryResultsByUserId(userId));
    }, [dispatch, userId]);

    useEffect(() => {
        if (error) {
            Swal.fire({
                icon: 'error', title: 'Oops...', text: 'Đã có lỗi xảy ra!', footer: `<p>${error}</p>`
            });
        }
    }, [error]);

    const formatDate = (dateString) => {
        let date = new Date(dateString);
        if (!(date instanceof Date) || isNaN(date.getTime())) {
            date = new Date();
        }
        return format(date, 'dd-MM-yyyy - HH:mm:ss');
    };

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

    return (<div className="container mt-5">
        <h2>Lịch sử Quiz đã làm</h2>

        {status === 'loading' ? (
            <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
                <TailSpin color="#00BFFF" height={80} width={80}/>
            </div>) : (<>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Tên bài Quiz</th>
                    <th>Thời gian hoàn thành</th>
                    <th>Thời gian làm bài</th>
                    <th>Điểm số</th>
                    <th>Số lần làm bài</th>
                    <th>Khác</th>
                </tr>
                </thead>
                <tbody>
                {currentData.length > 0 ? (currentData.map((entry, index) => (<tr key={entry.id}>
                    <td>{(currentPage - 1) * pageSize + index + 1}</td>
                    <td>{entry.quizName}</td>
                    <td>{formatDate(entry.finishTime)}</td>
                    <td>{entry.durationMinutes}</td>
                    <td>{entry.score}</td>
                    <td>{entry.attemptNumber}</td>
                    <td>
                        <Button variant="primary" onClick={() => handleViewDetail(entry.id)}>
                            Chi tiết
                        </Button>
                    </td>
                </tr>))) : (<tr>
                    <td colSpan="7">
                        <Alert variant="info">
                            Không có dữ liệu để hiển thị.
                        </Alert>
                    </td>
                </tr>)}
                </tbody>
            </Table>
            <Page
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </>)}

        {status === 'failed' && (<Alert variant="danger" className="mt-3">
            Lỗi: {error}
        </Alert>)}

        <Modal show={!!selectedQuizId} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Chi tiết lịch sử thi</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <QuizHistoryDetail/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    </div>);
};

export default QuizHistoryList;
