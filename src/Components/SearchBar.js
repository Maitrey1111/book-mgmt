import { React, useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const SearchBar = () => {
    const [query, setQuery] = useState('')
    const [options, setOptions] = useState([]);
  
    useEffect(() => {
      (async () => {
          // query ? await fetchResults(query) : await fetchResults('famous') 
      })()
    }, [query])

    const fetchResults = async (query) => {
      try {
        let response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=1&maxResults=40`);
        let apiData = await response.json()
        let documents = []
        apiData.items.forEach((item) => {
          if(item.volumeInfo.title && item.volumeInfo.authors && item.volumeInfo.categories && item.volumeInfo.publishedDate && item.saleInfo.retailPrice) {
            const newItem = {
                  title: item.volumeInfo.title,
                  authors: item.volumeInfo.authors,
                  categories: item.volumeInfo.categories,
                  publishedDate: item.volumeInfo.publishedDate,
                  availability: 10,
                  price: item.saleInfo.retailPrice.amount
                }
              if(!documents.find((doc)=> (doc.title === item.volumeInfo.title)))
                documents.push(newItem)
          }
        })
        // let jsonObject = documents.map(JSON.stringify)
        // let uniqueSet = new Set(jsonObject)
        // documents = Array.from(uniqueSet).map(JSON.parse)
        // documents.length ? setOptions(documents) : setOptions([{title:'searching...'}])
        setOptions(documents.slice(0,10))
        console.log(documents)
      } catch(err) {
        console.error(err)
      }
    }

  return (
    <div className='mb-4 w-50'>
      <Autocomplete
        freeSolo
        type="search"
        onChangeCapture={async (e) => {setQuery(e.target.value)}}
        options={options.map((option)=> option.title + " (" + option.availability + ")")}
        renderInput={(params) => <TextField {...params} label="Search Books" />}
      />
    </div>
  )
}

export default SearchBar