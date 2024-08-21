import React, {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    IconButton,
    InputLabel,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Modal,
    Select,
    Slider,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ClearIcon from '@mui/icons-material/Clear';
import Swal from 'sweetalert2';
import {MultiSelect} from 'react-multi-select-component';
import {API_CATEGORIES_URL, API_QUESTION_URL, API_QUIZ_URL} from '../../../../configs/backend.configs';
import QuizService from "../../../../services/quiz.service";
import {useNavigate} from "react-router-dom";
import './QuizzCreate.css';

const QuizCreate = () => {
    const [quizCategories, setQuizCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [quantity, setQuantity] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('');
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
            title: '',
            description: '',
            quizTime: 1, // Set default value to 1 minutes
            quantity: '',
            passingScore: '',
            difficulty: '',
            quizCategoryId: '',
            questionIds: [],
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .required('Required')
                .test('unique-title', 'Title already exists', value => !existingQuizTitles.includes(value)),
            description: Yup.string().required('Description is required'),
            quizTime: Yup.number().required('Time is required'),
            quantity: Yup.number().required('Quantity is required'),
            passingScore: Yup.number().required('Passing score is required'),
            difficulty: Yup.string().required('Difficulty is required'),
            quizCategoryId: Yup.string().required('Category is required'),
        }),
        onSubmit: (values) => {
            values.questionIds = selectedQuestions.slice(0, values.quantity).map((q) => q.value);
            values.timeCreated = getCurrentTimestamp();
            values.difficulty = values.difficulty.toUpperCase();
            const selectedCategoryObject = quizCategories.find(category => category.name === selectedCategory);
            values.quizCategoryId = selectedCategoryObject ? {
                id: selectedCategoryObject.id,
                name: selectedCategoryObject.name
            } : null;
            QuizService.addQuiz(values)
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Bài thi tạo thành công!',
                        text: 'Đã thêm bài thi vào hệ thống',
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
                title: 'Question limit exceeded',
                text: `You can only select ${quantity} questions`,
                position: 'top'
            });
        }
    };
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        formik.setFieldValue('quizCategoryId', event.target.value);
    };
    const handleQuantityChange = (event) => {
        const value = event.target.value;
        setQuantity(value);
        formik.handleChange(event);

        if (value === '' || value === '0') {
            setSelectedQuestions([]);
        }
    };
    const handleDifficultyChange = (event) => {
        setSelectedDifficulty(event.target.value);
        formik.handleChange(event);
    };
    const handleOpenModal = () => {
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
    };
    const marks = [
        {value: 1, label: "1"},
        {value: 3, label: '3'},
        {value: 5, label: '5 '},
        {value: 10, label: '10'},
        {value: 15, label: '15'},
        {value: 20, label: '20 '},
        {value: 30, label: '30 '},
        {value: 40, label: '45 '},
        {value: 60, label: '60 '},
    ];
    const valuetext = (value) => {
        return `${value} phút`;
    };
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
                        <InputLabel id="quizTime-label"><AccessAlarmIcon/> Thời gian làm bài (phút)</InputLabel>
                        <Slider
                            aria-label="Custom marks"
                            defaultValue={1} // Set default value to 5 minutes
                            getAriaValueText={valuetext}
                            step={null}
                            color='var(--color-primary)'
                            className='mt-5'
                            min={1}
                            max={60}
                            marks={marks}
                            id="quizTime"
                            name="quizTime"
                            value={formik.values.quizTime}
                            onChange={(event, value) => formik.setFieldValue('quizTime', value)}
                            error={formik.touched.quizTime && Boolean(formik.errors.quizTime)}
                        />
                        <FormHelperText>Thời gian mặc định là 5 phút</FormHelperText>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="difficulty-label">Độ khó</InputLabel>
                        <Select
                            labelId="difficulty-label"
                            id="difficulty"
                            name="difficulty"
                            value={selectedDifficulty}
                            onChange={handleDifficultyChange}
                            variant='standard'>
                            <MenuItem value="EASY">Dễ</MenuItem>
                            <MenuItem value="MEDIUM">Trung bình</MenuItem>
                            <MenuItem value="HARD">Khó</MenuItem>
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
                        <Button fullWidth onClick={handleOpenModal} sx={{mt: 2}}>
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
                <Box className="selected-questions-container shadow">
                    <Typography
                        variant="h6" className='text-center mt-3'
                        sx={{fontWeight: 'bold', color: 'var(--color-primary)'}}
                    >Câu hỏi đã chọn</Typography>
                    <List>
                        {selectedQuestions.map((question) => (
                            <ListItem
                                key={question.value}
                                onClick={() => handleQuestionClick(question)}
                                className='shadow my-2'
                                sx={{
                                    transition: 'transform 0.2s ease-in-out', // Smooth transition for the scale effect
                                    '&:hover': {
                                        backgroundColor: 'var(--color-secondary)',
                                        transform: 'scale(1.05)', // Slightly increase the size on hover
                                    },
                                }}
                            >
                                <ListItemText primary={question.label}/>
                                <Tooltip title="Ấn để xóa !" enterDelay={300} leaveDelay={200}>
                                    <IconButton>
                                        <ClearIcon/>
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
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '50%',
                        maxWidth: '90%',
                        maxHeight: '80vh',
                        overflowY: 'auto',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                        backgroundColor: 'white',
                    }}
                >
                    <Typography id="modal-modal-title"
                                variant="h4"
                                sx={{
                                    color: 'var(--color-primary)',
                                    fontWeight: 'bold'
                                }}
                                className='text-center'
                    >
                        Chọn câu hỏi
                    </Typography>
                    <List className='my-4'>
                        {categories.map((category) => (
                            <React.Fragment key={category.id}>
                                <Typography variant="h5" className='my-2'>{category.name}</Typography>
                                <MultiSelect
                                    options={questions.filter(question => question.categoryName.trim() === category.name.trim()).map(question => ({
                                        label: `${question.questionText} (${question.questionId})`,
                                        value: question.questionId
                                    }))}
                                    value={selectedQuestions.filter(sq => questions.find(
                                        q => q.questionId === sq.value
                                            && q.categoryName.trim() === category.name.trim()))}
                                    onChange={(selected) => {
                                        const filteredOutQuestions = selectedQuestions.filter(sq => !questions.find(q => q.questionId === sq.value && q.categoryName.trim() === category.name.trim()));
                                        // Calculate the total number of selected questions after this change
                                        const totalSelected = [...filteredOutQuestions, ...selected].length;

                                        if (totalSelected > quantity) {
                                            Swal.fire({
                                                icon: 'warning',
                                                title: 'Số lượng câu hỏi đã vượt quá giới hạn',
                                                text: `Bạn chỉ có thể chọn tối đa ${quantity} câu hỏi`,
                                                position: 'top'
                                            });
                                        } else {
                                            setSelectedQuestions([...filteredOutQuestions, ...selected]);
                                        }
                                    }}
                                    labelledBy="Select"
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