import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import { ContextProvider } from '../contexts/deviceContext'

import theme from '../styles/theme'

const App = ({ Component, pageProps } : AppProps) => (
    <ThemeProvider theme={theme}>
        <ContextProvider>
            <Component {...pageProps} />
        </ContextProvider>
    </ThemeProvider>
)

export default App
