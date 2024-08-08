import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Breadcrumb, Button} from "antd";
import CategoryService from "../../../services/category.service";
import Swal from "sweetalert2";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPen, faTrash} from '@fortawesome/free-solid-svg-icons';
import Page from "../../pages/Page"; // Import the pagination component

const Categories = () => {
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const totalPages = Math.ceil(categories.length / itemsPerPage);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await CategoryService.getAllCategories();
                setCategories(response.data);
            } catch (err) {
                console.error('Error fetching Categories list: ', err);
            }
        };
        fetchCategories();
    }, []);

    const deleteCategory = async (id) => {
        try {
            await Swal.fire({
                title: "Xóa danh mục này?",
                text: "Danh mục có thể chứa nội dung quan trọng",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Xóa",
                cancelButtonText: "Hủy"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await CategoryService.destroyCategory(id);
                        Swal.fire({
                            title: "Đã xóa!", icon: "success"
                        });
                        setCategories(categories.filter(category => category.id !== id));
                    } catch {
                        Swal.fire({
                            title: "Không thể xóa!",
                            text: "Danh mục này đang có câu hỏi, bạn không thể xóa danh mục này.",
                            icon: "error"
                        });
                    }
                }
            });
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return categories.slice(startIndex, endIndex);
    };

    const currentCategories = getCurrentPageData();

    return (
        <div>
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>Danh Sách</Breadcrumb.Item>
                <Breadcrumb.Item>Danh mục câu hỏi</Breadcrumb.Item>
            </Breadcrumb>
            <div className="title col-md-12">
                <div className="row">
                    <div className="col-md-6">
                        <h1>Danh mục câu hỏi</h1>
                    </div>
                    <div className="col-md-6">
                        <Link to="/admin/add-category">
                            <Button className="text-bg-success" type="primary"> Thêm danh mục</Button>
                        </Link>
                    </div>
                </div>
            </div>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Tiêu đề</th>
                    <th>Mô tả</th>
                    <th>Thao tác</th>
                </tr>
                </thead>
                <tbody>
                {currentCategories.map((category, index) => (
                    <tr key={category.id}>
                        <td>{category.name}</td>
                        <td>{category.description}</td>
                        <td>
                            <Link to={"/admin/edit/" + category.id}>
                                <Button type="primary">
                                    <FontAwesomeIcon icon={faPen}/>
                                </Button>
                            </Link>
                            <Button type="primary" onClick={() => deleteCategory(category.id)} danger>
                                <FontAwesomeIcon icon={faTrash}/>
                            </Button>
                        </td>
                    </tr>
                ))}
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

export default Categories;
