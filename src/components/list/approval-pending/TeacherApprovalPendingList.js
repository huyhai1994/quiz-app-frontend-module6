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
