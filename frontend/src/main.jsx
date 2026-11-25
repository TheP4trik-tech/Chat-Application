import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@mantine/core/styles.css'
import './index.css'
import { MantineProvider } from '@mantine/core'
import { BrowserRouter } from 'react-router'
import theme from './theme.js'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <MantineProvider theme={theme}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </MantineProvider>
    </StrictMode>,
)