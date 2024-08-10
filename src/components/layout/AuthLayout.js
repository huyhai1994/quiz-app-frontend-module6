import {Container, Paper, Box, Typography, Button} from "@mui/material";
import {Link} from 'react-router-dom';

const AuthLayout = ({children, title}) => {
    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{mt: 8, p: 4}}>
                <Typography component="h1" variant="h5" align="center">
                    {title}
                </Typography>
                <Box mt={3}>{children}</Box>
                <Box mt={3} display="flex" justifyContent="space-between">
                    <Button
                        component={Link}
                        to="/"
                        color="primary"
                    >
                        Back to home
                    </Button>
                    {title === "Login" ? (
                        <Button
                            component={Link}
                            to="/register"
                            color="primary"
                        >
                            Register
                        </Button>
                    ) : (
                        <Button
                            component={Link}
                            to="/login"
                            color="primary"
                        >
                        </Button>
                    )}
                </Box>
            </Paper>
        </Container>
    )
}

export default AuthLayout