import React from 'react';
import {useNavigate} from "react-router-dom";
import CategoryService from "../../../services/category.service";
import Swal from "sweetalert2";
import {useFormik} from "formik";
import {Button, TextField} from "@mui/material";
import './EditCategory.css'

const AddCategory = () => {

    const navigate = useNavigate();

    const formAddCategory = useFormik({
        initialValues: {
            name: '',
            description: ''
        },
        onSubmit: (values) => {
            CategoryService.addCategory(values).then(res => {
                Swal.fire('Success', 'Category added successfully', 'success');
                navigate("/admin/categories");
            }).catch(err => {
                Swal.fire('Error', err.message, 'error');
            });
        }
    });

    return (
        <div className='container d-flex justify-content-center'>
            <div className="card my-5 p-5" style={{width: '50%'}}>
                <h1 className='text-center'>Thêm danh mục mới</h1>
                <form onSubmit={formAddCategory.handleSubmit} className="text-center py-4">
                    <TextField
                        id="outlined-basic"
                        label="Tiêu đề"
                        variant="outlined"
                        name="name"
                        className="form-control my-5"
                        onChange={formAddCategory.handleChange}
                        value={formAddCategory.values.name}
                    />

                    <TextField
                        id="outlined-basic"
                        label="Mô tả"
                        variant="outlined"
                        name="description"
                        className="form-control"
                        onChange={formAddCategory.handleChange}
                        value={formAddCategory.values.description}
                    />
                    <div className="py-3 d-flex justify-content-md-around">
                        <Button sx={{
                                backgroundColor: 'var(--color-primary)',
                                color: 'var(--color-bg)',
                                width: '40%',
                                borderRadius: '5px',
                                '&:hover': {
                                    backgroundColor: 'var(--color-dark)',}}} type="submit">
                            Save
                        </Button>

                        <Button
                            sx={{
                                backgroundColor: 'var(--color-secondary)',
                                color: 'var(--color-bg)',
                                width: '40%',
                                borderRadius: '5px',
                                '&:hover': {
                                    backgroundColor: 'var(--color-dark)',
                                }
                            }}
                            onClick={() => navigate("/admin/categories")}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddCategory;
