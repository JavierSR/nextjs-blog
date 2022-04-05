import { createTheme } from '@mui/material/styles'

export default createTheme({
    typography: {
        h5: {
            fontFamily: 'Staatliches, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
            lineHeight: '1',
            fontWeight: 500,
            fontSize: 21,
            letterSpacing: 0.2
        }
    },
    palette: {
        primary: {
            main: '#000',
        },
    }
})
  