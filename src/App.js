import './Assets/styles/main.css';
import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
//pages
import LandingPage from './Pages/LandingPage';
import SignUpPage from './Pages/auth/SignUp';
import SignInPage from './Pages/auth/SignIn';
import { ProductsPage } from './Pages/ProductsPage';

function App() {
  return (
    <div className="App">
      {/* <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/profile">Profile</a>
          </li>
        </ul>
      </nav> */}
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" exact>
            <h1>Welcome to the Authentication App</h1>
          </Route> */}
          <Route path= "/" exact element={<LandingPage/>} />
          <Route path="/login" element={<SignInPage/>} />
          <Route path="/signup" element={<SignUpPage/>} />
          <Route path="/products" element={<ProductsPage/>} />
            {/* <h2>Login</h2>
            {!user ? (
              <div>
                <button onClick={() => login(mockUserData)}>Login with Google</button>
                <button onClick={() => login(mockUserData)}>Login with Facebook</button>
              </div>
            ) : (
              <div>
                <p>Welcome, {user.name}!</p>
                <button onClick={logout}>Logout</button>
              </div>
            )} */}
          {/* </Route> */}

          {/* <Route path="/profile">
          <h2>Profile</h2>
          {user ? (
            <div>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <img src={user.picture} alt={user.name} />
            </div>
          ) : (
            <p>Please log in to view your profile.</p>
          )}
          </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
