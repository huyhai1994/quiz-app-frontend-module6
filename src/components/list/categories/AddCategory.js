import React from 'react';
import {Button, Form, Input} from 'antd';
import {Link, useNavigate} from "react-router-dom";
import CategoryService from "../../../services/category.service";
import Swal from "sweetalert2";

const AddCategory = () => {
    const navigate = useNavigate();
    const onFinish = (values: any) => {
        CategoryService.addCategory(values).then(res => {
            Swal.fire({
                name: "Thành công",
                text: "Danh mục mới đã được tạo",
                icon: "success"
            });
            console.log('tahnh cong')
            navigate("/admin/categories")
        }).catch(err => {
            console.log("that bai")
            Swal.fire({
                name: "Lỗi",
                text: "Đã xảy ra lỗi khi tạo danh mục",
                icon: "error"
            });
        })
    }
    
    return (
        <div>
            <h1>Tạo danh mục</h1>
            <Form name="wrap" labelCol={{flex: '110px'}} labelAlign="left" labelWrap wrapperCol={{flex: 1}}
                  colon={false} style={{maxWidth: 600}} onFinish={onFinish}>
                <Form.Item label="Tiêu đề" name="name" rules={[{required: true}]}>
                    <Input/>
                </Form.Item>

                <Form.Item label="Mô tả" name="description" rules={[{required: true}]}>
                    <Input/>
                </Form.Item>

                <Form.Item label=" ">
                    <Button type="primary" htmlType="submit" style={{marginRight: "8px"}}>
                        Xác nhận
                    </Button>
                    <Link to={"/admin/categories"}><Button type="primary" htmlType="submit" danger>
                        Hủy
                    </Button></Link>
                </Form.Item>
            </Form>
        </div>
    )
}
export default AddCategory
