import { Container } from "@mui/material"
import { Outlet } from "react-router-dom"


const LoginLayout = () => {
    return (
        <Container maxWidth="xl"
            sx={{
                width: "100%",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: (theme) => theme.palette.secondary.light,
                pt: 2
            }}
        >
            <Outlet />
        </Container>
    )
}

export default LoginLayout;