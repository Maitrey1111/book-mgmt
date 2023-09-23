import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const LandingPage = () => {
  return (
    <div className="d-flex flex-column m-5 align-items-center justify-content-center">
      <div className="mb-5">
        <h1 className="header">Welcome to Book-Management</h1>
      </div>
      <div className="d-flex mt-5">
        <a href="/login" className="btn fs-5 mx-4 btn-primary">
          Login
        </a>
        <a href="/signup" className="btn fs-5 mx-4 btn-primary">
          Signup
        </a>
      </div>
    </div>
  );
}

export default LandingPage;
