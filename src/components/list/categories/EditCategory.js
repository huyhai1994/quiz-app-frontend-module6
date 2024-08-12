import React, {useEffect} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import CategoryService from "../../../services/category.service";
import Swal from "sweetalert2";
import {useFormik} from "formik";
import {Button, TextField} from "@mui/material";
import './EditCategory.css'

const EditCategory = () => {

    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        CategoryService.findCategoryById(id).then((res) => {
            formEditCategory.setValues({
                name: res.data.name, description: res.data.description
            })
        })
    }, [id]);

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

    return (<div className='container d-flex justify-content-center'>
        <div className="card  my-5 p-5" style={{width: '50%'}}><h1 className='text-center'>Sửa thông tin danh mục</h1>
            <form onSubmit={formEditCategory.handleSubmit} className="text-center py-4">
                <TextField
                    id="outlined-basic"
                    label="Tiêu đề"
                    variant="outlined"
                    name="name"
                    className="form-control my-5"
                    onChange={formEditCategory.handleChange}
                    value={formEditCategory.values.name}
                />

                <TextField
                    id="outlined-basic"
                    label="Mô tả"
                    variant="outlined"
                    name="description"
                    className="form-control"
                    onChange={formEditCategory.handleChange}
                    value={formEditCategory.values.description}
                />
                <div className="py-3 d-flex  justify-content-md-around">
                    <Button
                        sx={{
                            backgroundColor: 'var(--color-primary)',
                            color: 'var(--color-bg)',
                            width: '40%',
                            borderRadius: '5px',
                            '&:hover': {
                                backgroundColor: 'var(--color-dark)',
                            }
                        }}
                        type="submit"
                    >
                        Save
                    </Button>

                    <Button sx={{
                        backgroundColor: 'var(--color-secondary)',
                        color: 'var(--color-bg)',
                        width: '40%',
                        borderRadius: '5px',
                        '&:hover': {
                            backgroundColor: 'var(--color-dark)',
                        }
                    }}
                    >Cancel
                    </Button>
                </div>
            </form>
        </div>
    </div>)
}

export default EditCategory
