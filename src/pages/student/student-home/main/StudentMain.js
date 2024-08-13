import React from 'react'
import {Box, Card, CardContent, CardMedia, Grid, TextField, Typography} from "@mui/material";
import defaultCardQuiz from '../../../../asset/default-card-quiz.png';
import {FaSearch} from "react-icons/fa";
import formik, {useFormik} from "formik";
import async from "async";


const StudentMain = () => {

    // const formik =useFormik({
    //     initialValues: {
    //         title: '',
    //         category: ''
    //     }, onSubmit : async (values) =>{
    //         try {
    //             const response = await QuizService.get
    //         }
    //     }
    // })
    return (<Box sx={{padding: '16px'}}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4"></Typography>
        </Box>

        {/* Search Bar */}
        <div style={{backgroundColor: 'var(--color-secondary)', padding: '2px', borderRadius: '8px'}}>
            <form>
                <input className="form-control me-2" type="search" placeholder="Tìm kiếm bằng tên hoặc email"
                       style={{backgroundColor: 'var(--color-bg)', borderRadius: '8px', padding: '5px 10px'}}
                       aria-label="Search"
                       name="email"/>
                <button className="btn" type="submit"><FaSearch/></button>
            </form>
        </div>
        <div className="p-3">
            <h1>Khoa học</h1>
            <Grid container spacing={3} sx={{marginTop: 1, height: '100%'}} justifyContent="center"
                  alignItems="center">{/* This ensures vertical centering*/}
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{
                        maxWidth: 345, boxShadow: 3, transition: 'transform 0.3s', '&:hover': {
                            transform: 'scale(1.2)', cursor: 'pointer'
                        }
                    }}>
                        <CardMedia
                            sx={{height: 140}}
                            image={defaultCardQuiz}
                            title="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Tiêu đề
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Mô tả
                            </Typography>
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="body2" color="text.secondary">
                                    có 15 câu hỏi
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    145 lượt chơi
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>

                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{
                        maxWidth: 345, boxShadow: 3, transition: 'transform 0.3s', '&:hover': {
                            transform: 'scale(1.2)', cursor: 'pointer'
                        }
                    }}>
                        <CardMedia
                            sx={{height: 140}}
                            image={defaultCardQuiz}
                            title="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Tiêu đề của bài kiểm tra
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Mô tả về bài kiểm tra
                            </Typography>
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="body2" color="text.secondary">
                                    có 15 câu hỏi
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    145 lượt chơi
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>

                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{
                        maxWidth: 345, boxShadow: 3, transition: 'transform 0.3s', '&:hover': {
                            transform: 'scale(1.2)', cursor: 'pointer'
                        }
                    }}>
                        <CardMedia
                            sx={{height: 140}}
                            image={defaultCardQuiz}
                            title="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Tiêu đề của bài kiểm tra
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Mô tả về bài kiểm tra
                            </Typography>
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="body2" color="text.secondary">
                                    có 15 câu hỏi
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    145 lượt chơi
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>

                </Grid>
            </Grid></div>

        <div className="p-3">
            <h1>Kỹ thuật</h1>
            <Grid container spacing={3} sx={{marginTop: 1, height: '100%'}} justifyContent="center"
                  alignItems="center">{/* This ensures vertical centering*/}
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{
                        maxWidth: 345, boxShadow: 3, transition: 'transform 0.3s', '&:hover': {
                            transform: 'scale(1.2)', cursor: 'pointer'
                        }
                    }}>
                        <CardMedia
                            sx={{height: 140}}
                            image={defaultCardQuiz}
                            title="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Tiêu đề của bài kiểm tra
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Mô tả về bài kiểm tra
                            </Typography>
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="body2" color="text.secondary">
                                    có 15 câu hỏi
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    145 lượt chơi
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>

                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{
                        maxWidth: 345, boxShadow: 3, transition: 'transform 0.3s', '&:hover': {
                            transform: 'scale(1.2)', cursor: 'pointer'
                        }
                    }}>
                        <CardMedia
                            sx={{height: 140}}
                            image={defaultCardQuiz}
                            title="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Tiêu đề của bài kiểm tra
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Mô tả về bài kiểm tra
                            </Typography>
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="body2" color="text.secondary">
                                    có 15 câu hỏi
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    145 lượt chơi
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>

                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{
                        maxWidth: 345, boxShadow: 3, transition: 'transform 0.3s', '&:hover': {
                            transform: 'scale(1.2)', cursor: 'pointer'
                        }
                    }}>
                        <CardMedia
                            sx={{height: 140}}
                            image={defaultCardQuiz}
                            title="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Tiêu đề của bài kiểm tra
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Mô tả về bài kiểm tra
                            </Typography>
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="body2" color="text.secondary">
                                    có 15 câu hỏi
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    145 lượt chơi
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>

                </Grid>
            </Grid></div>

    </Box>);
}
export default StudentMain
