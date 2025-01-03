import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='h-screen w-screen'>
    <App/>
    </div>  
  </StrictMode>,
)