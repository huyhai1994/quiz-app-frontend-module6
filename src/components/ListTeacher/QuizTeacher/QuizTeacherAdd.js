import * as Yup from 'yup';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Swal from 'sweetalert2';
import { CreateQuiz } from "../../../store/quizStore/QuizAxios";

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Tiêu đề là bắt buộc'),
    description: Yup.string().required('Mô tả là bắt buộc'),
    quizTime: Yup.number()
        .required('Thời gian thi là bắt buộc')
        .integer('Thời gian thi phải là số nguyên')
        .min(0, 'Thời gian thi không được nhỏ hơn 0'),
    quantity: Yup.number()
        .required('Số lượng câu hỏi là bắt buộc')
        .integer('Số lượng câu hỏi phải là số nguyên')
        .min(0, 'Số lượng câu hỏi không được nhỏ hơn 0')
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
        <div className="container mt-5">
            <h1 className="text-center mb-4">Tạo Quiz</h1>
            <form onSubmit={formik.handleSubmit} className="needs-validation" noValidate>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Tiêu đề</label>
                    <input
                        type="text"
                        id="title"
                        className={`form-control ${formik.errors.title && formik.touched.title ? 'is-invalid' : ''}`}
                        placeholder="Tiêu đề"
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                    />
                    <div className="invalid-feedback">
                        {formik.errors.title && formik.touched.title ? formik.errors.title : ''}
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Mô tả</label>
                    <textarea
                        id="description"
                        className={`form-control ${formik.errors.description && formik.touched.description ? 'is-invalid' : ''}`}
                        placeholder="Mô tả"
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                    />
                    <div className="invalid-feedback">
                        {formik.errors.description && formik.touched.description ? formik.errors.description : ''}
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="quizTime" className="form-label">Thời gian thi (phút)</label>
                    <input
                        type="number"
                        id="quizTime"
                        className={`form-control ${formik.errors.quizTime && formik.touched.quizTime ? 'is-invalid' : ''}`}
                        placeholder="Thời gian thi (phút)"
                        name="quizTime"
                        value={formik.values.quizTime}
                        onChange={formik.handleChange}
                    />
                    <div className="invalid-feedback">
                        {formik.errors.quizTime && formik.touched.quizTime ? formik.errors.quizTime : ''}
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="quantity" className="form-label">Số lượng câu hỏi</label>
                    <input
                        type="number"
                        id="quantity"
                        className={`form-control ${formik.errors.quantity && formik.touched.quantity ? 'is-invalid' : ''}`}
                        placeholder="Số lượng câu hỏi"
                        name="quantity"
                        value={formik.values.quantity}
                        onChange={formik.handleChange}
                    />
                    <div className="invalid-feedback">
                        {formik.errors.quantity && formik.touched.quantity ? formik.errors.quantity : ''}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary w-100">Tạo Quiz</button>
            </form>
        </div>
    );
}

export default QuizTeacherAdd;
