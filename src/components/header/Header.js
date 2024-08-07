import React, {useState} from 'react';
import {MailOutlined} from '@ant-design/icons';
import {Menu} from 'antd';
import {useNavigate} from "react-router-dom";

const items = [{
    label: 'Navigation One', key: 'mail', icon: <MailOutlined/>,
},

    {
        key: 'alipay', label: (<a href="https://ant.design" target="_blank" rel="noopener noreferrer">
            Navigation Four - Link
        </a>),
    }, {
        label: 'Welcome Admin', key: 'admin',
    }, {
        key: 'logout', label: <span className="logout-button">Logout</span>,
    },];

const Header = () => {
    const [current, setCurrent] = useState('mail');
    const navigate = useNavigate();

    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
        if (e.key === 'logout') {
            navigate('/login');
        }
    };

    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items}/>;
};

export default Header;
