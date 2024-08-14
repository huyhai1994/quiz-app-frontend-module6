import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import defaultCardQuiz from '../../../../asset/default-card-quiz.png';
import { FaSearch } from "react-icons/fa";
import { useFormik } from 'formik';
import QuizService from "../../../../services/quiz.service";

const StudentMain = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        console.log("Fetching quizzes...");
        const response = await QuizService.getAllQuizzes();
        setQuizzes(response.data);
        setFilteredQuizzes(response.data);
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
      const searchQuery = values.search.toLowerCase();
      const filtered = quizzes.filter(quiz =>
          (quiz.title && quiz.title.toLowerCase().includes(searchQuery)) ||
          (quiz.category && quiz.category.name && quiz.category.name.toLowerCase().includes(searchQuery))
      );
      setFilteredQuizzes(filtered);
    },
  });

  const groupByCategory = (quizzes) => {
    return quizzes.reduce((acc, quiz) => {
      const categoryName = quiz.category?.name || "Uncategorized";
      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }
      acc[categoryName].push(quiz);
      return acc;
    }, {});
  };

  const groupedQuizzes = groupByCategory(filteredQuizzes);

  return (
      <Box sx={{ padding: '16px' }}>
        <Box>
          <Typography variant="h4">Bạn muốn làm gì hôm nay?</Typography>
        </Box>

        {/* Thanh tìm kiếm */}
        <div style={{ width: '100%', backgroundColor: 'var(--color-secondary)', padding: '2px', borderRadius: '8px' }}>
          <form onSubmit={formik.handleSubmit} style={{display: 'flex', alignItems: 'center', width: '100%'}}>
            <input
                className="form-control me-2"
                type="search"
                placeholder="Tìm kiếm bằng tên hoặc danh mục"
                style={{ backgroundColor: 'var(--color-bg)', borderRadius: '8px', padding: '5px 10px', flex: 1 }}
                aria-label="Search"
                name="search"
                value={formik.values.search}
                onChange={formik.handleChange}
            />
            <button className="btn" type="submit"><FaSearch /></button>
          </form>
        </div>

        <div className="p-3">
          {Object.keys(groupedQuizzes).map(categoryName => (
              <div key={categoryName}>
                <h1>{categoryName}</h1>
                <Grid container spacing={3} sx={{ marginTop: 1, height: '100%' }} justifyContent="center" alignItems="center">
                  {groupedQuizzes[categoryName]
                      .sort((a, b) => (b.category?.playCount || 0) - (a.category?.playCount || 0))  // Sắp xếp theo lượt chơi giảm dần
                      .map((quiz) => (
                          <Grid item xs={12} sm={6} md={4} key={quiz.id}>
                            <Card sx={{ maxWidth: 345, boxShadow: 3, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.2)', cursor: 'pointer' } }}>
                              <CardMedia sx={{ height: 140 }} image={defaultCardQuiz} title={quiz.title} />
                              <CardContent>
                                <Typography gutterBottom variant="h5" component="div">{quiz.title}</Typography>
                                <Typography variant="body2" color="text.secondary">{quiz.category?.description || "No description available"}</Typography>
                                <Box display="flex" justifyContent="space-between">
                                  <Typography variant="body2" color="text.secondary">Có {quiz.questions?.length || 0} câu hỏi</Typography>
                                  <Typography variant="body2" color="text.secondary">{quiz.category?.playCount || 0} lượt chơi</Typography>
                                </Box>
                              </CardContent>
                            </Card>
                          </Grid>
                      ))}
                </Grid>
              </div>
          ))}
        </div>
      </Box>
  );
};

export default StudentMain;
