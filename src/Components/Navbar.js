import React from 'react'
import { signOut } from "firebase/auth"
import { auth } from '../Firebase/firebase'

const Navbar = () => {
  const logOut = async () => {
    try {
        await signOut(auth)
    } catch (err){
        console.error(err)
    }
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light m-0 mb-4 py-3">
      <a href="/products" className="navbar-brand fw-bold col text-start ms-5">Book-Management</a>
      <div className="col me-5 text-end">
        <button className="btn btn-danger" onClick={logOut}>Logout</button>
      </div>
    </nav>
  )
}

export default Navbar