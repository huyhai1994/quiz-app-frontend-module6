import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {TailSpin} from 'react-loader-spinner';
import Swal from 'sweetalert2';
import {fetchTopQuizzes} from "../../../store/quizStore/QuizAxios";
import {Box, Card, CardContent, Typography} from '@mui/material';
import KingIcon from '@mui/icons-material/EmojiEvents';
import QueenIcon from '@mui/icons-material/EmojiEvents';
import PrinceIcon from '@mui/icons-material/EmojiEvents';
import AttemptIcon from '@mui/icons-material/CheckCircle';
import {useLocation, useNavigate} from 'react-router-dom';

const TopQuizzes = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
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
                return <KingIcon style={{fontSize: 100, color: 'gold'}}/>;
            case 1:
                return <QueenIcon style={{fontSize: 100, color: 'silver'}}/>;
            case 2:
                return <PrinceIcon style={{fontSize: 100, color: 'bronze'}}/>;
            default:
                return null;
        }
    };

    const handleCardClick = (quizId) => {
        const queryParams = new URLSearchParams(location.search);
        const resultIdFromQuery = queryParams.get('resultId');
        navigate(`/student/quizzes/${quizId}/start?resultId=${resultIdFromQuery}`);
    };

    return (
        <Box className='py-5' color='var(--color-primary)' display="flex" flexDirection="column" alignItems="center"
             minHeight="100vh" p={3}>
            <Typography variant="h4" gutterBottom sx={{fontWeight: 'bold'}}>
                Bài Thi HOT
            </Typography>
            <Box className="" display="flex" flexWrap="wrap" justifyContent="center" gap={3} width="100%">
                {topQuizzes.length > 0 ? (
                    topQuizzes.map((quiz, index) => (
                        <Card
                            key={quiz.id}
                            onClick={() => handleCardClick(quiz.id)}
                            sx={{
                                cursor: 'pointer',
                                flex: '1 1 calc(25% - 16px)', // Default to 3 cards per row
                                maxWidth: 'calc(25% - 16px)', // Max width to ensure proper wrapping
                                mb: 3, // Margin bottom
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                '&:hover': {
                                    transform: 'scale(1.05)', // Slightly bigger on hover
                                    boxShadow: '0 4px 20px var(--color-secondary)', // Shadow color change
                                },
                                '@media (max-width: 1024px)': {
                                    flex: '1 1 calc(50% - 16px)', // 2 cards per row on medium screens
                                    maxWidth: 'calc(50% - 16px)',
                                },
                                '@media (max-width: 768px)': {
                                    flex: '1 1 calc(100% - 16px)', // 1 card per row on small screens
                                    maxWidth: 'calc(100% - 16px)',
                                }
                            }}
                        >
                            <Box display="flex" justifyContent="center" alignItems="center" p={2}>
                                {getIcon(index)}
                            </Box>
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography variant="h5" component="div">
                                        {quiz.title}
                                    </Typography>
                                    <Box display="flex" alignItems="center">
                                        <AttemptIcon style={{marginRight: 4}}/>
                                        <Typography variant="h6" color="text.secondary">
                                            Số lượt thi: {quiz.resultCount}
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Typography variant="body1" color="text.secondary" align="center">
                        Không có dữ liệu
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default TopQuizzes;
