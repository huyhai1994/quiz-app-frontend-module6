import React, {useEffect, useState} from 'react';
import TeacherService from '../../../services/teacher.service';
import {Breadcrumb} from "antd";

const TeacherApprovalPendingList = () => {
    const [teachers, setTeachers] = useState([]);

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
            console.log(`Teacher with ID ${teacherId} approved successfully.`);

            // Update the teacher's status in the local state
            const updatedTeachers = teachers.map(teacher => teacher.id === teacherId ? {
                ...teacher,
                status: 'approved'
            } : teacher);
            setTeachers(updatedTeachers);
        } catch (error) {
            console.error('Error approving teacher:', error);
        }
    };

    return (<div><Breadcrumb
        style={{
            margin: '16px 0',
        }}
    >
        <Breadcrumb.Item>Danh Sách</Breadcrumb.Item>
        <Breadcrumb.Item>Chờ duyệt </Breadcrumb.Item>
    </Breadcrumb>
        <h1>Danh sách chờ duyệt</h1>
        <table className="table table-striped">
            <thead>
            <tr>
                <th>Tên</th>
                <th>Email</th>
                <th>Ngày đăng kí</th>
                <th>Lần cuối truy cập</th>
            </tr>
            </thead>
            <tbody>
            {teachers.map(teacher => (<tr key={teacher.id}>
                <td>{teacher.name}</td>
                <td>{teacher.email}</td>
                <td>{teacher.registeredAt}</td>
                <td>{teacher.lastLogin}</td>
                <td>
                    <button
                        className="btn btn-primary"
                        onClick={() => approveTeacher(teacher.id)}
                        disabled={teacher.status === 'approved'}
                    >
                        {teacher.status === 'approved' ? 'Approved' : 'Approval'}
                    </button>
                </td>
            </tr>))}
            </tbody>
        </table>
    </div>);
};

export default TeacherApprovalPendingList;
