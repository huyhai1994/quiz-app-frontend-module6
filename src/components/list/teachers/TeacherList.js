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
        <ul>
            {teachers.map(teacher => (<li key={teacher.id}>{teacher.name}</li>))}
        </ul>
    </div>);
};

export default TeacherList;
