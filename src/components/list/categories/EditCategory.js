import React, {useEffect} from 'react'
import {Button,} from "antd";
import {Link, useNavigate, useParams} from "react-router-dom";
import CategoryService from "../../../services/category.service";
import Swal from "sweetalert2";
import {useFormik} from "formik";

const EditCategory = () => {

    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        CategoryService.findCategoryById(id).then((res) => {
            formEditCategory.setValues({
                name: res.data.name,
                description: res.data.description
            })
        })
    }, []);

    const formEditCategory = useFormik({
        initialValues: {
            name: '',
            description: ''
        },
        onSubmit: (values) => {
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

    return (
        <div>
            <div className="card"><h1>Edit Category</h1>
                <form onSubmit={formEditCategory.handleSubmit}>
                    <div>
                        <label>Title:</label>
                        <input type="text" name="name" placeholder="Enter category name"
                               onChange={formEditCategory.handleChange('name')}/>
                    </div>
                    <div>
                        <label>Description:</label>
                        <input type="text" name="description" onChange={formEditCategory.handleChange('description')}/>
                    </div>
                    <div>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                        <Link to={"/admin/categories"} className="btn btn-danger"></Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditCategory