import React, { useEffect, useState } from 'react'
import { TrendingCoins } from '../../config/api'
import { CryptoState } from '../../CryptoContext'
import axios from 'axios'

function Carousel() {
    const [trending,setTrending]=useState([])
    const {currency}=CryptoState()
    const fetchTrandingCoins=async()=>{
        const {data}= await axios.get(TrendingCoins(currency))
        setTrending(data)
    }
    console.log(trending);
    useEffect(()=>{
        fetchTrandingCoins()
    },[currency])
  return (
    <div className='carousel'>
      carousel
    </div>
  )
}

export default Carousel
