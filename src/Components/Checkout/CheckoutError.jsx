import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const CheckoutError = ({majorText, minorText}) => {
    return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    minHeight: 'calc(100vh - 159px)',
                    width: '100%',
                    mt: '100px',
                    mb: '-48px',
                    backgroundColor: (theme) => theme.palette.secondary.main,
                }}
            >
                <Typography variant="h1" sx={{ color: 'white', fontWeight: "bold", mt: 1, mb: 1 }}>
                    {majorText? majorText: '404'}
                </Typography>
                <Typography variant="h6" sx={{ color: 'white', mt: 1, mb: 1 }}>
                    {minorText? minorText: "The page you’re looking for doesn’t exist."}
                </Typography>
                <Button component={Link} to="/" variant="contained" sx={{ mt: 1, mb: 1 }}>Back Home</Button>
            </Box>
    )
}
export default CheckoutError;