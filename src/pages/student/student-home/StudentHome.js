import React, {useState} from 'react';
import {Link, Outlet, useNavigate} from 'react-router-dom';
import {Layout, Menu, Modal, theme} from 'antd';
import ViewListIcon from '@mui/icons-material/ViewList';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Import the logout icon
import '../../../styles/vars.css';

const {Content, Footer, Sider} = Layout;

function getItem(label, key, icon, children, link) {
    return {
        key, icon, children, label: link ? <Link to={link}>{label}</Link> : label,
    };
}

const items = [
    getItem('Trang chủ', '1', null, null, '/student/home'),
    getItem('Danh Sách', 'sub1',
        <ViewListIcon/>, [
            getItem('Bài kiểm tra', '2', null, null, '/student/quizzes'),]), getItem('Cài đặt', 'sub2',
        <SettingsIcon/>, [
            getItem('Thông tin cá nhân', '3', null, null, '/student/profile'), getItem('Thay đổi mật khẩu', '4', null, null, '/student/change-password'),],),
    getItem('Đăng xuất', '5', <ExitToAppIcon/>, null, ''), // Add the logout item
];

const StudentHome = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    const handleLogout = () => {
        Modal.confirm({
            title: 'Xác nhận đăng xuất',
            content: 'Bạn có chắc chắn muốn đăng xuất?',
            okText: 'Đăng xuất',
            cancelText: 'Hủy',
            onOk: () => {
                localStorage.removeItem('token'); // Clear the token from local storage
                navigate('/login'); // Navigate to the login page
            }
        });
    };

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                width={250}
                theme={'light'}
            >
                <div style={{padding: '16px', textAlign: 'center'}}>
                    <h1 className='logo'>QUIZZ</h1>
                </div>
                <Menu
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    items={items}
                    onClick={(e) => {
                        if (e.key === '5') { // Check if the logout item is clicked
                            handleLogout();
                        }
                    }}
                />
            </Sider>
            <Layout>
                <Content
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        height: '100vh',
                        background: 'var(--color-bg)',
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <div>
                        <Outlet/>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default StudentHome;
