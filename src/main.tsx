import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthPage from './pages/Auth/AuthPage'

import './index.css'
import { AuthProvider } from './store/context/AuthContext'
import HomePage from './pages/Home/HomePage'
import { SearchingProvider } from './store/context/SearchContext'
import BookInfoPage from './pages/BookInfo/BookInfoPage'
import MyBooksPage from './pages/MyBooks/MyBooksPage'
import BookPage from './pages/BookPage/BookPage'


const router = createBrowserRouter([
    {
        element: <AuthPage />,
        path: '/1'
    },
    {
        element: <HomePage />,
        path: '/11'
    },
    {
        element: <BookInfoPage/>,
        path: '/2'
    },
    {
        element: <MyBooksPage/>,
        path: '/1'
    },
    {
        element: <BookPage/>,
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
