import React, {useEffect, useState} from 'react';
import TeacherService from '../../../services/teacher.service';

const TeacherList = () => {
    const [teachers, setTeachers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await TeacherService.getAllTeachers();
                const sortedTeachers = response.data.sort((b, a) => new Date(b.registeredAt) - new Date(a.registeredAt));
                setTeachers(sortedTeachers);
            } catch (error) {
                console.error('Error fetching Teacher List:', error);
            }
        };
        fetchTeachers();
    }, []);

    const indexOfLastTeacher = currentPage * itemsPerPage;
    const indexOfFirstTeacher = indexOfLastTeacher - itemsPerPage;
    const currentTeachers = teachers.slice(indexOfFirstTeacher, indexOfLastTeacher);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

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
            {currentTeachers.map(teacher => (<tr key={teacher.id}>
                <td>{teacher.name}</td>
                <td>{teacher.email}</td>
                <td>{teacher.registeredAt}</td>
                <td>{teacher.lastLogin}</td>
            </tr>))}
            </tbody>
        </table>
        <div>
            {Array.from({length: Math.ceil(teachers.length / itemsPerPage)}, (_, index) => index + 1).map(page => (
                <button key={page} onClick={() => paginate(page)}>{page}</button>))}
        </div>
    </div>);
};

export default TeacherList;
