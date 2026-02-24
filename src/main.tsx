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
import { protectedLoader, protectedPurchaseLoader, publicLoader } from './shared/routing/loaders'
import { StoreContext } from './store/context/GloabalContext'
import { stores } from './store/stores'
import Cart from './pages/Cart/Cart'
import Favs from './pages/Favs/Favs'


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
        element: <Cart/>,
        path: '/cart',
        loader: protectedLoader
    },
    {
        element: <Favs/>,
        path: '/favs',
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
        path: '/books/:id/pages/:pageNumber',
        loader: protectedPurchaseLoader
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
