import React from 'react'
import {Button, Card, Form, Layout} from 'antd'
import {
    AppleOutlined,
    FacebookOutlined,
    GoogleOutlined,
    MailOutlined,
    PhoneOutlined,
    WindowsOutlined
} from '@ant-design/icons'
import heroImage from '../../asset/teacher.png'
import {ShieldOutlined} from '@mui/icons-material' // Ensure the path is correct
import '../../styles/vars.css'
import './Login.css'
import {Link} from "react-router-dom";

const {Content} = Layout

const Login = () => {
    return (
        <Layout style={{height: '100vh'}}>
            <Content
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'var(--color-primary)'
                }}
            >
                <div style={{display: 'flex', width: '50%'}}>
                    <Card
                        style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'row',
                            overflow: 'hidden',
                            borderRadius: '0',
                        }}
                    >
                        <div style={{flex: 1, padding: '20px'}}>
                            <Form layout="vertical">
                                <Form.Item>
                                    <Button
                                        type="default"
                                        icon={<GoogleOutlined/>}
                                        className='login-button-account'
                                    >
                                        Sử dụng tài khoản Google
                                    </Button>
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type="default"
                                        icon={<MailOutlined/>}
                                        className='login-button-account'
                                    >
                                        <Link to="/admin" style={{color: 'inherit', textDecoration: 'none'}}>
                                            Sử dụng tài khoản Email
                                        </Link>
                                    </Button>
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type="default"
                                        icon={<FacebookOutlined/>}
                                        className='login-button-account'>
                                        Sử dụng tài khoản Facebook
                                    </Button>
                                </Form.Item>
                                <div style={{textAlign: 'center', marginBottom: '10px'}}>
                                    Hoặc tiếp tục với
                                </div>
                                <Form.Item>
                                    <Button
                                        className='login-button-another'
                                        type="default"
                                        icon={<WindowsOutlined/>}
                                        style={{width: '22%', marginRight: '4%'}}
                                    ></Button>
                                    <Button
                                        className='login-button-another'
                                        type="default"
                                        icon={<PhoneOutlined/>}
                                        style={{width: '22%', marginRight: '4%'}}
                                    ></Button>
                                    <Button
                                        className='login-button-another'
                                        type="default"
                                        icon={<AppleOutlined/>}
                                        style={{width: '22%', marginRight: '4%'}}
                                    ></Button>
                                    <Button
                                        className='login-button-another'
                                        type="default"
                                        icon={<ShieldOutlined/>}
                                        style={{width: '22%'}}
                                    ></Button>
                                </Form.Item>
                            </Form>
                            <div style={{textAlign: 'center'}}>
                                Bạn chưa có tài khoản? <Link to="/register">Đăng kí ngay thôi!!</Link>
                            </div>
                        </div>
                    </Card>
                    <Card
                        style={{
                            borderRadius: '0',
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'row',
                            overflow: 'hidden',
                            background: `url(${heroImage}) center center / cover no-repeat`,
                        }}
                    ></Card>
                </div>
            </Content>
        </Layout>
    )
}

export default Login
