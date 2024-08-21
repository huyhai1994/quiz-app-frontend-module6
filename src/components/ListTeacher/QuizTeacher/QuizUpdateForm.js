import React, {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Modal,
    Select,
    TextField,
    Typography
} from '@mui/material';
import Swal from 'sweetalert2';
import {API_CATEGORIES_URL, API_QUESTION_URL} from "../../../configs/backend.configs";
import {useDispatch} from "react-redux";
import {UpdateQuiz} from "../../../store/quizStore/QuizAxios";

const QuizUpdateForm = ({quiz, onClose, onUpdate}) => {
    const dispatch = useDispatch()
    const [categories, setCategories] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        axios.get(API_CATEGORIES_URL)
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error fetching categories:', error));

        axios.get(`${API_QUESTION_URL}/list`)
            .then(response => setQuestions(response.data))
            .catch(error => console.error('Error fetching questions:', error));

        setSelectedQuestions(quiz.questions || []);
        setSelectedCategory(quiz.category?.name || '');
    }, [quiz]);

    const formik = useFormik({
        initialValues: {
            title: quiz.quizzesTitle || '',
            description: quiz.quizzesDescription || '',
            quizTime: quiz.quizzesTime || '',
            quantity: quiz.quantity || '',
            passingScore: quiz.passingScore || '',
            questionIds: quiz.questions?.map(q => q.id) || [],
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Required'),
            description: Yup.string().required('Required'),
            quizTime: Yup.number().required('Required'),
            quantity: Yup.number().required('Required'),
            passingScore: Yup.number().required('Required'),
        }),
        onSubmit: (values) => {
            const updatedQuiz = {
                ...values,
                quizzesId: quiz.quizzesId,
                questionIds: selectedQuestions.map(q => q.questionId),
            };
            // axios.put(`http://localhost:8080/quiz/update/${quiz-room.quizzesId}`, updatedQuiz)
            dispatch(UpdateQuiz({id: quiz.quizzesId, quiz: updatedQuiz}))
                .unwrap()
                .then((response) => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Cập nhật bài thi thành công',
                        text: 'Bạn đã cập nhật bài thi thành công',
                    });
                    onUpdate(response);
                    onClose();
                })
                .catch(error => {
                    console.error('Error updating quiz-room:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Lỗi',
                        text: 'Đã xảy ra lỗi khi cập nhật bài thi',
                    });
                });
        },
    });

    const handleQuestionClick = (question) => {
        if (selectedQuestions.find(q => q.questionId === question.questionId)) {
            setSelectedQuestions(selectedQuestions.filter(q => q.questionId !== question.questionId));
        } else if (selectedQuestions.length < formik.values.quantity) {
            setSelectedQuestions([...selectedQuestions, question]);
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Số câu hỏi vượt quá giới hạn.',
                text: `Bạn chỉ có thể lựa chọn ${formik.values.quantity} câu hỏi`,
                position: 'top'
            });
        }
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const filteredQuestions = questions.filter(question => question.categoryName === selectedCategory);

    return (
        <Box className="quiz-update-form p-3">
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
                    value={formik.values.quantity}
                    onChange={formik.handleChange}
                    error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                    helperText={formik.touched.quantity && formik.errors.quantity}
                />
                {formik.values.quantity && selectedCategory && (
                    <Button variant="outlined" fullWidth onClick={handleOpenModal} sx={{mt: 2}}>
                        Chọn câu hỏi
                    </Button>
                )}
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
                <Button variant="contained" className="submit-quiz-update-button" fullWidth type="submit" sx={{mt: 3}}>
                    Cập nhật
                </Button>
                <Button variant="outlined" fullWidth onClick={onClose} sx={{mt: 2}}>
                    Hủy
                </Button>
            </form>
            {selectedQuestions.length > 0 && (
                <Box className="selected-questions-container">
                    <Typography variant="h6">Câu hỏi đã chọn:</Typography>
                    <List>
                        {selectedQuestions.map((question) => (
                            <ListItem key={question.questionId} button onClick={() => handleQuestionClick(question)}>
                                <ListItemText primary={question.questionText}/>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            )}
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
                            <ListItem key={question.questionId} button onClick={() => handleQuestionClick(question)}>
                                <ListItemText primary={question.questionText}/>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Modal>
        </Box>
    );
};

export default QuizUpdateForm;
