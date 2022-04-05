import { useEffect, useState } from "react"
import { useParams } from "react-router-dom" //to know if it's /categories/rent or sale

import { collection, getDocs, query, where, orderBy, limit, startAfter } from "firebase/firestore"

import { toast } from "react-toastify"
import {db} from '../firebase.config'

import Spinner from "../components/Spinner"
import ListingItem from "../components/ListingItem"

function Offers() {

  const [listings, setListings] =useState(null)
  const [loading, setLoading] =useState(true)

  const params = useParams()

  useEffect(() => {
    const fetchListings = async () => {
      try {
        //Get reference
        const listingsRef = collection(db, 'listings')  //refers to collection, not doc like in sign-up

        //make query
        const q = query(listingsRef, 
          where('offer', '==', true), //in app.js  <Route path='/category/:categoryName'
          orderBy('timestamp', 'desc'),
          limit(10)
          )  

        //Execute query
        const querySnap = await getDocs(q)

        const listings = []
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data()
          })
        })
        //Firebase requires a loop through querySnap and pushes data into listings array
        // the doc.data() method has all the info, but not the id.  doc.id has it

        //forEach mutates source array

        setListings(listings) //listings array is put into state
        setLoading(false)

      } catch (error) {
        toast.error('Could not fetch listings')
      }
    }

    fetchListings()
  }, [])

  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          Offers
        </p>
      </header>

      {loading ? <Spinner/> 
      : listings && listings.length > 0 ? 
      <>
      <main>
        <ul className="categoryListings">
          {listings.map((listing) => (
            <ListingItem
            listing={listing.data}
            id={listing.id}
            key={listing.id}
            />
          ))}
        </ul>
      </main>
      </>
      : 'No listings available'}

    </div>
  )
}

export default Offers