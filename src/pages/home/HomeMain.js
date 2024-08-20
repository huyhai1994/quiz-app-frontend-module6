import React from 'react';
import {Link} from "react-router-dom"; // Ensure the path is correct
import heroImage from '../../asset/teacher.png';
import {Typography} from "@mui/material";

const Main = () => {
    return (<main>
        <section className="hero">
            <div className="hero-text text-center">
                <h2>
                    Con người biết nhiều hơn những gì mình hiểu.
                </h2>
                <p>
                    Man knows much more than he understands.
                </p>
                <p>
                    -Alfred Adler-
                </p>
                <div className="hero-buttons">
                    <button className="teachers-signup hero-button-register">
                        <Link to="/register" style={{color: 'inherit', textDecoration: 'none'}}>
                            <Typography variant='h3'>Đăng kí ngay thôi</Typography>
                        </Link>
                    </button>
                </div>
            </div>
            <div className="hero-image">
                {<img src={heroImage} alt="Hero"/>}
            </div>
        </section>
    </main>);
}

export default Main;
