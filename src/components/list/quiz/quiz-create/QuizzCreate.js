import React, {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {Box, Button, Grid, List, ListItem, ListItemText, TextField, Typography} from '@mui/material';
import {API_CATEGORIES_URL, API_QUESTION_URL} from '../../../../configs/backend.configs';

const QuizCreate = () => {
    const [categories, setCategories] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [selectedQuestions, setSelectedQuestions] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(API_CATEGORIES_URL);
                setCategories(response.data); // Assuming response.data is directly usable
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`${API_QUESTION_URL}/list`);
                console.log('Response:', response); // Assuming response.data is directly usable
                setQuestions(response.data); // Assuming response.data is directly usable
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
            values.questionIds = selectedQuestions.map((q) => q.questionId);
            axios.post('/api/quiz', values)
                .then(response => {
                    console.log('Quiz created successfully:', response.data);
                })
                .catch(error => {
                    console.error('Error submitting quiz:', error);
                });
        },
    });

    const handleQuestionClick = (question) => {
        if (selectedQuestions.includes(question)) {
            setSelectedQuestions(selectedQuestions.filter(q => q !== question));
        } else {
            setSelectedQuestions([...selectedQuestions, question]);
        }
    };

    const groupQuestionsByCategory = (questions) => {
        return questions.reduce((acc, question) => {
            const category = question.categoryName;
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(question);
            return acc;
        }, {});
    };

    const groupedQuestions = groupQuestionsByCategory(questions);

    return (<Box sx={{maxWidth: 1200, margin: 'auto', mt: 4, padding: 3}}>
        <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        label="Title"
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
                        label="Description"
                        fullWidth
                        margin="normal"
                        id="description"
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                    />
                    <TextField
                        label="Quiz Time"
                        fullWidth
                        margin="normal"
                        id="quizTime"
                        name="quizTime"
                        type="number"
                        value={formik.values.quizTime}
                        onChange={formik.handleChange}
                        error={formik.touched.quizTime && Boolean(formik.errors.quizTime)}
                        helperText={formik.touched.quizTime && formik.errors.quizTime}
                    />
                    <TextField
                        label="Quantity"
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
                    <TextField
                        label="Passing Score"
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
                        Create Quiz
                    </Button>
                </form>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{mb: 2}}>Select Questions:</Typography>
                <List sx={{maxHeight: 400, overflow: 'auto', background: '#f0f0f0', padding: '8px'}}>
                    {Object.keys(groupedQuestions).map((category) => (<React.Fragment key={category}>
                        <Typography variant="subtitle1" sx={{mt: 2}}>{category}</Typography>
                        {groupedQuestions[category].map((question) => (<ListItem
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
                        </ListItem>))}
                    </React.Fragment>))}
                </List>
            </Grid>
        </Grid>
    </Box>);
};

export default QuizCreate;
