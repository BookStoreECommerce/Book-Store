import { Box, Button, Typography } from "@mui/material";
import NavBar from "../Navbar/NavBar";
import { useEffect, useRef, useState } from "react";

const ErrorBoundry = () => {
    const [navHeight, setNavHeight] = useState(0);
    const navRef = useRef(null);
    useEffect(() => {
        setNavHeight(navRef.current.clientHeight)
    }, [])
    return (
        <>
            <NavBar innerRef={navRef} />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    minHeight: `calc(100vh - ${navHeight}px)`,
                    width: '100%',
                    mt: `${navHeight}px`,
                    backgroundColor: (theme) => theme.palette.secondary.main,
                }}
            >
                <Typography variant="h1" sx={{ color: 'white', fontWeight: "bold", mt: 1, mb: 1 }}>
                    404
                </Typography>
                <Typography variant="h6" sx={{ color: 'white', mt: 1, mb: 1 }}>
                    The page you’re looking for doesn’t exist.
                </Typography>
                <Button variant="contained" sx={{ mt: 1, mb: 1 }}>Back Home</Button>
            </Box>
        </>
    )
}
export default ErrorBoundry;