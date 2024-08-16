import React, {useState} from 'react';
import {Link, Outlet, useNavigate} from 'react-router-dom';
import {Layout, Menu, theme} from 'antd';
import ViewListIcon from '@mui/icons-material/ViewList';
import SettingsIcon from '@mui/icons-material/Settings';
import NavigationIcon from '@mui/icons-material/Navigation';
import '../../styles/vars.css';
import './Master.css';

const {Content, Footer, Sider} = Layout;

function getItem(label, key, icon, children, link) {
    return {
        key, icon, children, label: link ? <Link to={link}>{label}</Link> : label,
    };
}

const items = [
    getItem('Danh Sách', 'sub1',
        <ViewListIcon/>, [
            getItem('Giáo viên', '3', null, null, '/admin/teacher-list'),
            getItem('Học Viên', '4', null, null, '/admin/student-list'),
            getItem('Chờ duyệt', '5', null, null, '/admin/pending-list'),
            getItem('đã duyệt ', '6', null, null, '/admin/teacher/approved'),
            getItem('Danh Mục Câu Hỏi ', '7', null, null, '/admin/categories'),
            getItem('Danh sách  Câu Hỏi ', '8', null, null, '/admin/question')
        ]),

    getItem('Điều Hướng', 'sub2',
        <NavigationIcon/>, [
            getItem('Giao diện giáo viên', '10', null, null, '/teacher'),
            getItem('Giao diện học viên', '11', null, null, '/student')
        ]),

    getItem('Cài đặt', 'sub3',
        <SettingsIcon/>, [
            getItem('Thông tin cá nhân', '9', null, null, '/admin/profile')])
];

const Master = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    const handleLogout = () => {
        navigate('/login');
    };

    return (<Layout
        style={{
            minHeight: '100vh',
        }}
    >
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            width={250}
            theme={'light'}
        >
            <div style={{padding: '16px', textAlign: 'center'}}>
                <h1>
                    <Link className='logo' to={'/admin'}>
                        {collapsed ? 'Q' : 'QUIZZ' }
                    </Link>
                </h1>
            </div>
            <Menu
                defaultSelectedKeys={['1']}
                mode="inline"
                items={items}/>
        </Sider>
        <Layout>
            <Content
                style={{
                    margin: '0 16px',
                }}
            >

                <div
                    style={{
                        padding: 24, minHeight: 360, background: colorBgContainer, borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet/>
                </div>
            </Content>
            <Footer style={{textAlign: 'center',}}>
                Quiz App &copy; 2022 Created by Team 1 - CodeGym.

            </Footer>
        </Layout>
    </Layout>);
};

export default Master;
