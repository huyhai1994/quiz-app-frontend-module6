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

const ListTeacherQuestions = () => {
    const dispatch = useDispatch();
    const {questions, loading, error} = useSelector((state) => state.questions);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    const userId = localStorage.getItem('userId');
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedQuestionId, setSelectedQuestionId] = useState(null);

    useEffect(() => {
        dispatch(ListTeacherQuestion(userId))
    }, [dispatch]);

    const handleDelete = (id) => {
        setSelectedQuestionId(id);
        setOpenDialog(true);
    };

    const confirmDelete = () => {
        dispatch(DeleteQuestion(selectedQuestionId)).then(() => {
            setOpenDialog(false);
            setSelectedQuestionId(null);
        });
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
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <h2>Danh sách câu hỏi của giáo viên</h2>
            </Grid>
            <Grid item xs={12}>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>STT</TableCell>
                                <TableCell>Câu hỏi</TableCell>
                                <TableCell>Danh mục</TableCell>
                                <TableCell>Loại</TableCell>
                                <TableCell>Thời gian tạo</TableCell>
                                <TableCell>Hành động</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentData.length > 0 ? (
                                currentData.map((question, index) => (
                                    <TableRow key={question.questionId}>
                                        <TableCell>{(currentPage - 1) * pageSize + index + 1}</TableCell>
                                        <TableCell>{question.questionText}</TableCell>
                                        <TableCell>{question.categoryName}</TableCell>
                                        <TableCell>{mapTypeName(question.typeName)}</TableCell>
                                        <TableCell>{format(new Date(question.timeCreate), 'dd-MM-yyyy - HH:mm:ss')}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => handleDelete(question.questionId)}
                                            >
                                                Xóa
                                            </Button>
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
            <Grid item xs={12}>
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
