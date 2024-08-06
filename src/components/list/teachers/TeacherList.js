import React, {useEffect, useState} from 'react';
import TeacherService from '../../../services/teacher.service';

const TeacherList = () => {
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await TeacherService.getAllTeachers();
                setTeachers(response.data);
            } catch (error) {
                console.error('Error fetching Teacher List:', error);
            }
        };
        fetchTeachers();
    }, []);

    return (<div>
        <h1>Teacher List</h1>
        <table className="table table-striped">
            <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Registered At</th>
                <th>Last Login</th>
            </tr>
            </thead>
            <tbody>
            {teachers.map(teacher => (<tr key={teacher.id}>
                <td>{teacher.name}</td>
                <td>{teacher.email}</td>
                <td>{teacher.registeredAt}</td>
                <td>{teacher.lastLogin}</td>
            </tr>))}
            </tbody>
        </table>
    </div>);
};

export default TeacherList;
