import {format} from "date-fns";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {ListQuiz} from "../../../store/quizStore/QuizAxios";

const QuizList = () => {
    const dispatch = useDispatch();
    const { quizzes, loading, error } = useSelector((state) => state.quizzes);

    useEffect(() => {
        dispatch(ListQuiz());
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Quiz List</h2>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Creator Name</th>
                    <th>Creator Email</th>
                    <th>Time Created</th>
                </tr>
                </thead>
                <tbody>
                {quizzes.map((quiz) => (
                    <tr key={quiz.quizzesId}>
                        <td>{quiz.quizzesId}</td>
                        <td>{quiz.quizzesTitle}</td>
                        <td>{quiz.quizzesDescription}</td>
                        <td>{quiz.usersName}</td>
                        <td>{quiz.userEmail}</td>
                        <td>{format(new Date(quiz.quizzesTimeCreate), 'dd-MM-yyyy - HH:mm:ss')}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default QuizList;