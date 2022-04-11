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
  const [lastFetchedListing, setLastFetchedListing] = useState(null)

  const params = useParams()

  useEffect(() => {
    const fetchListings = async () => {
      try {
        //Get reference
        const listingsRef = collection(db, 'listings')  //refers to collection, not doc like in sign-up

        //make query
        const q = query(listingsRef, 
          where('offer', '==', true), //in app.js  <Route path='3000/offers
          orderBy('timestamp', 'desc'),
          limit(1)
          )  

        //Execute query
        const querySnap = await getDocs(q)

          //assigns lastVisible, for pagination
          const lastVisible = querySnap.docs[querySnap.docs.length -1]
          setLastFetchedListing(lastVisible) 

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

  const onFetchMoreListings = async () => {
    try {
      //Get reference
      const listingsRef = collection(db, 'listings')  //refers to collection, not doc like in sign-up

      //make query
      const q = query(listingsRef, 
        where('offer', '==', true), //in app.js  <Route path='3000/offers
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchedListing),
        limit(1)
        )  

      //Execute query
      const querySnap = await getDocs(q)

        //assigns lastVisible, for pagination
        const lastVisible = querySnap.docs[querySnap.docs.length -1]
        setLastFetchedListing(lastVisible) 

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

      //Adds 1 to the prevState of 1
      setListings((prevState) => [...prevState, ...listings]) 
      setLoading(false)

    } catch (error) {
      toast.error('Could not fetch listings')
    }
  }


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
      <br/> 
           <br/> 
           {lastFetchedListing && (
            <p className="loadMore" onClick={onFetchMoreListings}>Load More</p>
           )}
      </>
      : 'No listings available'}

    </div>
  )
}

export default Offers