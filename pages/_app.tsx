import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../styles/theme'
import { ContextProvider } from '../contexts/deviceContext'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <ContextProvider>
                <Component {...pageProps} />
            </ContextProvider>
        </ThemeProvider>
    )
}

export default MyApp
