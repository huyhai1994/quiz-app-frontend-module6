import React, {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@mui/material';
import Swal from 'sweetalert2';
import './QuizzCreate.css';
import {API_CATEGORIES_URL, API_QUESTION_URL} from '../../../../configs/backend.configs';

const QuizCreate = () => {
    const [categories, setCategories] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [quantity, setQuantity] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(API_CATEGORIES_URL);
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`${API_QUESTION_URL}/list`);
                setQuestions(response.data);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchCategories();
        fetchQuestions();
    }, []);

    const formik = useFormik({
        initialValues: {
            title: '', description: '', quizTime: '', quantity: '', passingScore: '', questionIds: [],
        }, validationSchema: Yup.object({
            title: Yup.string().required('Required'),
            description: Yup.string().required('Required'),
            quizTime: Yup.number().required('Required'),
            quantity: Yup.number().required('Required'),
            passingScore: Yup.number().required('Required'),
        }), onSubmit: (values) => {
            values.questionIds = selectedQuestions.slice(0, values.quantity).map((q) => q.questionId);
            values.timestamp = getCurrentTimestamp();
            axios.post('/api/quiz', values)
                .then(response => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Tạo bài thi thành công',
                        text: 'Bạn đã tạo bài thi thành công',
                    }).then(() => {
                        window.location.href = '/teacher/quiz';
                    });
                })
                .catch(error => {
                    console.error('Error submitting quiz:', error);
                });
        },
    });

    const getCurrentTimestamp = () => {
        const now = new Date();
        const pad = (num, size) => ('000' + num).slice(size * -1);
        const date = [now.getFullYear(), pad(now.getMonth() + 1, 2), pad(now.getDate(), 2)].join('-');
        const time = [pad(now.getHours(), 2), pad(now.getMinutes(), 2), pad(now.getSeconds(), 2)].join(':');
        const milliseconds = pad(now.getMilliseconds(), 3);
        return `${date} ${time}.${milliseconds}`;
    };

    const handleQuestionClick = (question) => {
        if (selectedQuestions.includes(question)) {
            setSelectedQuestions(selectedQuestions.filter(q => q !== question));
        } else if (selectedQuestions.length < quantity) {
            setSelectedQuestions([...selectedQuestions, question]);
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Số câu hỏi vượt quá giới hạn.',
                text: ` Bạn chỉ có thể lựa chọn ${quantity} câu hỏi `,
            });
        }
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleQuantityChange = (event) => {
        const value = event.target.value;
        setQuantity(value);
        formik.handleChange(event);

        // Clear selected questions if quantity is cleared or set to zero
        if (value === '' || value === '0') {
            setSelectedQuestions([]);
        }
    };

    const filteredQuestions = questions.filter(question => question.categoryName === selectedCategory);

    return (
        <Box sx={{maxWidth: 1200, margin: 'auto', mt: 4, padding: 3}}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
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
                        <TextField
                            label="Mô tả"
                            fullWidth
                            margin="normal"
                            id="description"
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="quizTime-label">Thời gian làm bài</InputLabel>
                            <Select
                                labelId="quizTime-label"
                                id="quizTime"
                                name="quizTime"
                                value={formik.values.quizTime}
                                onChange={formik.handleChange}
                                error={formik.touched.quizTime && Boolean(formik.errors.quizTime)}
                            >
                                <MenuItem value={5}>5 phút</MenuItem>
                                <MenuItem value={10}>10 phút</MenuItem>
                                <MenuItem value={15}>15 phút</MenuItem>
                                <MenuItem value={20}>20 phút</MenuItem>
                                <MenuItem value={30}>30 phút</MenuItem>
                                <MenuItem value={60}>60 phút</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="category-label">Danh mục</InputLabel>
                            <Select
                                labelId="category-label"
                                id="category"
                                name="category"
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category.id} value={category.name}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            label="Số lượng câu hỏi"
                            fullWidth
                            margin="normal"
                            id="quantity"
                            name="quantity"
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}
                            error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                            helperText={formik.touched.quantity && formik.errors.quantity}
                        />
                        <TextField
                            label="Điểm đạt "
                            fullWidth
                            margin="normal"
                            id="passingScore"
                            name="passingScore"
                            type="number"
                            value={formik.values.passingScore}
                            onChange={formik.handleChange}
                            error={formik.touched.passingScore && Boolean(formik.errors.passingScore)}
                            helperText={formik.touched.passingScore && formik.errors.passingScore}
                        />
                        <Button variant="contained" fullWidth type="submit" sx={{mt: 3}}>
                            Tạo mới
                        </Button>
                    </form>
                </Grid>
                {quantity && selectedCategory && (
                    <Grid item xs={12} md={6} className='question-select-box'>
                        <Typography variant="h6" sx={{mb: 2}}>Xin mời lựa chọn câu hỏi: </Typography>
                        <List sx={{maxHeight: 400, overflow: 'auto', background: '#f0f0f0', padding: '8px'}}>
                            {filteredQuestions.map((question) => (
                                <ListItem
                                    key={question.questionId}
                                    button
                                    onClick={() => handleQuestionClick(question)}
                                    selected={selectedQuestions.includes(question)}
                                    sx={{
                                        margin: '8px 0',
                                        padding: '8px',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                        backgroundColor: selectedQuestions.includes(question) ? '#d3d3d3' : 'white',
                                    }}
                                >
                                    <ListItemText primary={question.questionText}/>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};

export default QuizCreate;
