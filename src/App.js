import './Assets/styles/main.css';
import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
//pages
import LandingPage from './Pages/LandingPage';
import SignUpPage from './Pages/auth/SignUp';
import SignInPage from './Pages/auth/SignIn';
import { ProductsPage } from './Pages/ProductsPage';
import CheckoutPage from './Pages/CheckoutPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path= "/" exact element={<LandingPage/>} />
          <Route path="/login" element={<SignInPage/>} />
          <Route path="/signup" element={<SignUpPage/>} />
          <Route path="/products" element={<ProductsPage/>} />
          <Route path="/checkout" element={<CheckoutPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
