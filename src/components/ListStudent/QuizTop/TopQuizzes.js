import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {TailSpin} from 'react-loader-spinner';
import Swal from 'sweetalert2';
import {fetchTopQuizzes} from "../../../store/quizStore/QuizAxios";
import {Box, Card, CardContent, Typography} from '@mui/material';
import KingIcon from '@mui/icons-material/EmojiEvents'; // King icon
import QueenIcon from '@mui/icons-material/EmojiEvents'; // Queen icon
import PrinceIcon from '@mui/icons-material/EmojiEvents'; // Prince icon
import AttemptIcon from '@mui/icons-material/CheckCircle'; // Attempt icon
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
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
        return (<div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
                <TailSpin color="#00BFFF" height={80} width={80}/>
            </div>);
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

    const responsive = {
        superLargeDesktop: {
            breakpoint: {max: 4000, min: 1024}, items: 3
        }, desktop: {
            breakpoint: {max: 1024, min: 768}, items: 3
        }, tablet: {
            breakpoint: {max: 768, min: 464}, items: 2
        }, mobile: {
            breakpoint: {max: 464, min: 0}, items: 1
        }
    };

    const handleCardClick = (quizId) => {
        const queryParams = new URLSearchParams(location.search);//TODO: Hỏi lại tiến chỗ này
        const resultIdFromQuery = queryParams.get('resultId');
        navigate(`/student/quizzes/${quizId}/start?resultId=${resultIdFromQuery}`);
    };
    return (<Box display="flex" justifyContent="center" minHeight="100vh">
            <div className="container mt-5">
                <Typography variant="h4" gutterBottom>Bài Thi Phổ Biến Nhất</Typography>
                {topQuizzes.length > 0 ? (<Box>
                        <Carousel responsive={responsive}>
                            {topQuizzes.map((quiz, index) => (<div key={quiz.id}>
                                    <Card className='mx-3' onClick={() => handleCardClick(quiz.id)}
                                          style={{cursor: 'pointer'}}>
                                        <Box display="flex" justifyContent="center" alignItems="center" p={2}>
                                            {getIcon(index)}
                                        </Box>
                                        <CardContent>
                                            <Box className='d-flex justify-content-between align-items-center'>
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
                                </div>))}
                        </Carousel>
                    </Box>) : (<Typography variant="body1" color="text.secondary" align="center">
                        Không có dữ liệu
                    </Typography>)}
            </div>
        </Box>);
};

export default TopQuizzes;
