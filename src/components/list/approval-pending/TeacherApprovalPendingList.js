import React, {useEffect, useState} from 'react';
import TeacherService from '../../../services/teacher.service';

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

    return (<div>
        <h1>Danh sách chờ duyệt</h1>
        <table className="table table-striped">
            <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Registered At</th>
                <th>Last Login</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {teachers.map(teacher => (<tr key={teacher.id}>
                <td>{teacher.name}</td>
                <td>{teacher.email}</td>
                <td>{teacher.registeredAt}</td>
                <td>{teacher.lastLogin}</td>
                <td>
                    <button className="btn btn-primary">
                        Approval
                    </button>
                </td>
            </tr>))}
            </tbody>
        </table>
    </div>);
};

export default TeacherApprovalPendingList;
