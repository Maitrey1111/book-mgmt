import { React, useState, useEffect } from 'react'

const BooksTable = ({books, modify, addToCart, removeFromCart, cartStatus}) => {
  const pageSize = 5
  const [page, setPage] = useState(0)
  const [visibleBooks, setVisibleBooks] = useState([])
  
  useEffect(() => {
    let limit = (page+1)*pageSize
    if (limit >= books?.length) {
      limit = books?.length
    } 
    setVisibleBooks(books?.slice(0, limit))
  }, [page])

  const handleLoadMore = () => {
    setPage(page+1)
  }
  const handleShowLess = () => {
    setPage(0)
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
            {modify && <th>Cart Option</th>}
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
            {modify && 
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
        {books?.length >= 5 && visibleBooks?.length < books?.length && <button className='btn btn-secondary me-4' onClick={handleLoadMore}>Load More</button>}
        {books?.length > 5 && page > 0 && <button className='btn btn-secondary' onClick={handleShowLess}>Show Less</button>}
      </div>
    </div>  
  )
}

export default BooksTable