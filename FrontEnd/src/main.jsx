import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Navbar from "./Navbar.jsx"
import Kandidat from "./Kandidat.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Kandidat />
  </StrictMode>,
)
