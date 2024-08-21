import React from 'react';
import {Link} from "react-router-dom";
import heroImage from '../../asset/teacher.png';
import {Button, Grid, Typography, useMediaQuery, useTheme} from "@mui/material";
import {motion} from 'framer-motion';

const Main = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    // Define the animation variants for the button
    const buttonVariants = {
        hover: {
            scale: 1.1, rotate: [0, -10, 10, -10, 10, 0], // Shake effect
            transition: {
                duration: 0.4, yoyo: Infinity, // Repeat the animation
            }
        }, click: {
            scale: 0.9, transition: {duration: 0.1},
        }, celebrate: {
            scale: 1.2, transition: {
                type: "spring", stiffness: 300, damping: 20,
            }
        }
    };

    return (<main>
        <section className="hero">
            <Grid container spacing={3} alignItems="center">
                {/* Render the image on top if the screen is small */}
                {isSmallScreen && (<Grid item xs={12} className="hero-image">
                    <img src={heroImage} alt="Hero" style={{width: '100%', height: 'auto'}}/>
                </Grid>)}

                <Grid item xs={12} sm={6} className="hero-text text-center">
                    <Typography variant="h3" component="h2">
                        Con người biết nhiều hơn những gì mình hiểu.
                    </Typography>
                    <Typography variant="body1">
                        Man knows much more than he understands.
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        -Alfred Adler-
                    </Typography>
                    <div className="hero-buttons">
                        <motion.div
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="click"
                            animate="celebrate"
                        >
                            <Button variant="contained" color="primary"
                                    className="teachers-signup hero-button-register">
                                <Link to="/register" style={{color: 'inherit', textDecoration: 'none'}}>
                                    <Typography variant='h6'>Đăng kí ngay thôi</Typography>
                                </Link>
                            </Button>
                        </motion.div>
                    </div>
                </Grid>

                {/* Render the image on the side if the screen is not small */}
                {!isSmallScreen && (<Grid item xs={12} sm={6} className="hero-image">
                    <img src={heroImage} alt="Hero" style={{width: '100%', height: 'auto'}}/>
                </Grid>)}
            </Grid>
        </section>
    </main>);
}

export default Main;
