import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, CardMedia, Grid, TextField, Typography } from "@mui/material";
import defaultCardQuiz from '../../../../asset/default-card-quiz.png';
import { FaSearch } from "react-icons/fa";
import { useFormik } from 'formik';
import { getAllQuizzes } from '../../../../services/quiz.service';  // Assuming QuizService is defined in a separate file

const StudentMain = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        console.log(response)
        const response = await getAllQuizzes();
        setQuizzes(response.data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, []);


  const formik = useFormik({
    initialValues: {
      search: '',
    },
    onSubmit: (values) => {
      // Handle form submission (e.g., filter quizzes based on search input)
      // You can access the search input using values.search
    },
  });

  return (
    <Box sx={{ padding: '16px' }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Danh sách bài thi</Typography>
      </Box>

      {/* Search Bar */}
      <div style={{ backgroundColor: 'var(--color-secondary)', padding: '2px', borderRadius: '8px' }}>
        <form onSubmit={formik.handleSubmit}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Tìm kiếm bằng tên hoặc email"
            style={{ backgroundColor: 'var(--color-bg)', borderRadius: '8px', padding: '5px 10px' }}
            aria-label="Search"
            name="search"
            value={formik.values.search}
            onChange={formik.handleChange}
          />
          <button className="btn" type="submit"><FaSearch /></button>
        </form>
      </div>

      <div className="p-3">
        <h1></h1>
        <Grid container spacing={3} sx={{ marginTop: 1, height: '100%' }} justifyContent="center" alignItems="center">
          {quizzes
            .sort((a, b) => b.category.playCount - a.category.playCount)
            .map((quiz) => (
              <Grid item xs={12} sm={6} md={4} key={quiz.id}>
                <Card sx={{ maxWidth: 345, boxShadow: 3, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.2)', cursor: 'pointer' } }}>
                  <CardMedia sx={{ height: 140 }} image={defaultCardQuiz} title={quiz.title} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">{quiz.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{quiz.category.description}</Typography>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2" color="text.secondary">Có {quiz.questions.length} câu hỏi</Typography>
                      <Typography variant="body2" color="text.secondary">{quiz.category.playCount} lượt chơi</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </div>
    </Box>
  );
};

export default StudentMain;