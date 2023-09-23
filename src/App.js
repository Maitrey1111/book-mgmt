import './Assets/styles/main.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';
//pages
import SignIn from './Pages/auth/SignIn';
import LandingPage from './Pages/LandingPage';

// Mock user data for demonstration purposes
const mockUserData = {
  name: 'John Doe',
  email: 'john@example.com',
  picture: 'https://example.com/johndoe.jpg',
};

function App() {
  const [user, setUser] = useState(null);

  // Simulate a login with a mock user
  const login = (userData) => {
    setUser(userData);
  }

  // Simulate a logout
  const logout = () => {
    setUser(null);
  }

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

          <Route path= "/" exact element={<LandingPage />} />

          <Route path="/login"element={<SignIn/>} />
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
