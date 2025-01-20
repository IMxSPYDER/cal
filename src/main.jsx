import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

const clientId = "1010339643164-sgkr6flk3fajqlcki2vffvdi7i7j8pjk.apps.googleusercontent.com";


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <GoogleOAuthProvider clientId={clientId}>
    <App />
  </GoogleOAuthProvider>
</StrictMode>,
)
