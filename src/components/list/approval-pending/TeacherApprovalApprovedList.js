import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listApprovedApprovals, searchApprovedApprovals } from '../../../store/teacherApprovalStore/TeacherApprovalAxios';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import Page from "../../pages/Page";

function ApprovedApprovalsList() {
    const dispatch = useDispatch();
    const { approvedApprovals, loading, error } = useSelector((state) => state.teacherApprovals);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchUserName, setSearchUserName] = useState("");
    const [searchUserEmail, setSearchUserEmail] = useState("");
    const [pageSize] = useState(5);
    const searchButtonRef = useRef(null);

    useEffect(() => {
        dispatch(listApprovedApprovals());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            Swal.fire('Lỗi', error, 'error');
        }
    }, [error]);

    const handleSearch = () => {
        dispatch(searchApprovedApprovals({ userName: searchUserName, userEmail: searchUserEmail }));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (searchButtonRef.current) {
                searchButtonRef.current.click();
            }
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return approvedApprovals.slice(startIndex, endIndex);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const currentData = getCurrentPageData();

    return (
        <div>
            <h1>Danh Sách Giáo Viên Được Chấp Thuận</h1>
            <div className="mb-3 d-flex">
                <div className="me-2 flex-grow-1">
                    <input
                        type="text"
                        value={searchUserName}
                        onChange={(e) => setSearchUserName(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Tìm kiếm theo tên"
                        className="form-control"
                    />
                </div>
                <div className="me-2 flex-grow-1">
                    <input
                        type="text"
                        value={searchUserEmail}
                        onChange={(e) => setSearchUserEmail(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Tìm kiếm theo email"
                        className="form-control"
                    />
                </div>
                <button
                    className="btn btn-primary"
                    onClick={handleSearch}
                    ref={searchButtonRef}
                >
                    Tìm kiếm
                </button>
            </div>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Tên</th>
                    <th>Email</th>
                    <th>Trạng Thái</th>
                    <th>Ngày Chấp Thuận</th>
                </tr>
                </thead>
                <tbody>
                {currentData.length > 0 ? (
                    currentData.map((approval) => (
                        <tr key={approval.idTeacherApprovals}>
                            <td>{approval.idTeacherApprovals}</td>
                            <td>{approval.userName}</td>
                            <td>{approval.userEmail}</td>
                            <td>{approval.teacherApprovalsStatus}</td>
                            <td>{format(new Date(approval.approvedAt), 'dd-MM-yyyy - HH:mm:ss')}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5">Không có dữ liệu</td>
                    </tr>
                )}
                </tbody>
            </table>
            <Page
                currentPage={currentPage}
                totalPages={Math.ceil(approvedApprovals.length / pageSize)}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default ApprovedApprovalsList;
