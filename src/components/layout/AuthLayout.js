import {Box, Button, Container, Paper} from "@mui/material";
import {Link} from 'react-router-dom';

const AuthLayout = ({children, title}) => {
    return (<Container component="main" maxWidth="xs">
        <Paper elevation={3} sx={{mt: 8, p: 4}}>
            <Box mt={3}>{children}
            </Box>
            <Box mt={3} display="flex" justifyContent="center">
                <Link to="/reset-password">
                    Quên mật khẩu?
                </Link>
            </Box>
            <Box mt={3} display="flex" justifyContent="space-between">
                <Button component={Link} to="/" color="primary">
                    Về trang chủ
                </Button>
                {title === "Login" ? (<Button component={Link} to="/register" color="primary">
                    Đăng kí
                </Button>) : (<Button component={Link} to="/login" color="primary">
                </Button>)}
            </Box>
        </Paper>
    </Container>)
}

export default AuthLayout
