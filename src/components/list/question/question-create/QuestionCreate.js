import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from '@mui/material';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../../../../utils/axiosConfig';
import CategoryService from "../../../../services/category.service";
import QuestionTypeService from "../../../../services/question-type.service";
import QuestionService from "../../../../services/question.service";
import './QuestionCreate.css';

const QuestionCreate = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [questionTypes, setQuestionTypes] = useState([]);
    const [teacherName, setTeacherName] = useState('');
    const [userId, setUserId] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryRes = await CategoryService.getAllCategories();
                setCategories(categoryRes.data);

                const questionTypeRes = await QuestionTypeService.getAllQuestionTypes();
                setQuestionTypes(questionTypeRes.data);

                const userRes = await axiosInstance.get('/users/profile');
                console.log("User fetched successfully", userRes.data);
                setTeacherName(userRes.data.name);
                setUserId(userRes.data.id);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching data", err);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Xin vui lòng nhập tiêu đề'),
        questionType: Yup.number().required('Xin vui lòng chọn loại câu hỏi'),
        difficulty: Yup.string().required('Xin vui lòng chọn độ khó'),
        category: Yup.number().required('Xin vui lòng chọn danh mục'),
    });

    const formik = useFormik({
        initialValues: {
            title: '', questionType: '', difficulty: '', category: '', createdBy: teacherName
        }, validationSchema: validationSchema, onSubmit: async (values) => {
            try {
                localStorage.setItem('questionType', values.questionType);
                const response = await QuestionService.addQuestion(values, userId);
                console.log("Question created successfully", values);
                const newQuestionId = response.data.id;
                localStorage.setItem('questionId',
                    newQuestionId
                )
                ;
                Swal.fire({
                    title: "Thành công", text: "Câu hỏi mới đã được tạo", icon: "success"
                });
                navigate("/teacher/option/create");
            } catch (error) {
                Swal.fire('Thất bại', error || 'Xin vui lòng kiểm tra lại thông tin vừa nhập!', 'error');
                console.error("Error creating question", values);
            }
        }
    });

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    return (<Box sx={{
        maxWidth: 600,
        margin: 'auto',
        mt: 4,
        border: '1px solid #ccc',
        borderRadius: 4,
        padding: 3,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    }}>
        <form onSubmit={formik.handleSubmit}>
            <TextField
                label="Tiêu đề"
                fullWidth
                margin="normal"
                id="title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
            />
            <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="questionType">Loại câu hỏi</InputLabel>
                <Select
                    id="questionType"
                    name="questionType"
                    value={formik.values.questionType}
                    onChange={formik.handleChange}
                    error={formik.touched.questionType && Boolean(formik.errors.questionType)}
                >
                    {questionTypes.map((type) => (<MenuItem key={type.id} value={type.id}>
                        {type.typeName === "ONE" ? "Một" : type.typeName === "MANY" ? "Nhiều" : "Đúng/sai"}
                    </MenuItem>))}
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="difficulty">Độ khó</InputLabel>
                <Select
                    id="difficulty"
                    name="difficulty"
                    value={formik.values.difficulty}
                    onChange={formik.handleChange}
                    error={formik.touched.difficulty && Boolean(formik.errors.difficulty)}
                >
                    <MenuItem value="EASY">Dễ</MenuItem>
                    <MenuItem value="MEDIUM">Trung bình</MenuItem>
                    <MenuItem value="HARD">Khó</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="category">Danh mục</InputLabel>
                <Select
                    id="category"
                    name="category"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    error={formik.touched.category && Boolean(formik.errors.category)}
                >
                    {categories.map((category) => (<MenuItem key={category.id} value={category.id}>
                        {category.name}
                    </MenuItem>))}
                </Select>
            </FormControl>
            <TextField
                label="Người tạo"
                fullWidth
                margin="normal"
                id="createdBy"
                name="createdBy"
                value={formik.values.createdBy}
                onChange={formik.handleChange}
                placeholder={teacherName}
                InputProps={{readOnly: true}}
            />
            <Button className='question-submit-button mt-3' variant="contained" fullWidth type="submit">
                Tạo câu hỏi
            </Button>
        </form>
    </Box>);
};

export default QuestionCreate;
