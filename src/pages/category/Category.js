import "./category.css"
import React from 'react'
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";


const rows = [
    { id: 1, title: 'Category 1', description: 'Description for Category 1' },
    { id: 2, title: 'Category 2', description: 'Description for Category 2' },
    { id: 3, title: 'Category 3', description: 'Description for Category 3' },
];
const Category = () => {
    return (
        <>
            <div className="single">
                <Sidebar/>
                <div className="singleContainer">
                    <Navbar/><h1>Category</h1>
                    <div className="row mb-4">
                        <form className="d-flex col-12" role="search">
                            <div className="col-2">
                                <span>Danh sách từ</span>
                                <input
                                    className="form-control me-2"
                                    type="date"
                                    placeholder="Search"
                                    aria-label="Search"
                                />
                            </div>
                            <div className="col-2">
                                <span>đến</span>
                                <input
                                    className="form-control me-2"
                                    type="date"
                                    placeholder="Search"
                                    aria-label="Search"
                                />
                            </div>
                            <button className="btn btn-outline-danger" type="submit">
                                Xem
                            </button>
                        </form>
                    </div>
                    <table className="table table-hover table-bordered" style={{textAlign: "center"}}>
                        <thead>
                        <tr>
                            <th>STT</th>
                            <th>Ten danh muc</th>
                            <th>Mo ta</th>
                            <th>hanh dong</th>

                        </tr>
                        </thead>
                        <tbody>


                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <Button>Sua</Button>
                                <Button>Xoa</Button>
                            </td>
                        </tr>

                        </tbody>
                        <tr>
                            <td colSpan={8}></td>
                            <td>
                                <Link to={"/"}>
                                    <button className="btn btn-outline-info mb-2">Thêm đơn hàng</button>
                                </Link>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

        </>

    );
}
export default Category;
