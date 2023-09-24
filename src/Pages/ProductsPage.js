import React, { useState, useEffect } from 'react'
import { onAuthStateChanged } from "firebase/auth"
import { auth, db } from '../Firebase/firebase'
import { collection, onSnapshot } from 'firebase/firestore';
import Navbar from '../Components/Navbar'
import SearchBar from '../Components/SearchBar'
import BooksTable from '../Components/BooksTable'

//materialUI
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const ProductsPage = () => {
  const [allBooksdata, setAllBooksData] = useState([])
  const [cart, setCart] = useState([])
  const [cartStatus, setCartStatus] = useState(Array(allBooksdata?.length).fill(false))

  useEffect(() => {
    onSnapshot(collection(db, 'Books'), (snapshot) => {
      setAllBooksData(snapshot.docs.map((doc) => { 
        let val = doc.data()
        val.id = doc.id
        return val
      }))
    })
  }, [])

  useEffect(() => {
    console.log(cart)
  }, [cart])
  
  //checking sessions
  onAuthStateChanged(auth, (user) => {
    if (user == null) {
      window.location.href = "/login"
      console.log("User session not active")
    } 
  })

  const addToCart = (id) => {
    let cartStatusTemp = cartStatus
    allBooksdata.forEach((book, index)=> {
      if(book.id === id && book.availability > 0) {
        setCart(cart.concat([book]))
        cartStatusTemp[index] = true
        setCartStatus(cartStatusTemp)
      }
    })
  }
  
  const removeFromCart = (id, index) => {
    let cartStatusTemp = cartStatus
    let arr = cart
    arr.filter((book, index, arr) => {
      if(book.id === id){
        cartStatusTemp[index] = true
        setCartStatus(cartStatusTemp)
        arr.splice(index, 1)
        setCart(arr)
      }
    })
  }

  const checkout = () => {
    window.location.href = "/checkout"
  }

// Material UI
  const [attribute, setAttribute] = useState('')
  const handleChange = (event) => {
    setAttribute(event.target.value)
  }

  return (
    <div>
      <Navbar/>
      <div className='mx-5 mb-4'>
        <h4>Products Page</h4>
        <hr/>
        <div id='search-functionality'>
          <SearchBar/>
        </div>
        <div id='sort-functionality' className='d-flex mb-5 align-items-center'>
          <div className="me-3">Sort By:</div>
          <Box sx={{minWidth:200}}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select Attribute</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={attribute}
                label="Select Attribute"
                onChange={handleChange}
              >
                <MenuItem value={'Title'}>Title</MenuItem>
                <MenuItem value={'PriceLH'}>Price (Low to High)</MenuItem>
                <MenuItem value={'PriceHL'}>Price (High to Low)</MenuItem>
                <MenuItem value={'DateLH'}>Publish Date (Earlier first)</MenuItem>
                <MenuItem value={'DateHL'}>Publish Date (Latest first)</MenuItem>
              </Select>
            </FormControl>
          </Box>     
        </div>
        <div>
          <h5>Choose Books</h5>
          {allBooksdata.length ? <BooksTable books={allBooksdata} modify={true} addToCart={addToCart} removeFromCart={removeFromCart} cartStatus={cartStatus} /> : null}
        </div>
        <div>
          {cart.length ?
            <>
              <h5>Cart</h5> 
              <BooksTable books={cart} modify={false}/>
              <button className='btn btn-primary' onClick={checkout}>Checkout</button>
            </>
            : null}
        </div>
      </div>
    </div>
  )
}
