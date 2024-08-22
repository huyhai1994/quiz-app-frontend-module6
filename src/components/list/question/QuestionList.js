import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ListQuestion, SearchQuestions} from "../../../store/questionStore/QuestionAxios";
import {format} from "date-fns";
import Page from "../../pages/Page";
import {
    Box,
    Button,
    CircularProgress, Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from '@mui/material';
import Swal from 'sweetalert2';

const QuestionList = () => {
    const dispatch = useDispatch();
    const {questions, loading, error} = useSelector((state) => state.questions);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const pageSize = 5;

    useEffect(() => {
        dispatch(ListQuestion());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Đã có lỗi xảy ra!',
                footer: `<p>${error}</p>`
            });
        }
    }, [error]);

    const handleSearch = () => {
        dispatch(SearchQuestions(searchTerm));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    };

    const simulatedQuestions = [
        ...questions,
        {
            questionId: 'invalid-date',
            questionText: 'This is a question with an invalid date',
            categoryName: 'Category',
            typeName: 'Type',
            timeCreate: 'invalid-date-string'
        }
    ];

    const totalPages = Math.ceil(simulatedQuestions.length / pageSize);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * pageSize;
        return simulatedQuestions.slice(startIndex, startIndex + pageSize);
    };

    const currentData = getCurrentPageData();

    const formatDate = (dateString) => {
        let date = new Date(dateString);
        if (!(date instanceof Date) || isNaN(date.getTime())) {
            date = new Date();
        }
        return format(date, 'dd-MM-yyyy - HH:mm:ss');
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress/>
            </Box>
        );
    }

    return (
        <Box mt={5}>
            <Typography variant="h4" align="center" gutterBottom>Danh sách câu hỏi</Typography>
            <Box mb={3} display="flex" flexDirection={{xs: 'column', md: 'row'}} gap={2}>
                <TextField
                    fullWidth
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Tìm kiếm theo danh mục hoặc câu hỏi"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSearch}
                >
                    Tìm kiếm
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell>Câu hỏi</TableCell>
                            <TableCell>Danh mục</TableCell>
                            <TableCell>Loại</TableCell>
                            <TableCell>Thời gian tạo</TableCell>
                            <TableCell>Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentData.length > 0 ? (
                            currentData.map((question, index) => (
                                <TableRow key={question.questionId}>
                                    <TableCell>{(currentPage - 1) * pageSize + index + 1}</TableCell>
                                    <TableCell>{question.questionText}</TableCell>
                                    <TableCell>{question.categoryName}</TableCell>
                                    <TableCell>{question.typeName}</TableCell>
                                    <TableCell>{formatDate(question.timeCreate)}</TableCell>
                                    <TableCell>
                                        {/* Add your action buttons here */}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    Không có dữ liệu
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
                <Page
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
        </Box>
    );
};

export default QuestionList;
