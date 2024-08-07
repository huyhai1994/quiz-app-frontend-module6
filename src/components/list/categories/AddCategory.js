import React from 'react';
import { Button, Form, Input } from 'antd';

const AddCategory = () => {
    return (
        <div>
            <h1>Tạo danh mục</h1>
            <Form name="wrap" labelCol={{ flex: '110px' }} labelAlign="left" labelWrap wrapperCol={{ flex: 1 }} colon={false} style={{ maxWidth: 600 }}>
                <Form.Item label="Tiêu đề" name="title" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Mô tả" name="description" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item label=" ">
                    <Button type="primary" htmlType="submit"  style={{marginRight: "8px"}}>
                        Xác nhận
                    </Button>
                    <Button type="primary" htmlType="submit" danger>
                        Hủy
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default AddCategory
