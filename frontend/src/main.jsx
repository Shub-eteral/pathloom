import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ApiProvider } from './contexts/ApiContext'
import { ProfileProvider } from './contexts/ProfileContext'
import { ThemeProvider } from './contexts/ThemeContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ApiProvider>
          <ProfileProvider>
            <App />
          </ProfileProvider>
        </ApiProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
