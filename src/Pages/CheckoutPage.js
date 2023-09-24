import { React, useState, useEffect } from 'react'
import { onAuthStateChanged } from "firebase/auth"
import { auth, db } from '../Firebase/firebase'
import Navbar from '../Components/Navbar'

const CheckoutPage = () => {
    const [user, setUser] = useState()
  //checking sessions
  onAuthStateChanged(auth, (user) => {
    if (user == null) {
      window.location.href = "/login"
      console.log("User session not active")
    } 
    else {
        console.log(user)
        setUser(user)
    }
  })

  const handleSubmit = () => {

  }

  return (
    <div>
      <Navbar/>
      <div className="container mt-5">
        <div className="row justify-content-center">
        <div className="col-md-6">
            <div className="card">
            <div className="card-body">
                <h2 className="card-title">Checkout</h2>
                <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                    Name
                    </label>
                    <div>{1}</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                    Email
                    </label>
                    <div>{1}</div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                    <div className="mb-3">
                        <label htmlFor="expiration" className="form-label">
                        Expiration Date
                        </label>
                        <div></div>
                    </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary me-3">
                    Rent these Books
                </button>
                <a href="/products" className="btn btn-primary">
                    Go Back
                </a>
                </form>
            </div>
            </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage