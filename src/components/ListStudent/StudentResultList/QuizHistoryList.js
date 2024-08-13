
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HistoryResultsByUserId } from "../../../store/resultStore/ResultAxios";
import { format } from "date-fns";
import Page from "../../pages/Page";
import { TailSpin } from 'react-loader-spinner';
import Swal from 'sweetalert2';
import {Table} from "react-bootstrap";

const QuizHistoryList = () => {
    const dispatch = useDispatch();
    const { history, status, error } = useSelector((state) => state.results);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    useEffect(() => {
        dispatch(HistoryResultsByUserId(5));
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

    const totalPages = Math.ceil(history.length / pageSize);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return history.slice(startIndex, endIndex);
    };

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
                    <th>Quiz Name</th>
                    <th>Finish Time</th>
                    <th>Duration (Minutes)</th>
                    <th>Score</th>
                    <th>Attempt Number</th>
                </tr>
                </thead>
                <tbody>
                {currentData.length > 0 ? (
                    currentData.map((entry, index) => (
                        <tr key={index}>
                            <td>{entry.quizName}</td>
                            <td>{format(new Date(entry.finishTime), 'dd-MM-yyyy - HH:mm:ss')}</td>
                            <td>{entry.durationMinutes}</td>
                            <td>{entry.score}</td>
                            <td>{entry.attemptNumber}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5">No data available</td>
                    </tr>
                )}
                </tbody>
            </Table>
            <Page
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default QuizHistoryList;
