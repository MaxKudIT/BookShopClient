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
import { protectedLoader, publicLoader } from './shared/routing/loaders'


const router = createBrowserRouter([
    {
        element: <AuthPage />,
        path: '/auth',
        loader: publicLoader
    },
    {
        element: <HomePage />,
        path: '/',
        loader: protectedLoader
    },
    {
        element: <BookInfoPage />,
        path: 'books/:id',
        loader: protectedLoader
    },
    {
        element: <MyBooksPage />,
        path: '/mybooks',
        loader: protectedLoader
    },
    {
        element: <BookPage />,
        path: '/:id',
        loader: protectedLoader
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
