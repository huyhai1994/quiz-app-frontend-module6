import React, {useEffect} from 'react'
import {Button,} from "antd";
import {Link, useNavigate, useParams} from "react-router-dom";
import CategoryService from "../../../services/category.service";
import Swal from "sweetalert2";
import {useFormik} from "formik";
import {TextField} from "@mui/material";


const EditCategory = () => {

    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        CategoryService.findCategoryById(id).then((res) => {
            formEditCategory.setValues({
                name: res.data.name, description: res.data.description
            })
        })
    },);

    const formEditCategory = useFormik({
        initialValues: {
            name: '', description: ''
        }, onSubmit: (values) => {
            CategoryService.updateCategory(id, values).then(res => {
                console.log(values)
                Swal.fire('Success', 'Category updated successfully', 'success')
                console.log("a")
                navigate("/admin/categories")
            }).catch(err => {
                Swal.fire('Error', err.message, 'error')
                console.log('b')
            })
        }
    })

    return (<div>
            <div className="card px-2"><h1>Edit Category</h1>
                <form onSubmit={formEditCategory.handleSubmit}>
                    <div className="mb-2">
                        <TextField id="outlined-basic" label="Tiêu đề" variant="outlined" name="name"
                                   onChange={formEditCategory.handleChange('name')}/>

                    </div>
                    <div className="mb-2">
                        <TextField id="outlined-basic" label="Mô tả" variant="outlined" name="description" onChange={formEditCategory.handleChange('description')}/>

                    </div>
                    <div className="p-2" >
                        <Button type="primary" htmlType="submit" style={{marginRight: "8px"}}>
                            Save
                        </Button>
                        <Link to={"/admin/categories"}><Button type="primary" danger>Cancel
                        </Button></Link>
                    </div>
                </form>
            </div>
        </div>)
}

export default EditCategory