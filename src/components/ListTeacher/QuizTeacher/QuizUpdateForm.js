import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    Modal
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { UpdateQuiz } from '../../../store/quizStore/QuizAxios';
import axios from 'axios';
import {API_CATEGORIES_URL, API_QUESTION_URL} from "../../../configs/backend.configs";
import Swal from "sweetalert2";

const QuizUpdateForm = ({quiz, onClose}) => {
    const dispatch = useDispatch();
    const [categories, setCategories] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [filteredQuestions, setFilteredQuestions] = useState([]);

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
        fetchQuestions()

        // if (quiz.question) {
        //     setSelectedQuestions(quiz.question);
        // }
    }, []);



    const formik = useFormik({
        initialValues: {
            title: quiz.title || '',
            description: quiz.description || '',
            quizTime: quiz.quizTime || '',
            quantity: quiz.quantity || '',
            passingScore: quiz.passingScore || '',
            categoryId: quiz.categoryId || '',
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Required'),
            description: Yup.string().required('Required'),
            quizTime: Yup.number().required('Required'),
            quantity: Yup.number().required('Required'),
            passingScore: Yup.number().required('Required'),
            categoryId: Yup.string().required('Required'),
        }),
        onSubmit: (values) => {
            const updatedQuiz = {
                ...values,
                questionIds: selectedQuestions.map(q => q.questionId),
            };
            dispatch(UpdateQuiz({ id: quiz.quizzesId, quiz: updatedQuiz }))
                .then(() => {
                    onClose();
                })
                .catch((error) => {
                    console.error('Error updating quiz:', error);
                });
        }
    })

    // const handleQuestionClick = (question) => {
    //     if (selectedQuestions.find(q => q.questionId === question.questionId)) {
    //         setSelectedQuestions(selectedQuestions.filter(q => q.questionId !== question.questionId));
    //     } else if (selectedQuestions.length < formik.values.quantity) {
    //         selectedQuestions([...selectedQuestions, question]);
    //     } else {
    //         alert(`Bạn chỉ có thể chọn ${formik.values.quantity} câu hỏi`)
    //     }
    // }
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    useEffect(() => {
        if (quiz.categoryId) {
            const category = categories.find(c => c.id === quiz.categoryId);
            if (category) {
                setSelectedCategory(category.name);
            }
        }
    }, [quiz, categories]);

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
                position: 'top'
            });
        }
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
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    // const filteredQuestions = questions.filter(question => question.categoryName === selectedCategory);

    useEffect(() => {
        const filteredQuestions = questions.filter(question => question.categoryName === selectedCategory);
        setFilteredQuestions(filteredQuestions);
    }, [selectedCategory, questions]);

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
                Cập nhật bài thi
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="title"
                    name="title"
                    label="Tiêu đề"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    id="description"
                    name="description"
                    label="Mô tả"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                    margin="normal"
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
                        // value={formik.values.categoryId}
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        // error={formik.touched.categoryId && Boolean(formik.errors.categoryId)}
                    >
                        {categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    fullWidth
                    id="quantity"
                    name="quantity"
                    label="Số lượng câu hỏi"
                    type="number"
                    value={formik.values.quantity}
                    onChange={handleQuantityChange}
                    error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                    helperText={formik.touched.quantity && formik.errors.quantity}
                    margin="normal"
                />
                {quantity && selectedCategory && (
                    <Button variant="outlined" fullWidth onClick={handleOpenModal} sx={{mt: 2}}>
                        Chọn câu hỏi
                    </Button>
                )}
                <TextField
                    fullWidth
                    id="passingScore"
                    name="passingScore"
                    label="Điểm đạt"
                    type="number"
                    value={formik.values.passingScore}
                    onChange={formik.handleChange}
                    error={formik.touched.passingScore && Boolean(formik.errors.passingScore)}
                    helperText={formik.touched.passingScore && formik.errors.passingScore}
                    margin="normal"
                />
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Button onClick={onClose} variant="outlined">
                        Hủy
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                        Cập nhật
                    </Button>
                </Box>
            </form>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Chọn câu hỏi
                    </Typography>
                    <List>
                        {filteredQuestions.map((question) => (
                            <ListItem
                                key={question.questionId}
                                button
                                onClick={() => handleQuestionClick(question)}
                                selected={selectedQuestions.find(q => q.questionId === question.questionId)}
                            >
                                <ListItemText primary={question.questionText} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Modal>
        </Box>
    );
}

export default QuizUpdateForm