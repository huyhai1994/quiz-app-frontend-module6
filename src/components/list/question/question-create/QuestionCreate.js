import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {Box, Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select} from '@mui/material';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../../../../utils/axiosConfig';
import CategoryService from "../../../../services/category.service";

const QuestionCreate = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [teacherName, setTeacherName] = useState('');
    const [showTitle, setShowTitle] = useState(false);

    useEffect(() => {
        // Fetch categories
        CategoryService.getAllCategories().then(res => {
            setCategories(res.data);
        }).catch(err => {
            console.error("Error fetching categories", err);
        });

        // Fetch user profile
        axiosInstance.get('/users/profile').then(res => {
            setTeacherName(res.data.name);
        }).catch(err => {
            console.error("Error fetching user profile", err);
        });
    }, []);

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Xin vui lòng nhập tiêu đề'),
        questionType: Yup.string().required('Xin vui lòng chọn loại câu hỏi'),
        difficulty: Yup.string().required('Xin vui lòng chọn độ khó'),
        category: Yup.string().required('Xin vui lòng chọn danh mục'),
    });

    const formik = useFormik({
        initialValues: {
            title: '',
            questionType: '',
            difficulty: '',
            category: '',
            createdBy: teacherName
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                // Add logic to handle form submission
                console.log(values);
                Swal.fire({
                    title: "Thành công",
                    text: "Câu hỏi mới đã được tạo",
                    icon: "success"
                });
                navigate("/teacher/question");
            } catch (error) {
                Swal.fire('Thất bại', error || 'Xin vui lòng kiểm tra lại thông tin vừa nhập!', 'error');
            }
        }
    });

    return (
        <Box sx={{
            maxWidth: 600,
            margin: 'auto',
            mt: 4,
            border: '1px solid #ccc',
            borderRadius: 4,
            padding: 3,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl fullWidth margin="normal">
                    <InputLabel shrink htmlFor="title">Tiêu đề</InputLabel>
                    <OutlinedInput
                        id="title"
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        placeholder="Nhập tiêu đề"
                        error={formik.touched.title && Boolean(formik.errors.title)}
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel shrink htmlFor="questionType">Loại câu hỏi</InputLabel>
                    <Select
                        id="questionType"
                        name="questionType"
                        value={formik.values.questionType}
                        onChange={formik.handleChange}
                        error={formik.touched.questionType && Boolean(formik.errors.questionType)}
                    >
                        <MenuItem value="multipleChoice">Nhiều câu trả lời</MenuItem>
                        <MenuItem value="trueFalse">Đúng/Sai</MenuItem>
                        <MenuItem value="oneChoise">Một câu trả lời</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel shrink htmlFor="difficulty">Độ khó</InputLabel>
                    <Select
                        id="difficulty"
                        name="difficulty"
                        value={formik.values.difficulty}
                        onChange={formik.handleChange}
                        error={formik.touched.difficulty && Boolean(formik.errors.difficulty)}
                    >
                        <MenuItem value="easy">Dễ</MenuItem>
                        <MenuItem value="medium">Trung bình</MenuItem>
                        <MenuItem value="hard">Khó</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel shrink htmlFor="category">Danh mục</InputLabel>
                    <Select
                        id="category"
                        name="category"
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        error={formik.touched.category && Boolean(formik.errors.category)}
                    >
                        {categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel shrink htmlFor="createdBy">Người tạo</InputLabel>
                    <OutlinedInput
                        id="createdBy"
                        name="createdBy"
                        value={formik.values.createdBy}
                        onChange={formik.handleChange}
                        placeholder={teacherName}
                        readOnly
                    />
                </FormControl>
                <Button color="primary" variant="contained" fullWidth type="submit">
                    Tạo câu hỏi
                </Button>
            </form>
        </Box>
    );
};

export default QuestionCreate;
