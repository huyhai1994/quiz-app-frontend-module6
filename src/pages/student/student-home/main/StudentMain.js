import React from 'react'
import {Box, Card, CardContent, CardMedia, Grid, TextField, Typography} from "@mui/material";
import defaultCardQuiz from '../../../../asset/default-card-quiz.png';

const StudentMain = () => {
    return (<Box sx={{padding: '16px'}}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4">Bạn sẽ học gì trong hôm nay ???</Typography>
        </Box>

        {/* Search Bar */}
        <TextField
            fullWidth
            variant="outlined"
            placeholder="Search for any topic"
            sx={{marginTop: 2}}
        />

        {/* Cards Grid */}
        <Grid
            container
            spacing={3}
            sx={{marginTop: 1, height: '100%'}}
            justifyContent="center"
            alignItems="center"  // This ensures vertical centering
        >
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
        </Grid>
    </Box>);
}
export default StudentMain
