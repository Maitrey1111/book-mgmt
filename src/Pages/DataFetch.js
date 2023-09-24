import {React, useEffect} from 'react'
import { db } from '../Firebase/firebase'
import { addDoc, collection, doc, getDoc, getDocs } from 'firebase/firestore';

const DataFetch = () => {
  const fetchData = async () => {
    const queries = ['trending', 'famous', 'danbrown']
    try {
      queries.forEach(async(query)=>{
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=1&maxResults=30`);
        const apiData = await response.json();
        let documents = []
        console.log(apiData)
        for (let item of apiData.items) {
            if(item.volumeInfo.title && item.volumeInfo.authors && item.volumeInfo.categories && item.volumeInfo.publishedDate && item.saleInfo.retailPrice) {
              let newItem = {
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
        }
        documents = Array.from(new Set(documents))
        const val = await getDocs(collection(db, "Books"))
        if(val.docs.length === 0) //if length of docs is zero, add new data 
          documents.forEach(async (doc) => {await addDoc(collection(db, "Books"), doc, { merge: true })})
      })
    } catch(err) {
      console.error(err)
    }
  }

  return (
    <div>
      <button className="btn btn-warning mb-3" onClick={fetchData}>
        Restore All Books
      </button>
    </div>
  )
}

export default DataFetch