import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'auto'
}
import './styles/variables.css'
import './styles/global.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
