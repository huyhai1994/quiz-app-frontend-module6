import {Steps, Input, Button, Form, message} from 'antd'
import axiosInstance from '../../utils/axiosConfig'
import {useState} from "react";

const {Step} = Steps

const PasswordReset = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [email, setEmail] = useState('')
    const [resetCode, setResetCode] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleRequestReset = async () => {
        try {
            await axiosInstance.post('/api/password-reset/request', {email})
            message.success('Mã xác thực đã được gửi đến email của bạn')
            setCurrentStep(1)
        } catch (error) {
            message.error(error.response?.data || 'Đã xảy ra lỗi')
        }
    }

    const handleVerifyCode = async () => {
        try {
            await axiosInstance.post('/api/password-reset/verify', {email, resetCode})
            message.success('Mã xác thực hợp lệ')
            setCurrentStep(2)
        } catch (error) {
            message.error(error.response?.data || 'Mã xác thực không hợp lệ')
        }
    }

    const handleResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            message.error('Mật khẩu không khớp')
            return
        }
        try {
            await axiosInstance.post('/api/password-reset/reset', {email, newPassword, confirmPassword})
            message.success('Đặt lại mật khẩu thành công')
            setCurrentStep(0)
        } catch (error) {
            message.error(error.response?.data || 'Đã xảy ra lỗi')
        }
    }

    const steps = [
        {
            title: 'Yêu cầu đặt lại',
            content: (
                <Form onFinish={handleRequestReset}>
                    <Form.Item
                        name="email"
                        rules={[{required: true, message: 'Vui lòng nhập email'}]}
                    >
                        <Input
                            placeholder="Nhập email của bạn"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Gửi mã xác thực
                        </Button>
                    </Form.Item>
                </Form>
            )
        },
        {
            title: 'Xác thực mã',
            content: (
                <Form onFinish={handleVerifyCode}>
                    <Form.Item
                        name="resetCode"
                        rules={[{required: true, message: 'Vui lòng nhập mã xác thực'}]}
                    >
                        <Input
                            placeholder="Nhập mã xác thực"
                            value={resetCode}
                            onChange={e => setResetCode(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Xác thực
                        </Button>
                    </Form.Item>
                </Form>
            )
        },
        {
            title: 'Đặt lại mật khẩu',
            content: (
                <Form onFinish={handleResetPassword}>
                    <Form.Item
                        name="newPassword"
                        rules={[{required: true, message: 'Vui lòng nhập mật khẩu mới'}]}
                    >
                        <Input.Password
                            placeholder="Nhập mật khẩu mới"
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        name="confirmPassword"
                        rules={[
                            {required: true, message: 'Vui lòng xác nhận mật khẩu mới'},
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve()
                                    }
                                    return Promise.reject(new Error('Mật khẩu không khớp'))
                                }
                            })
                        ]}
                    >
                        <Input.Password
                            placeholder="Xác nhận mật khẩu mới"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Đặt lại mật khẩu
                        </Button>
                    </Form.Item>
                </Form>
            )
        }
    ]

    return (
        <div>
            <Steps current={currentStep}>
                {steps.map(item => (
                    <Step key={item.title} title={item.title}/>
                ))}
            </Steps>
            <div className="steps-content">{steps[currentStep].content}</div>
        </div>
    )
}

export default PasswordReset