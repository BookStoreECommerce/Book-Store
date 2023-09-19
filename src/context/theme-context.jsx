import { CssBaseline, ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import React, { createContext, useCallback, useMemo, useState } from "react";

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
              backgroundColor: '#faf5f5',
            },
          }
        },
        MuiInputLabel: {
          styleOverrides: {
            root: {
              "&.Mui-focused": {
                color: '#ce7777',
                // backgroundColor: 'transparent'
              },
            },
          }
        },
        MuiOutlinedInput: {
          styleOverrides: {
            input: {
              "&:-webkit-autofill": {
                WebkitBoxShadow: '0 0 0 100px transparent inset',
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
              }
            },
          },
        },
        // MuiFormHelperText: {
        //   styleOverrides: {
        //     root: {
        //       width: '100px',
        //       // whiteSpace: 'nowrap'
        //     }
        //   },
        // },
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