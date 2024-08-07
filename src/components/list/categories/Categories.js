import React, {useEffect, useState} from 'react'
import {Button} from "antd";
import CategoryService from "../../../services/category.service";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";

const Categories = () => {
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const indexOfLastCategory = currentPage * itemsPerPage;
    const indexOfFirstCategory = indexOfLastCategory - itemsPerPage;
    const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await CategoryService.getAllCategories();
                console.log(response);
                setCategories(response.data);
            } catch (err) {
                console.error('Error fetching Categories list: ', err);
            }

        };
        fetchCategories();
    }, []);

    const deleteCategory = (id) => {
        CategoryService.destroyCategory(id).then(() => {
            Swal.fire({
                title: "Xóa danh mục này?",
                text: "Danh mục có thể chứa nội dung quan trọng",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Xóa",
                cancelButtonText: "Hủy"
            }).then((result) => {
                if (result.isConfirmed) {
                    try {
                        Swal.fire({
                            title: "Đã xóa!", icon: "success"
                        });
                    }catch {
                        Swal.fire({
                            title: "Không thể xóa!",
                            text: "Danh mục này đang có câu hỏi, bạn không thể xóa danh mục này.",
                            icon: "error"
                        });
                    }
                }
            });
            setLoading(!loading);
        })

    }


    const paginate = (pageNumber,  newItemsPerPage) => {
        setCurrentPage(pageNumber);
        setItemsPerPage(newItemsPerPage);
    };

    return (<div>
        <div className="title col-md-12">
            <div className="row">
                <div className="col-md-6">
                    <h2>Danh mục câu hỏi</h2>
                </div>
                <div className="col-md-6">
                    <Link to="/admin/add-category"><Button className="text-bg-success justify-content-end"
                                                           type="primary"> Thêm danh mục</Button> </Link>
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
            {currentCategories.map(category => (<tr key={category.id}>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td>
                    <Link to={"/admin/edit/" + category.id}><Button type="primary">Sửa</Button></Link>
                    <Button type="primary" onClick={() => deleteCategory(category.id)} danger>Xóa</Button>
                </td>
            </tr>))}
            </tbody>
        </table>
        <div>
            {Array.from({length: Math.ceil(categories.length / itemsPerPage)}, (_, index) => index + 1).map(page => (
                <button key={page} onClick={() => paginate(page, 10)}>{page}</button>))}
        </div>
    </div>);
};

export default Categories;