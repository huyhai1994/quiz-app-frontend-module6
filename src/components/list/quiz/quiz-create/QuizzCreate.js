import React, {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
    Box,
    Button,
    FormControl,
    IconButton,
    InputLabel,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Modal,
    Select,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import Swal from 'sweetalert2';
import DeleteIcon from '@mui/icons-material/Delete';
import './QuizzCreate.css';
import {MultiSelect} from 'react-multi-select-component';
import {API_CATEGORIES_URL, API_QUESTION_URL, API_QUIZ_URL} from '../../../../configs/backend.configs';
import QuizService from "../../../../services/quiz.service";
import {useNavigate} from "react-router-dom";

const QuizCreate = () => {
    const [quizCategories, setQuizCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [quantity, setQuantity] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [existingQuizTitles, setExistingQuizTitles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuizCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8080/quiz-categories');
                setQuizCategories(response.data);
            } catch (error) {
                console.error('Error fetching quiz categories:', error);
            }
        };

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

        const fetchQuizTitles = async () => {
            try {
                const response = await axios.get(`${API_QUIZ_URL}/titles`);
                setExistingQuizTitles(response.data.map(quiz => quiz.title));
            } catch (error) {
                console.error('Error fetching quiz titles:', error);
            }
        };

        fetchQuizCategories();
        fetchCategories();
        fetchQuestions();
        fetchQuizTitles();
    }, []);

    const formik = useFormik({
        initialValues: {
            title: '', description: '', quizTime: '', quantity: '', passingScore: '', questionIds: [],
        }, validationSchema: Yup.object({
            title: Yup.string()
                .required('Required')
                .test('unique-title', 'xin mời nhập lại tiêu đề đã tồn tại trong hệ thống', value => !existingQuizTitles.includes(value)),
            description: Yup.string().required('Cần nhập mô tả cho bài thi'),
            quizTime: Yup.number().required('Cần nhập thời gian thi'),
            quantity: Yup.number().required('Cần nhập số lượng câu hỏi'),
            passingScore: Yup.number().required('cần nhập điểm đạt '),
        }), onSubmit: (values) => {
            values.questionIds = selectedQuestions.slice(0, values.quantity).map((q) => q.value);
            values.timeCreated = getCurrentTimestamp();
            localStorage.getItem('userId');
            QuizService.addQuiz(values)
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Tạo bài thi thành công',
                        text: 'Bạn đã tạo bài thi thành công',
                    }).then(() => {
                        navigate('/teacher/teacher-quizzes');
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
                position: 'top'
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

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const filteredQuestions = questions.filter(question => question.categoryName === selectedCategory);

    return (
        <Box className="quiz-create-container">
            <Box className="quiz-create-form p-3">
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
                            variant='standard'>
                            <MenuItem value={5}>5 phút</MenuItem>
                            <MenuItem value={10}>10 phút</MenuItem>
                            <MenuItem value={15}>15 phút</MenuItem>
                            <MenuItem value={20}>20 phút</MenuItem>
                            <MenuItem value={30}>30 phút</MenuItem>
                            <MenuItem value={60}>60 phút</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="quizCategory-label">Danh mục bài thi</InputLabel>
                        <Select
                            labelId="quizCategory-label"
                            id="quizCategory"
                            name="quizCategory"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            variant='standard'>
                            {quizCategories.map((category) => (
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
                    {quantity && selectedCategory && (
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
                    <Button variant="contained" className="submit-quiz-create-button" fullWidth type="submit"
                            sx={{mt: 3}}>
                        Tạo mới
                    </Button>
                </form>
            </Box>
            {selectedQuestions.length > 0 && (
                <Box className="selected-questions-container">
                    <Typography variant="h6">Câu hỏi đã chọn:</Typography>
                    <List>
                        {selectedQuestions.map((question) => (
                            <ListItem key={question.value} onClick={() => handleQuestionClick(question)}>
                                <ListItemText primary={question.label}/>
                                <Tooltip title="Remove question">
                                    <IconButton>
                                        <DeleteIcon/>
                                    </IconButton>
                                </Tooltip>
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
                        {categories.map((category) => (
                            <React.Fragment key={category.id}>
                                <Typography variant="h5">{category.name}</Typography>
                                <MultiSelect
                                    options={questions.filter(question => question.categoryName === category.name).map(question => ({
                                        label: question.questionText,
                                        value: question.questionId
                                    }))}
                                    variant='h6'
                                    value={selectedQuestions}
                                    onChange={setSelectedQuestions}
                                    labelledBy="Chọn câu hỏi"
                                />
                            </React.Fragment>
                        ))}
                    </List>
                </Box>
            </Modal>
        </Box>
    );
};

export default QuizCreate;
