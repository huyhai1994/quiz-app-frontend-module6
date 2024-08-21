import {format} from "date-fns";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import Page from "../../pages/Page";
import {DeleteQuestion, ListTeacherQuestion} from "../../../store/questionStore/QuestionAxios";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {TailSpin} from "react-loader-spinner";
import Swal from "sweetalert2";
import {Link} from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './QuestionTeacherList.css'; // Import the custom CSS file

const ListTeacherQuestions = () => {
    const dispatch = useDispatch();
    const {questions, loading, error} = useSelector((state) => state.questions);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 20;
    const userId = localStorage.getItem('userId');
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedQuestionId, setSelectedQuestionId] = useState(null);

    useEffect(() => {
        dispatch(ListTeacherQuestion(userId));
    }, [dispatch]);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Bạn có chắc chắn muốn xóa câu hỏi này?',
            text: "Bạn sẽ không thể hoàn tác hành động này!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Có, xóa nó!',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(DeleteQuestion(id)).then(() => {
                    Swal.fire(
                        'Đã xóa!',
                        'Câu hỏi đã được xóa.',
                        'success'
                    );
                });
            }
        });
    };

    const confirmDelete = () => {
        dispatch(DeleteQuestion(selectedQuestionId)).then(() => {
            setOpenDialog(false);
            setSelectedQuestionId(null);
        });
    };

    const getQuestionDetail = (id) => {
        // Implement the function to get question details by ID
        console.log(`Fetching details for question ID: ${id}`);
    };

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

    const totalPages = Math.ceil(questions.length / pageSize);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return questions.slice(startIndex, endIndex);
    };

    const mapTypeName = (typeName) => {
        switch (typeName) {
            case "ONE":
                return "Một câu";
            case "MANY":
                return "Nhiều câu";
            case "TRUE_FALSE":
                return "Đúng/Sai";
            default:
                return typeName;
        }
    };

    const currentData = getCurrentPageData();

    return (
        <Grid container spacing={2} className='p-3'>
            <Grid item xs={12}>
                <h2 className='fw-bold text-center'>Danh sách câu hỏi của giáo viên</h2>
            </Grid>
            <Grid item xs={12}>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>STT</TableCell>
                                <TableCell>Câu hỏi</TableCell>
                                <TableCell>Danh mục</TableCell>
                                <TableCell>Loại câu hỏi</TableCell>
                                <TableCell>Thời gian tạo</TableCell>
                                <TableCell>Hành động</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentData.length > 0 ? (
                                currentData.map((question, index) => (
                                    <TableRow
                                        key={question.questionId}
                                        className="question-row" // Add a class for hover effect
                                        onMouseEnter={() => setSelectedQuestionId(question.questionId)}
                                        onMouseLeave={() => setSelectedQuestionId(null)}
                                    >
                                        <TableCell>{(currentPage - 1) * pageSize + index + 1}</TableCell>
                                        <TableCell>{question.questionText}</TableCell>
                                        <TableCell>{question.categoryName}</TableCell>
                                        <TableCell>{mapTypeName(question.typeName)}</TableCell>
                                        <TableCell>{format(new Date(question.timeCreate), 'dd-MM-yyyy - HH:mm:ss')}</TableCell>
                                        <TableCell>
                                            <div className="action-icons">
                                                <Button
                                                    variant="standard"
                                                    startIcon={<DeleteIcon/>}
                                                    style={{color: 'red'}}
                                                    onClick={() => handleDelete(question.questionId)}
                                                    className="icon-button"
                                                />
                                                <Button
                                                    variant="standard"
                                                    startIcon={<EditIcon/>}
                                                    component={Link}
                                                    to={`/teacher/question/edit/${question.questionId}`}
                                                    className="icon-button"
                                                />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan="6">Không có dữ liệu</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={12} className='d-flex align-items-center justify-content-center'>
                <Page
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </Grid>
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
            >
                <DialogTitle>Xác nhận xóa</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có chắc chắn muốn xóa câu hỏi này? Bạn sẽ không thể hoàn tác hành động này!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="primary">
                        Hủy
                    </Button>
                    <Button onClick={confirmDelete} color="secondary">
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
};

export default ListTeacherQuestions;
