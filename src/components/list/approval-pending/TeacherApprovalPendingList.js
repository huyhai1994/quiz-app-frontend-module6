import React, {useEffect, useState} from 'react';
import {Breadcrumb, Button} from "antd";
import Swal from "sweetalert2";
import TeacherService from '../../../services/teacher.service';
import Page from "../../pages/Page"; // Import the pagination component

const TeacherApprovalPendingList = () => {
    const [teachers, setTeachers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const totalPages = Math.ceil(teachers.length / itemsPerPage);

    useEffect(() => {
        const fetchPendingTeachers = async () => {
            try {
                const response = await TeacherService.getPendingTeachers();
                setTeachers(response.data);
            } catch (error) {
                console.error('Error fetching pending Teacher List:', error);
            }
        };
        fetchPendingTeachers();
    }, []);

    const approveTeacher = async (teacherId) => {
        try {
            await TeacherService.approveTeacher(teacherId);
            await Swal.fire({
                title: "Duyệt tài khoản!",
                text: "Đã thành công",
                icon: "success"
            });

            // Update the teacher's status in the local state
            const updatedTeachers = teachers.map(teacher => teacher.id === teacherId ? {
                ...teacher, status: 'approved'
            } : teacher);
            setTeachers(updatedTeachers);
        } catch (error) {
            console.error('Error approving teacher:', error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return teachers.slice(startIndex, endIndex);
    };

    const currentTeachers = getCurrentPageData();

    return (
        <div>
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>Danh Sách</Breadcrumb.Item>
                <Breadcrumb.Item>Chờ duyệt</Breadcrumb.Item>
            </Breadcrumb>
            <h1>Danh sách chờ duyệt</h1>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Tên</th>
                    <th>Email</th>
                    <th>Ngày đăng kí</th>
                    <th>Lần cuối truy cập</th>
                    <th>Thao tác</th>
                </tr>
                </thead>
                <tbody>
                {currentTeachers.map((teacher, index) => (
                    <tr key={teacher.id}>
                        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                        <td>{teacher.name}</td>
                        <td>{teacher.email}</td>
                        <td>{teacher.registeredAt}</td>
                        <td>{teacher.lastLogin}</td>
                        <td>
                            <Button
                                className="btn btn-primary"
                                onClick={() => approveTeacher(teacher.id)}
                                disabled={teacher.status === 'approved'}
                            >
                                {teacher.status === 'approved' ? 'Approved' : 'Approval'}
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                <Page
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default TeacherApprovalPendingList;
