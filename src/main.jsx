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
        path: 'product/:id',
        element: <ProductDetail />
      },
      {
        path: 'carts',
        element: <MyCarts />
      }
    ]
}
])



ReactDOM.createRoot(document.getElementById('root')).render(
      <RouterProvider router={router} />
)
