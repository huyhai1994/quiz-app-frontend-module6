import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {FacebookOutlined} from "@ant-design/icons";
import {Menu} from "antd";

const items = [
    {
        label: <div>
            <h5>Danh muc</h5>
            <Link to="/categories"></Link>
        </div>, key: 'faeature'
    },
    {
        label: <div>
            <h5>Lien he</h5>
            <Link to="https://www.facebook.com/"><FacebookOutlined/></Link>
        </div>, key: 'contact'
    },
    {
        label: <div>
            <h5>Thong tin</h5>
            <Link to="/about">Dia chi</Link>
            <Link to="/about">Dia chi</Link>
            <Link to="/about">Dia chi</Link>
        </div>, key: 'about'
    },
    {
        label: <div>
            <h5>Dang ky / Dang nhap</h5>
            <Link to="/login">Dang nhap</Link>
            <Link to="/register">Dang ky</Link>
        </div>, key: 'login'
    },

]
const HomeFooter = () => {
    const [current, setCurrent] = useState("mail");
    const navigate = useNavigate();

    const onClick = (e) => {
        setCurrent(e.key);
        if (e.key === 'feature') {
            navigate('/categories');
        } else if (e.key === 'contact') {
            navigate('https://www.facebook.com/');
        } else if (e.key === 'about') {
            navigate('/about');
        } else if (e.key === 'login') {
            navigate('/login');
        }
    };
    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items}></Menu>
}
export default HomeFooter
