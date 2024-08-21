import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ListQuestion, SearchQuestions} from "../../../store/questionStore/QuestionAxios";
import {format} from "date-fns";
import Page from "../../pages/Page";
import {TailSpin} from 'react-loader-spinner';
import Swal from 'sweetalert2';
import {Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

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


    const totalPages = Math.ceil(questions.length / pageSize);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return questions.slice(startIndex, endIndex);
    };

    const currentData = getCurrentPageData();

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
                <TailSpin color="#00BFFF" height={80} width={80}/>
            </div>
        );
    }

    return (
        <Grid container spacing={2} className="p-3">
            <Grid item xs={12}>
                <h2 className='fw-bold text-center'>Danh sách câu hỏi</h2>
            </Grid>

                <Grid className="mb-3 d-flex">
                    <div className="flex-grow-1">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Tìm kiếm theo danh mục hoặc câu hỏi"
                            className="form-control"/>
                    </div>
                    <button className="btn btn-primary ms-2" onClick={handleSearch}>
                        Tìm kiếm
                    </button>
                </Grid>
            <TableContainer component={Paper}>
                <Table className="table table-bordered table-striped">
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
                            <TableRow key={question.questionId}>
                                <TableCell>{(currentPage - 1) * pageSize + index + 1}</TableCell>
                                <TableCell>{question.questionText}</TableCell>
                                <TableCell>{question.categoryName}</TableCell>
                                <TableCell>{question.typeName}</TableCell>
                                <TableCell>{format(new Date(question.timeCreate), 'dd-MM-yyyy - HH:mm:ss')}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan="5">Không có dữ liệu</TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Grid item xs={12} className='d-flex align-items-center justify-content-center'>
                <Page
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}/>
                </Grid>
        </Grid>

    );
};

export default QuestionList;
