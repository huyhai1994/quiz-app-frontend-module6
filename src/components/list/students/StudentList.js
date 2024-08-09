import React, {useEffect, useState} from 'react';
import {useFormik} from "formik";
import {Breadcrumb} from "antd";
import {FaExclamationTriangle, FaSearch} from 'react-icons/fa'; // Import an icon from react-icons
import StudentService from '../../../services/student.service'; // Assuming you have a StudentService similar to TeacherService
import Page from "../../pages/Page"; // Import the pagination component
import './StudentList.css';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [isDataFetched, setIsDataFetched] = useState(false); // State to track if data has been fetched
    const [isInputFocused, setIsInputFocused] = useState(false); // State to track if the input is focused
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
            } finally {
                setIsDataFetched(true);
            }
        },
    });

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                if (formik.values.name || formik.values.email) {
                    const response = await StudentService.getStudentByNameAndEmail(formik.values.name, formik.values.email);
                    setStudents(response.data);
                } else {
                    const response = await StudentService.getAllStudents();
                    setStudents(response.data);
                }
            } catch (error) {
                console.error('Error fetching students:', error);
            } finally {
                setIsDataFetched(true);
            }
        };
        fetchStudents();
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
        <div className='student-list'>
            <div style={{backgroundColor: 'var(--color-secondary)', padding: '2px', borderRadius: '8px'}}>
                <form
                    className="d-flex mx-1 my-2" role="search"
                    onSubmit={formik.handleSubmit}
                >
                    <input className="form-control me-2" type="search" placeholder="Tìm kiếm bằng tên hoặc email"
                           style={{
                               backgroundColor: 'var(--color-bg)',
                               borderRadius: '8px',
                               padding: '5px 10px'
                           }}
                           aria-label="Search"
                           name="email"
                           value={formik.values.email}
                           onChange={formik.handleChange}
                    />
                    <button className="btn" type="submit">
                        <FaSearch/>
                    </button>
                </form>
            </div>
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>Danh Sách</Breadcrumb.Item>
                <Breadcrumb.Item>Sinh Viên</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className='d-flex align-items-between justify-content-between'>Danh Sách Sinh Viên
            </h1>
            {isDataFetched && students.length === 0 ? (
                <div style={{textAlign: 'center', marginTop: '20px'}}>
                    <FaExclamationTriangle size={50} color="red"/>
                    <p style={{fontSize: '18px', color: 'red'}}>Không có dữ liệu!!!</p>
                </div>
            ) : (
                <div className="content">
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
                        {currentStudents.map(student => (
                            <tr key={student.id}>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{student.registeredAt}</td>
                                <td>{student.lastLogin}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
            <div className="">
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
