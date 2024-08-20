import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Typography
} from '@mui/material';
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
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryRes = await CategoryService.getAllCategories();
                setCategories(categoryRes.data);

                const questionTypeRes = await QuestionTypeService.getAllQuestionTypes();
                setQuestionTypes(questionTypeRes.data);

                const userRes = await axiosInstance.get('/users/profile');
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
            title: '',
            questionType: '',
            difficulty: '',
            category: '',
            createdBy: teacherName,
            options: []
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await QuestionService.addQuestion({...values, options}, userId);
                await Swal.fire({
                    title: "Thành công",
                    text: "Câu hỏi và tùy chọn đã được tạo",
                    icon: "success"
                });

                navigate("/teacher/question");
            } catch (error) {
                await Swal.fire('Thất bại', error || 'Xin vui lòng kiểm tra lại thông tin vừa nhập!', 'error');
                console.error("Error creating question", values);
            }
        }
    });

    useEffect(() => {
        if (formik.values.questionType) {
            initializeOptions(formik.values.questionType);
        }
    }, [formik.values.questionType]);

    const initializeOptions = (type) => {
        let initialOptions = [];
        if (type === 1 || type === 2) {
            initialOptions = [
                {optionText: '', isCorrect: false},
                {optionText: '', isCorrect: false},
                {optionText: '', isCorrect: false},
                {optionText: '', isCorrect: false}
            ];
        } else if (type === 3) {
            initialOptions = [
                {optionText: 'Đúng', isCorrect: false},
                {optionText: 'Sai', isCorrect: false}
            ];
        }
        setOptions(initialOptions);
    };

    const handleOptionChange = (index, field, value) => {
        const newOptions = [...options];
        if (field === 'isCorrect' && value === true && (formik.values.questionType === 1 || formik.values.questionType === 3)) {
            newOptions.forEach((option, i) => {
                option.isCorrect = i === index;
            });
        } else {
            newOptions[index][field] = value;
        }
        setOptions(newOptions);
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box className="container" sx={{mx: 5, mt: 4, padding: 3}}>
            <form onSubmit={formik.handleSubmit} className='shadow p-3 rounded-md'>
                <Typography className='text-center' variant='h4'
                            sx={{color: "var(--color-primary)", fontWeight: 'bold'}}>
                    Tạo mới câu hỏi
                </Typography>
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
                    InputProps={{style: {backgroundColor: 'white'}}}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel htmlFor="questionType">Loại câu hỏi</InputLabel>
                    <Select
                        id="questionType"
                        name="questionType"
                        value={formik.values.questionType}
                        onChange={formik.handleChange}
                        error={formik.touched.questionType && Boolean(formik.errors.questionType)}
                        variant='standard'>
                        {questionTypes.map((type) => (
                            <MenuItem key={type.id} value={type.id}>
                                {type.typeName === "ONE" ? "Một câu đúng" :
                                    type.typeName === "MANY" ? "Nhiều câu đúng" :
                                        "Đúng/sai"}
                            </MenuItem>
                        ))}
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
                        variant='standard'>
                        <MenuItem value="EASY" sx={{bgColor: 'red'}}>Dễ</MenuItem>
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
                        variant='standard'>
                        {categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {formik.values.questionType && (
                    <div className="row">
                        {options.map((option, index) => (
                            <div className="col-12 col-sm-6 col-md-3" key={index}>
                                <div className="option-container">
                                    {formik.values.questionType !== 3 && (
                                        <OutlinedInput
                                            className="option-input"
                                            id={`option-${index}`}
                                            name={`option-${index}`}
                                            value={option.optionText}
                                            onChange={(e) => handleOptionChange(index, 'optionText', e.target.value)}
                                            placeholder={`Nhập tùy chọn ${index + 1}`}
                                        />
                                    )}
                                    <FormControlLabel
                                        control={<Checkbox
                                            checked={option.isCorrect}
                                            onChange={(e) => handleOptionChange(index, 'isCorrect', e.target.checked)}
                                            sx={{
                                                color: 'var(--color-primary)',
                                                '&.Mui-checked': {
                                                    color: 'var(--color-primary)',
                                                },
                                            }}
                                        />}
                                        label={formik.values.questionType === 3 ? option.optionText : "Đúng"}
                                        className="switch-label"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <Button className='question-submit-button mt-3' variant="contained" fullWidth type="submit">
                    Tạo câu hỏi và tùy chọn
                </Button>
            </form>
        </Box>
    );

};

export default QuestionCreate;
