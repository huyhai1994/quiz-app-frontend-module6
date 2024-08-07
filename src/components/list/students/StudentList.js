import React, {useEffect, useState} from 'react';
import StudentService from '../../../services/student.service';
import {useFormik} from "formik";
import {Breadcrumb} from "antd";

const StudentList = () => {
    const [students, setStudents] = useState([]);

    const formik = useFormik({
        initialValues: {
            name: '', email: '',
        }, onSubmit: async (values) => {
            try {
                const response = await StudentService.getStudentByNameAndEmail(values.name, values.email);
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching teachers by name and email:', error);
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
    }, []);

    return (<div><Breadcrumb
        style={{
            margin: '16px 0',
        }}
    >
        <Breadcrumb.Item>Danh Sách</Breadcrumb.Item>
        <Breadcrumb.Item>Học Viên </Breadcrumb.Item>
    </Breadcrumb>
        <h1 className='d-flex align-items-between justify-content-between'>Danh sách Học Viên
            <form
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
            {students.map(teacher => (<tr key={teacher.id}>
                <td>{teacher.name}</td>
                <td>{teacher.email}</td>
                <td>{teacher.registeredAt}</td>
                <td>{teacher.lastLogin}</td>
            </tr>))}
            </tbody>
        </table>
    </div>);
};

export default StudentList;
