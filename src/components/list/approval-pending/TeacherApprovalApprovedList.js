import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import {listApprovedApprovals} from "../../../store/teacherApprovalStore/TeacherApprovalAxios";

function ApprovedApprovalsList() {
    const dispatch = useDispatch();
    const { approvedApprovals, loading, error } = useSelector((state) => state.teacherApprovals);

    useEffect(() => {
        dispatch(listApprovedApprovals());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            Swal.fire('Lỗi', error, 'error');
        }
    }, [error]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Danh Sách Giáo Viên Được Chấp Thuận</h1>
            <table>
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
                {approvedApprovals.length > 0 ? (
                    approvedApprovals.map((approval) => (
                        <tr key={approval.idTeacherApprovals}>
                            <td>{approval.idTeacherApprovals}</td>
                            <td>{approval.userName}</td>
                            <td>{approval.userEmail}</td>
                            <td>{approval.teacherApprovalsStatus}</td>
                            <td>{new Date(approval.approvedAt).toLocaleDateString()}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5">Không có dữ liệu</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}

export default ApprovedApprovalsList;
