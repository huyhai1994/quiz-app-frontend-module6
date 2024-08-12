import {Form, Input, Button, message} from 'antd'
import {changePassword} from '../../features/authSlice'
import {useDispatch} from "react-redux";

const ChangePasswordForm = () => {
    const [form] = Form.useForm()
    const dispatch = useDispatch()

    const onFinish = async (values) => {
        try {
            await dispatch(changePassword(values)).unwrap()
            message.success('Password changed successfully')
            form.resetFields()
        } catch (error) {
            message.error(error || 'Failed to change password')
        }
    }

    return (
        <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item
                name="currentPassword"
                label="Current Password"
                rules={[{required: true, message: 'Please input your current password'}]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                name="newPassword"
                label="New Password"
                rules={[
                    {required: true, message: 'Please input your new password'},
                    {min: 6, message: 'Password must be at least 6 characters long'}
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                name="confirmPassword"
                label="Confirm New Password"
                dependencies={['newPassword']}
                rules={[
                    {required: true, message: 'Please input your new password'},
                    ({getFieldValue}) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('newPassword') === value) {
                                return Promise.resolve()
                            }
                            return  Promise.reject(new Error(`The two password do not match`))
                        }
                    })
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Change password
                </Button>
            </Form.Item>
        </Form>
    )
}

export default ChangePasswordForm