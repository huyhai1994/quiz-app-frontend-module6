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

const {Content} = Layout

const Login = () => {
    return (
        <Layout style={{height: '100vh'}}>
            <Content
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#5a2c82'
                }}
            >
                <div style={{display: 'flex', width: '50%'}}>
                    <Card
                        style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'row',
                            overflow: 'hidden'
                        }}
                    >
                        <div style={{flex: 1, padding: '20px'}}>
                            <Form layout="vertical">
                                <Form.Item>
                                    <Button
                                        type="default"
                                        icon={<GoogleOutlined/>}
                                        style={{width: '100%', marginBottom: '10px'}}
                                    >
                                        Continue with Google
                                    </Button>
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type="default"
                                        icon={<MailOutlined/>}
                                        style={{width: '100%', marginBottom: '10px'}}
                                    >
                                        Continue with Email
                                    </Button>
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type="default"
                                        icon={<FacebookOutlined/>}
                                        style={{width: '100%', marginBottom: '20px'}}
                                    >
                                        Continue with Facebook
                                    </Button>
                                </Form.Item>
                                <div style={{textAlign: 'center', marginBottom: '10px'}}>
                                    or continue with
                                </div>
                                <Form.Item>
                                    <Button
                                        type="default"
                                        icon={<WindowsOutlined/>}
                                        style={{width: '22%', marginRight: '4%'}}
                                    ></Button>
                                    <Button
                                        type="default"
                                        icon={<PhoneOutlined/>}
                                        style={{width: '22%', marginRight: '4%'}}
                                    ></Button>
                                    <Button
                                        type="default"
                                        icon={<AppleOutlined/>}
                                        style={{width: '22%', marginRight: '4%'}}
                                    ></Button>
                                    <Button
                                        type="default"
                                        icon={<ShieldOutlined/>}
                                        style={{width: '22%'}}
                                    ></Button>
                                </Form.Item>
                            </Form>
                            <div style={{textAlign: 'center'}}>
                                Don't have an account? <a href="#sign-up">Sign up</a>
                            </div>
                        </div>
                    </Card>
                    <Card
                        style={{
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
