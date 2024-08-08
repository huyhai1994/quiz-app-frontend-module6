import * as Yup from 'yup';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Swal from 'sweetalert2';
import { CreateQuiz } from "../../../store/quizStore/QuizAxios";

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Tiêu đề là bắt buộc'),
    description: Yup.string().required('Mô tả là bắt buộc'),
    quizTime: Yup.number().required('Thời gian thi là bắt buộc').positive('Thời gian thi phải lớn hơn 0'),
    quantity: Yup.number().required('Số lượng câu hỏi là bắt buộc').integer('Số lượng câu hỏi phải là số nguyên').positive('Số lượng câu hỏi phải lớn hơn 0')
});

function QuizTeacherAdd() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            quizTime: '',
            quantity: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                await dispatch(CreateQuiz({ quiz: values, userId: 1 })).unwrap();
                Swal.fire({
                    icon: 'success',
                    title: 'Tạo quiz thành công!',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/teacher-quizzes');
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Đã có lỗi xảy ra!',
                    footer: `<p>${error.message}</p>`
                });
            }
        }
    });

    return (
        <>
            <h1>Tạo Quiz</h1>
            <form onSubmit={formik.handleSubmit}>
                <input
                    type="text"
                    placeholder="Tiêu đề"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                />
                <small>{formik.errors.title && formik.touched.title ? formik.errors.title : ''}</small>

                <textarea
                    placeholder="Mô tả"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                />
                <small>{formik.errors.description && formik.touched.description ? formik.errors.description : ''}</small>

                <input
                    type="number"
                    placeholder="Thời gian thi (phút)"
                    name="quizTime"
                    value={formik.values.quizTime}
                    onChange={formik.handleChange}
                />
                <small>{formik.errors.quizTime && formik.touched.quizTime ? formik.errors.quizTime : ''}</small>

                <input
                    type="number"
                    placeholder="Số lượng câu hỏi"
                    name="quantity"
                    value={formik.values.quantity}
                    onChange={formik.handleChange}
                />
                <small>{formik.errors.quantity && formik.touched.quantity ? formik.errors.quantity : ''}</small>

                <button type="submit">Tạo Quiz</button>
            </form>
        </>
    );
}

export default QuizTeacherAdd;
