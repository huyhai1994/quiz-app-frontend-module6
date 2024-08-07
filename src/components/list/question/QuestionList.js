import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import {ListQuestion} from "../../../store/questionStore/QuestionAxios";
import {date} from "yup";
import {format} from "date-fns";

const QuestionList = () => {
    const dispatch = useDispatch();
    const questions = useSelector((state) => state.questions.questions);

    useEffect(() => {
        dispatch(ListQuestion());
    }, [dispatch]);

    return (
        <div className="container mt-5">
            <h2>Questions List</h2>
            <table className="table table-bordered table-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Question</th>
                    <th>Category</th>
                    <th>Type</th>
                    <th>Time Created</th>
                </tr>
                </thead>
                <tbody>
                {questions.map((question) => (
                    <tr key={question.questionId}>
                        <td>{question.questionId}</td>
                        <td>{question.questionText}</td>
                        <td>{question.categoryName}</td>
                        <td>{question.typeName}</td>
                        <td>{format(new Date(question.timeCreate), 'dd-MM-yyyy - HH:mm:ss')}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default QuestionList;