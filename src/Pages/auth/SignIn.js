import { React, useState } from "react"
import { onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth, googleProvider, facebookProvider} from "../../Firebase/firebase"

import logoGoogle from "../../Assets/images/logo-google.png"
import logoFacebook from "../../Assets/images/logo-facebook.png"
import logoGithub from "../../Assets/images/logo-github.png"
import logoTwitterx from "../../Assets/images/logo-twitterx.png"

const SignInPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState()

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    Login()
  }

  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      window.location.href = "/products"
    }    
  })

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (err){
      console.error(err)
    }
  }

  const signInWithFacebook = async () => {
    try {
      // const result = signInWithPopup(auth, facebookProvider)
    } catch(err) {
      alert(err)
    }
  }
  
  const handleSignInWithProvider = async (provider) => {
    try {
      // const authProvider = new auth[`FacebookAuthProvider`]()
      // await firebase.auth().signInWithPopup(authProvider);
      console.log(`${provider} sign-in successful`);
    } catch (error) {
      console.error(`${provider} sign-in error`, error);
    }
  };

  const Login = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        window.location.href = "/products"
      })
      .catch((error) => {
        const errorCode = error.code
        const e = errorCode.substring(5).split('-').join(" ").toUpperCase()
        if(e === "INTERNAL ERROR")
          setError("Password field can't be blank".toUpperCase())
        else
          setError(e)
      })
  }

  return (
    <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <div className="card-body m-4">
            <h2 className="card-title mb-3 text-center">Sign In</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label text-left">
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
              {error ? <h6 className="my-3 text-danger">{error}</h6>: ''}
              <div className="text-center mt-4">
                <button type="submit" onClick={handleSubmit} className="btn btn-primary">
                  Sign In
                </button>
                <div className="mt-2">
                  New user?  <a href="/signup">Sign Up</a>
                </div>
              </div>
            </form>
            <div className="d-flex justify-content-center mt-4">
              <button
                type="button"
                className="btn border bg-body shadow mx-3 p-1"
                onClick={signInWithGoogle}
              >
                <img className="w-75" src={logoGoogle} alt="logo-google" />
              </button>
              <button
                type="button"
                className="btn border bg-body shadow mx-3 p-1"
                onClick={signInWithFacebook}
              >
                <img className="w-75" src={logoFacebook} alt="logo-facebook" />
              </button>
              <button
                type="button"
                className="btn border bg-body shadow mx-3 p-1"
                // onClick={() => handleSignInWithProvider('GitHub')}
              >
                <img className="w-75" src={logoGithub} alt="logo-github" />
              </button>
              <button
                type="button"
                className="btn border bg-body shadow mx-3 p-1"
                // onClick={() => handleSignInWithProvider('Twitter')}
              >
                <img className="w-75" src={logoTwitterx} alt="logo-twitterx" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default SignInPage;
