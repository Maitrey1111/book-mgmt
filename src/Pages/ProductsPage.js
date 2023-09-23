import React from 'react'
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from '../Firebase/firebase'

export const ProductsPage = () => {
  //checking sessions
  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      console.log("User is logged in")
    } 
    else{
      window.location.href = "/login"
      console.log("User session not active")
    }     
  })

  const logOut = async () => {
    try {
      await signOut(auth)
    } catch (err){
      console.error(err)
    }
  }

  return (
    <div>
      <h3>Products Page</h3>
      <button className='btn btn-danger' onClick={logOut}>Logout</button>
    </div>
  )
}
