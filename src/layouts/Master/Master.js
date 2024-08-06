import React from 'react'
import Navbar from "../../components/navbar/Navbar";
import {Outlet} from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";

const Master = () => {
    return (
        <div className="container">
                <Navbar/>
               <Sidebar/>
                <Outlet/>

            </div>
    )
}
export default Master
