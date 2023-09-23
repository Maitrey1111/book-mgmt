import { useState } from "react"
import React from "react"
import { app } from "../../Firebase/firebase"
import { getFirestore, doc, setDoc} from "@firebase/firestore"
import {
    getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged
} from "firebase/auth"

const SignUpPage = () => {
    const auth = getAuth(app)
    const db = getFirestore(app)

    const [User, setUser] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState()

    const handleNameChange = (e) => {
      setName(e.target.value)
    }
    const handleEmailChange = (e) => {
      setEmail(e.target.value)
    }
    const handlePasswordChange = (e) => {
      setPassword(e.target.value)
    }
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
    }
    const handleSubmit = (e) => {
      e.preventDefault()
        Signup()
    }

  const Signup = async () => {
    if (password === confirmPassword) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user
          const uid = user.uid
          const newUser = {
            Username: name,
            Email: email
          }
          //added to firestore
          setDoc(doc(db, "Users", uid), newUser, { merge: true })
          window.location.href = "/login"

        })
        .catch((error) => {
            const errorCode = error.code
            const e = errorCode.substring(5).split('-').join(' ').toUpperCase()
            if (e === "INTERNAL ERROR")
                setError("Password field can't be blank".toUpperCase())
            else
                setError(e)
        })
    }
    else {
      setError("Passwords don't match".toUpperCase())
    }
  }

    return (
        // <div className="SignUp">
        //     <div id="sign-up-page">
        //         <div className="header-sign-up">
        //             <h3 >Signup to YourNote</h3>
        //         </div>
        //         <main className="input-box">
        //             <h3 className="sub-header-sign-up">Sign Up</h3>
        //             <div className="inputs">
        //                 <input className="email-input" id="name" type="text" placeholder="Name"></input>
        //                 <input className="email-input" id="username" type="text" placeholder="Username"></input>
        //                 <input className="email-input" id="email" type="email" placeholder="Email"></input>
        //                 <input className="password-input" id="password" type="password" placeholder="Password"></input>
        //                 <input className="password-input" id="confirm-password" type="password" placeholder="Confirm the Password"></input>
        //             </div>
        //             <button onClick={() => { Signup() }} className="signup-button">Signup</button>
        //             <div id="errors">Email or Password are not valid</div>
        //         </main>
        //     </div>
        // </div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body m-4">
                <h2 className="card-title mb-3 text-center">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={name}
                      onChange={handleNameChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={handleEmailChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      required
                    />
                  </div>
                  {error ? <h6 className="my-3 text-danger">{error}</h6>: ''}
                  <div className="text-center mt-4">
                    <button type="submit" className="btn btn-primary">
                        Sign Up
                    </button>
                    <div className="mt-2">
                        Already a user?  <a href="/login">Sign In</a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default SignUpPage
