import React from 'react';
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom
import 'bootstrap/dist/css/bootstrap.min.css'; // Đảm bảo rằng Bootstrap được import

function NotFound() {
    return (
        <div className="main-content bg-white ps-0 pe-0">
            <div className="container">
                <div className="row justify-content-center align-items-center min-vh-100">
                    <div className="col-lg-6 col-md-8 text-center d-flex flex-column align-items-center">
                        <div className="card border-0 text-center d-block p-0">
                            <img
                                src="https://png.pngtree.com/png-clipart/20220303/original/pngtree-error-404-under-construction-sign-3d-icon-website-banner-concept-png-image_7382631.png"
                                alt="icon"
                                className="img-fluid mb-4" // Sử dụng img-fluid để ảnh phản hồi kích thước màn hình
                                style={{ maxWidth: '300px' }} // Đặt kích thước tối đa của ảnh
                            />
                            <h1 className="fw-700 text-grey-900 display3-size display4-md-size">
                                Rất tiếc! Có vẻ như bạn đã bị lạc.
                            </h1>
                            <p className="text-grey-500 font-xsss">
                                Trang bạn đang tìm kiếm không khả dụng. Hãy thử tìm kiếm lại hoặc quay về trang chính.
                            </p>
                            <Link to="/" className="btn btn-primary mt-3">
                                Về trang chủ
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFound;