import React, {useEffect} from 'react'
import {Button, Form, Input} from "antd";
import {Link, useNavigate} from "react-router-dom";
import CategoryService from "../../../services/category.service";
import Swal from "sweetalert2";

const EditCategory = () => {
    const navigate = useNavigate();
    const onFinish = (values: any) => {
        CategoryService.updateCategory(values.id).then(res => {
            Swal.fire({
                name: "Thành công", text: "Danh mục đã được sửa", icon: "success"
            });
            navigate("/admin/categories")
        }).catch(err => {
            Swal.fire({
                name: "Lỗi", text: "Không sửa được danh mục này", icon: "error"
            });
        })
    }

    useEffect(() => {
        console.log(onFinish.id)
    }, [])

    return (
        <div>
            <h1>Sửa danh mục</h1>
            <Form onFinish={onFinish} name="wrap" labelCol={{flex: '110px'}} labelAlign="left" labelWrap
                  wrapperCol={{flex: 1}}
                  colon={false} style={{maxWidth: 600}}>
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
export default EditCategory
