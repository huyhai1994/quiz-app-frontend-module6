import React, {useEffect, useState} from 'react';
import StudentService from '../../../services/student.service';
import {useFormik} from "formik";
import {Breadcrumb} from "antd";
import Page from "../../pages/Page"; // Import the pagination component

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const totalPages = Math.ceil(students.length / itemsPerPage);

    const formik = useFormik({
        initialValues: {
            name: '', email: '',
        }, onSubmit: async (values) => {
            try {
                const response = await StudentService.getStudentByNameAndEmail(values.name, values.email);
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students by name and email:', error);
                setStudents([]);
            }
        },
    });

    useEffect(() => {
        if (formik.values.name || formik.values.email) {
            StudentService.getStudentByNameAndEmail(formik.values.name, formik.values.email).then((response) => {
                setStudents(response.data);
            })
        } else {
            StudentService.getAllStudents().then((response) => {
                setStudents(response.data);
            })
        }
    }, [formik.values.name, formik.values.email]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return students.slice(startIndex, endIndex);
    };

    const currentStudents = getCurrentPageData();

    return (
        <div>
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>Danh Sách</Breadcrumb.Item>
                <Breadcrumb.Item>Học Sinh</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className='d-flex align-items-between justify-content-between'>Danh Sách Học Sinh <form
                className="d-flex mx-1 my-2" role="search"
                onSubmit={formik.handleSubmit}
            >
                <input className="form-control me-2" type="search" placeholder="name"
                       aria-label="Search"
                       name="name"
                       value={formik.values.name}
                       onChange={formik.handleChange}
                />
                <input className="form-control me-2" type="search" placeholder="email"
                       aria-label="Search"
                       name="email"
                       value={formik.values.email}
                       onChange={formik.handleChange}
                />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            </h1>
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
                {currentStudents.map(student => (<tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.registeredAt}</td>
                    <td>{student.lastLogin}</td>
                </tr>))}
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

export default StudentList;
