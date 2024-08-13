import React, {useEffect, useState} from 'react';
import {useFormik} from "formik";
import {Breadcrumb} from "antd";
import TeacherService from '../../../services/teacher.service';
import Page from "../../pages/Page";
import {FaExclamationTriangle, FaSearch, FaTrash} from "react-icons/fa"; // Import the delete icon from react-icons
import './TeacherList.css';

const TeacherList = () => {
    const [teachers, setTeachers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [isDataFetched, setIsDataFetched] = useState(false); // State to track if data has been fetched
    const totalPages = Math.ceil(teachers.length / itemsPerPage);

    const formik = useFormik({
        initialValues: {
            name: '', email: '',
        }, onSubmit: async (values) => {
            try {
                const response = await TeacherService.getTeacherByNameAndEmail(values.name, values.email);
                setTeachers(response.data);
            } catch (error) {
                console.error('Error fetching teachers by name and email:', error);
                setTeachers([]);
            } finally {
                setIsDataFetched(true); // Set data fetched to true after the request is complete
            }
        },
    });

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                if (formik.values.name || formik.values.email) {
                    const response = await TeacherService.getTeacherByNameAndEmail(formik.values.name, formik.values.email);
                    setTeachers(response.data);
                } else {
                    const response = await TeacherService.getAllTeachers();
                    setTeachers(response.data);
                }
            } catch (error) {
                console.error('Error fetching teachers:', error);
            } finally {
                setIsDataFetched(true); // Set data fetched to true after the request is complete
            }
        };
        fetchTeachers();
    }, [formik.values.name, formik.values.email]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return teachers.slice(startIndex, endIndex);
    };

    const handleDelete = async (teacherId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this teacher?");
        if (confirmDelete) {
            try {
                await TeacherService.deleteTeacher(teacherId);
                setTeachers(teachers.filter(teacher => teacher.id !== teacherId));
            } catch (error) {
                console.error('Error deleting teacher:', error);
            }
        }
    };

    const currentTeachers = getCurrentPageData();

    return (<div className='teacher-list'>
        <div style={{backgroundColor: 'var(--color-secondary)', padding: '2px', borderRadius: '8px'}}>
            <form
                className="d-flex mx-1 my-2" role="search"
                onSubmit={formik.handleSubmit}
            >
                <input className="form-control me-2" type="search" placeholder="Tìm kiếm bằng tên hoặc email"
                       style={{
                           backgroundColor: 'var(--color-bg)', borderRadius: '8px', padding: '5px 10px'
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
            <Breadcrumb.Item>Giáo Viên</Breadcrumb.Item>
        </Breadcrumb>
        <h1 className='d-flex align-items-between justify-content-between'>Danh Sách Giáo Viên
        </h1>
        {isDataFetched && teachers.length === 0 ? (<div style={{textAlign: 'center', marginTop: '20px'}}>
            <FaExclamationTriangle size={50} color="red"/>
            <p style={{fontSize: '18px', color: 'red'}}>Không có dữ liệu!!!</p>
        </div>) : (<>
            <div className="table-responsive">
                <table className="table ">
                    <thead>
                    <tr>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Ngày đăng kí</th>
                        <th>Lần cuối truy cập</th>
                        <th>Hành động</th>
                        {/* Add a new column for actions */}
                    </tr>
                    </thead>
                    <tbody>
                    {currentTeachers.map(teacher => (<tr key={teacher.id}>
                        <td>{teacher.name}</td>
                        <td>{teacher.email}</td>
                        <td>{teacher.registeredAt}</td>
                        <td>{teacher.lastLogin}</td>
                        <td className='text-center'>
                            <button className="btn btn-danger" onClick={() => handleDelete(teacher.id)}>
                                <FaTrash/>
                            </button>
                        </td>
                    </tr>))}
                    </tbody>
                </table>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                <Page
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </>)}
    </div>);
};

export default TeacherList;
