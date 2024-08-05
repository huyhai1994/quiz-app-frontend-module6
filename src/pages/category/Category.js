import React from 'react'
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";


const rows = [
    { id: 1, title: 'Category 1', description: 'Description for Category 1' },
    { id: 2, title: 'Category 2', description: 'Description for Category 2' },
    { id: 3, title: 'Category 3', description: 'Description for Category 3' },
];
const Category = () => {
    return (
        <>
            <div className="single">
                <Navbar/>
                <div className="singleContainer">
                    <Sidebar/>
                    <div className="table">
                        <table>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Description</th>
                            </tr>
                            </thead>
                            <tbody>
                            {rows.map((row) => (
                                <tr key={row.id}>
                                    <td>{row.id}</td>
                                    <td>{row.title}</td>
                                    <td>{row.description}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>

    );
}
export default Category;
