import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {TailSpin} from 'react-loader-spinner';
import Swal from 'sweetalert2';
import {fetchTopQuizzes} from "../../../store/quizStore/QuizAxios";
import {Box, Card, CardContent, Grid, Typography} from '@mui/material';
import KingIcon from '@mui/icons-material/EmojiEvents'; // King icon
import QueenIcon from '@mui/icons-material/EmojiEvents'; // Queen icon
import PrinceIcon from '@mui/icons-material/EmojiEvents'; // Prince icon

const TopQuizzes = () => {
    const dispatch = useDispatch();
    const {topQuizzes, loading, error} = useSelector((state) => state.quizzes);

    useEffect(() => {
        dispatch(fetchTopQuizzes());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            Swal.fire('Lỗi', error, 'error');
        }
    }, [error]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
                <TailSpin color="#00BFFF" height={80} width={80}/>
            </div>
        );
    }

    const getIcon = (index) => {
        switch (index) {
            case 0:
                return <KingIcon style={{fontSize: 50, color: 'gold'}}/>;
            case 1:
                return <QueenIcon style={{fontSize: 50, color: 'silver'}}/>;
            case 2:
                return <PrinceIcon style={{fontSize: 50, color: 'bronze'}}/>;
            default:
                return null;
        }
    };

    return (
        <div className="container mt-4">
            <Typography variant="h4" gutterBottom>Bài Thi Phổ Biến Nhất</Typography>
            <Grid container spacing={3}>
                {topQuizzes.length > 0 ? (
                    topQuizzes.map((quiz, index) => (
                        <Grid item xs={12} sm={6} md={4} key={quiz.id}>
                            <Card>
                                <Box display="flex" justifyContent="center" alignItems="center" p={2}>
                                    {getIcon(index)}
                                </Box>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {quiz.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Số lượt thi: {quiz.resultCount}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="body1" color="text.secondary" align="center">
                        Không có dữ liệu
                    </Typography>
                )}
            </Grid>
        </div>
    );
};

export default TopQuizzes;
