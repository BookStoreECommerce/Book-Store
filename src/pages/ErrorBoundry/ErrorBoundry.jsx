import { Box, Button, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Styles from "./error.module.css"
import NavBar from "../../Components/MainLayoutComponents/Navbar/NavBar";
import Footer from "../../Components/MainLayoutComponents/Footer/Footer";

const ErrorBoundry = () => {
    const [navHeight, setNavHeight] = useState(0);
    const [footerHeight, setFooterHeight] = useState(0);
    const navRef = useRef(null);
    const footerRef = useRef(null);
    useEffect(() => {
        setNavHeight(navRef.current.clientHeight);
        setFooterHeight(footerRef.current.clientHeight);
    }, [])
    return (
        <>
            <NavBar navRef={navRef} />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    minHeight: `calc(100vh - ${navHeight + footerHeight}px)`,
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
            <Footer footerRef={footerRef} customCss={Styles.removeMargT}/>
        </>
    )
}
export default ErrorBoundry;