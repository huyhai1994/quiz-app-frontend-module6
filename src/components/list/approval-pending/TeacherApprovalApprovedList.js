import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {listApprovedApprovals} from '../../../store/teacherApprovalStore/TeacherApprovalAxios';
import Swal from 'sweetalert2';
import {format} from 'date-fns';
import Page from "../../pages/Page";
import {Breadcrumb} from "antd";

function ApprovedApprovalsList() {
    const dispatch = useDispatch();
    const {approvedApprovals, loading, error} = useSelector((state) => state.teacherApprovals);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    const totalPages = Math.ceil(approvedApprovals.length / pageSize);

    useEffect(() => {
        dispatch(listApprovedApprovals());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            Swal.fire('Lỗi', error, 'error');
        }
    }, [error]);

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

    return (<div>
        <Breadcrumb
            style={{
                margin: '16px 0',
            }}
        >
            <Breadcrumb.Item>Danh Sách</Breadcrumb.Item>
            <Breadcrumb.Item>Đã duyệt</Breadcrumb.Item>
        </Breadcrumb>
        <h1>Danh Sách Giáo Viên Được Chấp Thuận</h1>
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
            {currentData.length > 0 ? (currentData.map((approval) => (<tr key={approval.idTeacherApprovals}>
                <td>{approval.idTeacherApprovals}</td>
                <td>{approval.userName}</td>
                <td>{approval.userEmail}</td>
                <td>{approval.teacherApprovalsStatus}</td>
                <td>{format(new Date(approval.approvedAt), 'dd-MM-yyyy - HH:mm:ss')}</td>
            </tr>))) : (<tr>
                <td colSpan="5">Không có dữ liệu</td>
            </tr>)}
            </tbody>
        </table>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
            <Page
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    </div>);
}

export default ApprovedApprovalsList;
