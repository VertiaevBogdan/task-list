import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TaskForm from "./components/TaskForm.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TaskForm/>
  </StrictMode>,
)
