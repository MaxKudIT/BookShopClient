import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthPage from './pages/Auth/AuthPage'

import './index.css'
import { AuthProvider } from './store/context/AuthContext'
import HomePage from './pages/Home/HomePage'
import { SearchingProvider } from './store/context/SearchContext'
import BookInfoPage from './pages/BookInfo/BookInfoPage'


const router = createBrowserRouter([
    {
        element: <AuthPage />,
        path: '/1'
    },
    {
        element: <HomePage />,
        path: '/1'
    },
    {
        element: <BookInfoPage/>,
        path: '/'
    }
])

createRoot(document.getElementById('root')!).render(
    <SearchingProvider>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </SearchingProvider>


)
