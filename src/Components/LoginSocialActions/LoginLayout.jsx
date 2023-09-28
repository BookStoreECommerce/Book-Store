import { Box } from "@mui/material"
import { Outlet } from "react-router-dom"


const LoginLayout = () => {
    return (
        <Box 
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
        </Box>
    )
}

export default LoginLayout;