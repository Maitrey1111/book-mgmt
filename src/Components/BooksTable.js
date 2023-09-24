import { all } from 'axios'
import { React, useState, useEffect } from 'react'

const BooksTable = ({allBooksdata, modify, cart, setCart}) => {
  const pageSize = 5
  const [page, setPage] = useState(0)
  const [visibleBooks, setVisibleBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [cartStatus, setCartStatus] = useState(Array(allBooksdata?.length).fill(false))
  
  useEffect(() => {
    if (loading) return
    setLoading(true)
    let limit = (page+1)*pageSize
    if (limit >= allBooksdata?.length) {
      limit = allBooksdata?.length
    } 
    setVisibleBooks(allBooksdata?.slice(0, limit))
    setLoading(false)
  }, [page])

  const handleLoadMore = () => {
    setPage(page+1)
  }
  const handleShowLess = () => {
    setPage(0)
  }

  const addToCart = (id, index) => {
    let cartStatusTemp = cartStatus
    cartStatusTemp[index] = true
    setCartStatus(cartStatusTemp)
    visibleBooks.forEach((book)=> {
      if(book.id === id) {
        setCart(cart.concat([book]))
      }
    })
  }
  
  const removeFromCart = (id, index) => {
    let cartStatusTemp = cartStatus
    cartStatusTemp[index] = true
    setCartStatus(cartStatusTemp)
    let arr = cart
    arr.filter((book, index, arr) => {
      if(book.id === id){
        arr.splice(index, 1)
        setCart(arr)
      }
    })
  }

  return (
    <div id='book-list'>
      <table className="table table-hover overflow-scroll">
        <thead>
          <tr>
            <th>Index</th>
            <th>Title</th>
            <th>Availability</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Publish Date</th>
            <th>Price</th>
            {!modify && <th>Cart Option</th>}
          </tr>
        </thead>
        <tbody>
          {visibleBooks?.map((book, index) => (
            <tr key={index}>
            <td>{index+1}</td>
            <td>{book.title}</td>
            <td>{book.availability}</td>
            <td>{book.authors?.join(', ')}</td>
            <td>{book.categories?.join(', ')}</td>
            <td>{book.publishedDate.split('-').reverse().join('-')}</td>
            <td>{book.price}</td>
            {!modify && 
              <td>
              {
              !cartStatus[index] 
                ? (<button className='btn btn-primary' onClick={() => addToCart(book.id, index)}>Add</button>)
                : (<button className='btn btn-danger' onClick={() => removeFromCart(book.id, index)}>Remove</button>)
              }
              </td>
            }           
            </tr>
          ))}
        </tbody>
      </table>
      <div className='mb-5'>
        {visibleBooks?.length < allBooksdata?.length && <button className='btn btn-secondary me-4' onClick={handleLoadMore}>Load More</button>}
        {page > 0 && <button className='btn btn-secondary' onClick={handleShowLess}>Show Less</button>}
      </div>
      {loading && <p>Loading...</p>}
    </div>  
  )
}

export default BooksTable