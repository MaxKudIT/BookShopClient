import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthPage from './pages/Auth/AuthPage'

import './index.css'
import { AuthProvider } from './store/AuthStore'


const router = createBrowserRouter([
    {
        element: <AuthPage/>,
        path: '/'
    }
])

createRoot(document.getElementById('root')!).render(
    <AuthProvider>
          <RouterProvider router={router}/>
    </AuthProvider>
  
)
