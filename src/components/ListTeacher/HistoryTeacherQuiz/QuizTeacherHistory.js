import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';
import { Button, Modal, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import StudentExamList from "./StudentExamHistory";
import Page from "../../pages/Page";

const QuizTeacherHistory = () => {
    const { id } = useParams();
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

    const handlePageChange = useCallback((pageNumber) => {
        setCurrentPage(pageNumber);
    }, []);

    const getCurrentPageData = useCallback(() => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return quizTeacherHistory.slice(startIndex, endIndex);
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
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <TailSpin color="#00BFFF" height={80} width={80} />
            </div>
        );
    }

    if (error) {
        return <div className="alert alert-danger" role="alert">Lỗi: {error}</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Lịch sử thi của học sinh</h2>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Tên Người Dùng</th>
                    <th>Email Người Dùng</th>
                    <th>Số Lần Thử</th>
                    <th>Chi Tiết</th>
                </tr>
                </thead>
                <tbody>
                {currentData.length > 0 ? (
                    currentData.map((entry, index) => (
                        <tr key={entry.id}> {/* Đảm bảo rằng `key` là duy nhất */}
                            <td>{(currentPage - 1) * pageSize + index + 1}</td>
                            <td>{entry.userName}</td>
                            <td>{entry.userEmail}</td>
                            <td>{entry.attemptCount}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleViewDetail(entry.id)}>
                                    Xem Chi Tiết
                                </Button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5">Không có dữ liệu</td>
                    </tr>
                )}
                </tbody>
            </Table>
            <Page
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Danh Sách Kết Quả</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedUserId && <StudentExamList userId={selectedUserId} />}
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

export default QuizTeacherHistory;
