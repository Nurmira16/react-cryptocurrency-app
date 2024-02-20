import React, { useEffect, useState } from 'react'
import { TrendingCoins } from '../../config/api'
import { CryptoState } from '../../CryptoContext'
import axios from 'axios'
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'
export const numberWithCommas=(x)=>{
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}

function Carousel() {
    const [trending,setTrending]=useState([])
    const {currency,symbol}=CryptoState()
    const fetchTrandingCoins=async()=>{
        const {data}= await axios.get(TrendingCoins(currency))
        setTrending(data)
    }
    console.log(trending);
    useEffect(()=>{
        fetchTrandingCoins()
    },[currency])

    const items=trending.map((coin)=>{
        let profit=coin.price_change_percentage_24h >=0;
                return(
            <Link className='carouselItem' to={`/coins/${coin.id}`}><img src={coin?.image} alt={coin.name} height='80' style={{marginBottom:10}}></img>
            <span>{coin?.symbol}&nbsp;</span>
            <span style={{color:profit>0?'rgba(14,203,129':'red'}}>{profit && '+'}{coin?.price_change_percentage_24h?.toFixed(2)}</span>
            <span style={{fontSize:22, fontWeight:500}}>{symbol}{numberWithCommas(coin?.current_price.toFixed(2))}</span>
            </Link>
        )
    })

    const responsive={
        0:{
            items:2,
        },
        520:{
            items:4
        }
    }
  return (
    <div className='carousel'>
      <AliceCarousel mouseTracking infinite autoPlayInterval={1000} animationDuration={1500} disableDotsControls disableButtonsControls responsive={responsive} autoPlay items={items}>

      </AliceCarousel>
    </div>
  )
}

export default Carousel
