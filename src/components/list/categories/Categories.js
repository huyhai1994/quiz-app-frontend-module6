import React, {useEffect, useState} from 'react'
import {Button} from "antd";
import CategoryService from "../../../services/category.service";
import {Link} from "react-router-dom";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);

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

    const indexOfLastCategory = currentPage * itemsPerPage;
    const indexOfFirstCategory = indexOfLastCategory - itemsPerPage;
    const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
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
                            <Link to={"/admin/edit-category/" + category.id}><Button type="primary">Sửa</Button></Link>
                            <Button type="primary" danger>Xóa</Button>
                        </td>
                    </tr>))}
                </tbody>
            </table>
            <div>
                {Array.from({length: Math.ceil(categories.length / itemsPerPage)}, (_, index) => index + 1).map(page => (
                    <button key={page} onClick={() => paginate(page)}>{page}</button>))}
            </div>
        </div>);
};

export default Categories;