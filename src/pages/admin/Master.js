import React, {useState} from 'react';
import {Link, Outlet, useNavigate} from 'react-router-dom';
import {Layout, Menu, Modal, theme} from 'antd';
import ViewListIcon from '@mui/icons-material/ViewList';
import SettingsIcon from '@mui/icons-material/Settings';
import NavigationIcon from '@mui/icons-material/Navigation';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import '../../styles/vars.css';
import './Master.css';
import {logout} from "../../features/authSlice";
import {useDispatch} from "react-redux";

const {Content, Footer, Sider} = Layout;

function getItem(label, key, icon, children, link, onClick) {
    return {
        key, icon, children, label: link ? <Link to={link}>{label}</Link> : label, onClick
    };
}

const Master = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [logoutModalOpen, setLogoutModalOpen] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    const showLogoutModal = () => {
        setLogoutModalOpen(true);
    };

    const handleLogout = async () => {
        try {
            await dispatch(logout()).unwrap();
            setLogoutModalOpen(false)
            navigate('/');
        } catch (error) {
            console.log('Logout failed: ', error)
        }
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
                getItem('Thông tin cá nhân', '9', null, null, '/admin/profile'),
                getItem('Đổi mật khẩu', '12', <LockOutlinedIcon/>, null, '/admin/change-password'),
                getItem('Quên mật khẩu', '13', <KeyOutlinedIcon/>, null, '/admin/reset-password'),
                getItem('Đăng xuất', '14', <LogoutOutlinedIcon/>, null, null, showLogoutModal)
            ])
    ];

    return (
        <Layout style={{minHeight: '100vh',}}>
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
                items={items}
            />
        </Sider>
        <Layout>
            <Content style={{margin: '0 16px',}}>
                <div
                    style={{
                        padding: 24,
                        minHeight: 360,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet/>
                </div>
            </Content>
            <Footer
                style={{textAlign: 'center',}}>
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
        </Layout>
            <Modal
                title="Đăng xuất"
                open={logoutModalOpen}
                onOk={handleLogout}
                onCancel={() => setLogoutModalOpen(false)}
                okText="Đồng ý"
                cancelText="Hủy"
            >
                <p>Bạn có chắc chắn muốn đăng xuất không?</p>
            </Modal>
    </Layout>
    );
};

export default Master;
