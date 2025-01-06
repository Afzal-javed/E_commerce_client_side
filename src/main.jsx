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
          <cart/>
        </ProtectedRoute>
      }/>
      <Route path='/update/:id' element={
        <ProtectedRoute>
          <Update/>
        </ProtectedRoute>
      }/>
      <Route path='/*' element={<PageNotFound />} />
    </Route>

  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>

)
