import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {TailSpin} from "react-loader-spinner";
import {ListTeacherQuizzes} from "../../../store/quizStore/QuizAxios";
import {format} from "date-fns";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import {
    Box,
    Button,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility'; // Import the eye icon
import './QuizTeacherList.css';
import Page from "../../pages/Page";

const ListTeacherQuizzesComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {quizzes, loading, error} = useSelector((state) => state.quizzes);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 20;
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        dispatch(ListTeacherQuizzes(userId));
    }, [dispatch, userId]);

    useEffect(() => {
        if (error) {
            Swal.fire('Lỗi', error, 'error');
        }
    }, [error]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleViewHistory = (quizId) => {
        navigate(`/teacher/quizzes/${quizId}/user-history`);
    };

    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return quizzes.slice(startIndex, endIndex);
    };

    const translateDifficulty = (difficulty) => {
        switch (difficulty) {
            case 'HARD':
                return 'KHÓ';
            case 'MEDIUM':
                return 'TRUNG BÌNH';
            case 'EASY':
                return 'DỄ';
            default:
                return difficulty;
        }
    };

    const getDifficultyBoxColor = (difficulty) => {
        switch (difficulty) {
            case 'HARD':
                return 'red';
            case 'MEDIUM':
                return 'yellow';
            case 'EASY':
                return 'green';
            default:
                return 'grey';
        }
    };

    const currentData = getCurrentPageData();

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
                <TailSpin color="#00BFFF" height={80} width={80}/>
            </div>
        );
    }

    const handlePlayQuiz = (quizId) => {
        navigate(`/teacher/quiz/${quizId}/room`);
    }

    return (
        <Grid container spacing={2} className='p-5 shadow'>
            <Grid item xs={12}>
                <h2 className='fw-bold text-center'>Danh sách bài kiểm tra của giáo viên</h2>
            </Grid>
            <Grid item xs={12}>
                <TableContainer component={Paper} style={{maxHeight: '500px'}}>
                    <Table stickyHeader aria-label="quiz table">
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    style={{fontWeight: 'bold', fontSize: '1.1rem', color: 'black'}}>STT</TableCell>
                                <TableCell style={{fontWeight: 'bold', fontSize: '1.1rem', color: 'black'}}>Tiêu
                                    đề</TableCell>
                                <TableCell style={{fontWeight: 'bold', fontSize: '1.1rem', color: 'black'}}>Mô
                                    tả</TableCell>
                                <TableCell style={{fontWeight: 'bold', fontSize: '1.1rem', color: 'black'}}>Thời gian
                                    tạo</TableCell>
                                <TableCell style={{fontWeight: 'bold', fontSize: '1.1rem', color: 'black'}}>Thời gian
                                    làm bài (phút)</TableCell>
                                <TableCell style={{fontWeight: 'bold', fontSize: '1.1rem', color: 'black'}}>Số
                                    lượng</TableCell>
                                <TableCell style={{fontWeight: 'bold', fontSize: '1.1rem', color: 'black'}}>Điểm
                                    đạt</TableCell>
                                <TableCell style={{fontWeight: 'bold', fontSize: '1.1rem', color: 'black'}}>Độ
                                    khó</TableCell>
                                <TableCell style={{fontWeight: 'bold', fontSize: '1.1rem', color: 'black'}}>Hành
                                    động</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentData.length > 0 ? (
                                currentData.map((quiz, index) => {
                                    const timeCreate = new Date(quiz.quizzesTimeCreate);
                                    const formattedDate = isNaN(timeCreate.getTime()) ? 'N/A' : format(timeCreate, 'dd-MM-yyyy - HH:mm:ss');
                                    return (
                                        <TableRow
                                            key={quiz.quizzesId}
                                            className="quiz-row" // Add class for hover effect
                                        >
                                            <TableCell>{(currentPage - 1) * pageSize + index + 1}</TableCell>
                                            <TableCell>{quiz.quizzesTitle}</TableCell>
                                            <TableCell>{quiz.quizzesDescription}</TableCell>
                                            <TableCell>{formattedDate}</TableCell>
                                            <TableCell>{quiz.quizTime}</TableCell>
                                            <TableCell>{quiz.quantity}</TableCell>
                                            <TableCell>{quiz.passingScore}</TableCell>
                                            <TableCell>
                                                <Box display="flex" alignItems="center">
                                                    <Box
                                                        width={16}
                                                        height={16}
                                                        bgcolor={getDifficultyBoxColor(quiz.difficulty)}
                                                        mr={1}
                                                    />
                                                    <span>{translateDifficulty(quiz.difficulty)}</span>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    startIcon={<VisibilityIcon/>}
                                                    onClick={() => handleViewHistory(quiz.quizzesId)}
                                                >
                                                    Lịch sử
                                                </Button>
                                                <Button
                                                    className="btn btn-primary ml-2"
                                                    onClick={() => handlePlayQuiz(quiz.quizzesId)}
                                                >
                                                    Chơi
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            ) : (
                                <TableRow>
                                    <TableCell colSpan="9">Không có dữ liệu</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={12} className='d-flex align-items-center justify-content-center'>
                <Page
                    currentPage={currentPage}
                    totalPages={Math.ceil(quizzes.length / pageSize)}
                    onPageChange={handlePageChange}
                />
            </Grid>
        </Grid>
    );
};

export default ListTeacherQuizzesComponent;
