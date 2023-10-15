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

const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path='/' element={<App />}>
      <Route index element={<Home />} />
      <Route path='/menu/:id' element={<Menu />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/newproduct' element={<NewProduct />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/update/:id' element={<Update />} />
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
