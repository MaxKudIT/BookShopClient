import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import type { ReactElement } from 'react'
import AuthPage from './pages/Auth/AuthPage'

import './index.css'
import { AuthProvider } from './store/context/AuthContext'
import HomePage from './pages/Home/HomePage'
import { MyBooksSearchingProvider, SearchingProvider } from './store/context/SearchContext'
import BookInfoPage from './pages/BookInfo/BookInfoPage'
import MyBooksPage from './pages/MyBooks/MyBooksPage'
import BookPage from './pages/BookPage/BookPage'
import { protectedLoader, protectedPurchaseLoader, publicLoader } from './shared/routing/loaders'
import { StoreContext } from './store/context/GloabalContext'
import { stores } from './store/stores'
import Cart from './pages/Cart/Cart'
import Favs from './pages/Favs/Favs'
import History from './pages/History/History'
import Recomms from './pages/Recomms/Recomms'
import MainBooksPage from './pages/MainBooks/MainBooksPage'
import AiChat from './features/AiChat/AiChat'
import SearchPage from './pages/Search/SearchPage'

const withAiChat = (page: ReactElement) => (
    <>
        {page}
        <AiChat />
    </>
)

const router = createBrowserRouter([
    {
        element: <AuthPage />,
        path: '/auth',
        loader: publicLoader
    },
    {
        element: withAiChat(<HomePage />),
        path: '/',
        loader: protectedLoader
    },
    {
        element: withAiChat(<MainBooksPage/>),
        path: '/mainbooks',
        loader: protectedLoader
    },
    {
        element: withAiChat(<SearchPage/>),
        path: '/search',
        loader: protectedLoader
    },
    {
        element: withAiChat(<Cart/>),
        path: '/cart',
        loader: protectedLoader
    },
    {
        element: withAiChat(<Favs/>),
        path: '/favs',
        loader: protectedLoader
    },
    {
        element: withAiChat(<Recomms/>),
        path: '/recomms',
        loader: protectedLoader
    },
    {
        element: withAiChat(<BookInfoPage />),
        path: 'books/:id',
        loader: protectedLoader
    },
    {
        element: withAiChat(<MyBooksPage />),
        path: '/mybooks',
        loader: protectedLoader
    },
    {
        element: withAiChat(<BookPage />),
        path: '/books/:id/pages/:pageNumber',
        // loader: protectedPurchaseLoader
    },
    {
        element: withAiChat(<History/>),
        path: '/history',
        loader: protectedLoader
    }
])

createRoot(document.getElementById('root')!).render(
    <StoreContext.Provider value={stores}>
        <SearchingProvider>
            <MyBooksSearchingProvider>

                <AuthProvider>
                    <RouterProvider router={router} />
                </AuthProvider>


            </MyBooksSearchingProvider>

        </SearchingProvider>
    </StoreContext.Provider>



)
