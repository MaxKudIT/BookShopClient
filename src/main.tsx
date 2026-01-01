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
        path: '/'
    },
    {
        element: <HomePage />,
        path: '/homepage'
    },
    {
        element: <BookInfoPage />,
        path: '/1'
    },
    {
        element: <MyBooksPage />,
        path: '/2'
    },
    {
        element: <BookPage />,
        path: '/2'
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
