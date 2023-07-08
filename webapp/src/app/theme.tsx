'use client'
import {ThemeProvider} from "@mui/system";
import {createTheme, CssBaseline} from "@mui/material";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});
export default function Theme({children}: { children: React.ReactNode }) {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            {children}
        </ThemeProvider>
    )
}