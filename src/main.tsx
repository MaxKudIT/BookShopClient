import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthPage from './pages/Auth/AuthPage'

import './index.css'
import { AuthProvider } from './store/context/AuthContext'
import HomePage from './pages/Home/HomePage'
import { MyBooksSearchingProvider, SearchingProvider } from './store/context/SearchContext'
import BookInfoPage from './pages/BookInfo/BookInfoPage'
import MyBooksPage from './pages/MyBooks/MyBooksPage'
import BookPage from './pages/BookPage/BookPage'


const router = createBrowserRouter([
    {
        element: <AuthPage />,
        path: '/31'
    },
    {
        element: <HomePage />,
        path: '/1'
    },
    {
        element: <BookInfoPage />,
        path: '/'
    },
    {
        element: <MyBooksPage />,
        path: '/21'
    },
    {
        element: <BookPage />,
        path: '/11'
    }
])

createRoot(document.getElementById('root')!).render(
    <SearchingProvider>
        <MyBooksSearchingProvider>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </MyBooksSearchingProvider>

    </SearchingProvider>


)
