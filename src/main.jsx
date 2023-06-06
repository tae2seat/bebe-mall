import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Join from './pages/Join'
import Home from './pages/Home'
import AllProducts from './pages/product/AllProducts'
import NewProduct from './pages/product/NewProduct'
import ProductDetail from './pages/product/ProductDetail'
import MyCarts from './pages/MyCart'
import { Provider } from 'react-redux'
import store from './redux/store'
import UserProfile from './pages/UserProfile'
import UserProfileEdit from './pages/UserProfileEdit'




const router  =createBrowserRouter([
  { path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { 
        index: true, path: '/', element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/join',
        element: <Join />
      },
      {
        path: 'products',
        element: <AllProducts />
      },
      {
        path: 'products/new',
        element: <NewProduct />
      },
      {
        path: 'product/detail/:id',
        element: <ProductDetail />
      },
      {
        path: 'carts',
        element: <MyCarts />
      },
      {
        path: '/profile',
        element: <UserProfile />
      },
      {
        path: '/profile/edit',
        element: <UserProfileEdit />
      }
    ]
}
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
