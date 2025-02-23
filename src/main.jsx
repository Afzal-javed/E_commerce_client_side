import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'tailwindcss/tailwind.css';
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Menu from './Pages/Menu.jsx';
import About from './Pages/About.jsx';
import Contact from './Pages/Contact.jsx';
import Login from './Pages/Login.jsx';
import SignUp from './Pages/SignUp.jsx';
import NewProduct from './Pages/NewProduct.jsx';
import PageNotFound from './Pages/PageNotFound.jsx';
import Home from './Pages/Home.jsx';
import { Provider } from "react-redux";
import { store, persistor } from './redux/index.js';
import { PersistGate } from 'redux-persist/integration/react';
import Cart from './Pages/Cart.jsx';
import Update from './Pages/Update.jsx';
import ProtectedRoute from './Component/ProtectedRoute.jsx';
import PublicRoute from './Component/PublicRoute.jsx';
import Orders from './Pages/Orders.jsx';
import SellProducts from './Pages/SellProducts.jsx';
import AssignOrder from './Pages/AssignOrder.jsx';
import { SocketProvider } from './Component/SocketProvider.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path='/' element={<App />}>
       <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        }
      />
      <Route index path='/' element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      }/>
      <Route path='/menu/:id' element={
        <ProtectedRoute>
          <Menu />
        </ProtectedRoute>
      }/>
      <Route path='/about' element={
        <ProtectedRoute>
          <About />
        </ProtectedRoute>
      }/>
      <Route path='/contact' element={
        <ProtectedRoute>
          <Contact />
        </ProtectedRoute>
      }/>
      <Route path='/newproduct' element={
        <ProtectedRoute>
          <NewProduct/>
        </ProtectedRoute>
      }/>
      <Route path='/cart' element={
        <ProtectedRoute>
          <Cart/>
        </ProtectedRoute>
      }/>
      <Route path='/update/:id' element={
        <ProtectedRoute>
          <Update/>
        </ProtectedRoute>
      }/>
      <Route path='/orders' element={
        <ProtectedRoute>
          <Orders/>
        </ProtectedRoute>
      }/>
      <Route path='/sell-products' element={
        <ProtectedRoute>
          <SellProducts/>
        </ProtectedRoute>
      }/>
      <Route path='/assign-order' element={
        <ProtectedRoute>
          <AssignOrder/>
        </ProtectedRoute>
      }/>
      <Route path='/*' element={<PageNotFound />} />
    </Route>

  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <SocketProvider>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
  </SocketProvider>

)
