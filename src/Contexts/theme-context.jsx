import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React, { createContext, useMemo } from "react";

const ThemeContext = createContext({ toggleColorMode: () => { } });

const ThemeContextProvider = ({ children }) => {
  // const isBrowserDefultDark = useMediaQuery('(prefers-color-scheme: dark)');

  // const getDefultTheme = useCallback(() => {
  //     const localStorageTheme = localStorage.getItem('defult-theme');
  //     const browserDefult = isBrowserDefultDark ? 'dark' : 'light';
  //     return localStorageTheme || browserDefult;
  // },[isBrowserDefultDark]);

  // const [mode, setMode] = useState(getDefultTheme());

  // const colorMode = useMemo(
  //     () => ({
  //         toggleColorMode: () => {
  //             const isCurrentDark = mode === "dark";
  //             setMode((prev) => (prev === 'light' ? 'dark' : 'light'))
  //             localStorage.setItem('defult-theme', isCurrentDark ? 'light' : 'dark');
  //         }
  //     }),
  //     [mode]
  // );

  const theme = useMemo(
    () => createTheme({
      palette: {
        // mode: mode,
        primary: {
          main: '#ce7777',
        },
        secondary: {
          main: '#e8c4c4',
        }
      },
      components: {
        MuiInputBase: {
          styleOverrides: {
            root: {
              // backgroundColor: "transparent",
              backgroundColor: '#faf5f5',
            },
          }
        },
        MuiInputLabel: {
          styleOverrides: {
            root: {
              "&.Mui-focused": {
                // color: '#2b3a55',
                color: '#ce7777',
              },
            },
          }
        },
        MuiOutlinedInput: {
          styleOverrides: {
            input: {
              "&:-webkit-autofill": {
                WebkitBoxShadow: '0 0 0 100px transparent inset',
                // textAlign: "center"
                // WebkitTextFillColor: '#fff'
                
              },
              ':hover': {
                borderColor: '#e8c4c4 !important'
              },
            },
            root: {
              "&.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: '#e8c4c4 !important'
                },
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: '1px solid #e8c4c4 !important',
                color:"gray",
                
              },
            },
          },
        },
      },
    }),
    []
    // [mode]
  )
  return (
    // <ThemeContext.Provider value={colorMode}>
    <ThemeContext.Provider value={""}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
export const useThemeContext = () => React.useContext(ThemeContext)
// export ThemeContext;

export default ThemeContextProvider