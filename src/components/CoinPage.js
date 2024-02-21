import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CryptoState } from '../CryptoContext'
import { SingleCoin } from '../config/api'
import axios from 'axios'
import { LinearProgress, Typography } from '@mui/material'
import HTMLReactParser from 'html-react-parser'
import { numberWithCommas } from './Banner/Carousel'
import CoinInfo from './CoinInfo'

function CoinPage() {
  const {id}=useParams()
  const [coin,setCoin]=useState()
  const {currency,symbol}=CryptoState()

  const fetchCoin= async ()=>{
    const {data}= await axios.get(SingleCoin(id));
    setCoin(data)
  }

  console.log(coin);
  useEffect(()=>{
    fetchCoin()
  },[])
  if(!coin)return <LinearProgress style={{backgroundColor:'gold'}}></LinearProgress>
  return (
    <div className='container'>
      <div className='coinInfo'>
        <img height="200" src={coin?.image.large} alt={coin?.name}></img>
        <Typography variant='h3' className='heading'>{coin?.name}</Typography>
        <Typography variant='subtitle1' className='coinDescription'>{HTMLReactParser(`${coin?.description.en.split('. ')[0]}`)}</Typography>
        <div className='marketData'>
          <span style={{display:'flex'}}>
            <Typography variant='h5' className='heading'>Rank:</Typography>&nbsp; &nbsp;
            <Typography variant='h5' style={{fontFamily:'Montserrat'}}>{coin?.market_cap_rank}</Typography>
          </span>

          <span style={{display:'flex'}}>
            <Typography variant='h5' className='heading'>Current Price:</Typography>&nbsp; &nbsp;
            <Typography variant='h5' style={{fontFamily:'Montserrat'}}>{symbol}{numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}</Typography>
          </span>

          <span style={{display:'flex'}}>
            <Typography variant='h5' className='heading'>Market Cap:</Typography>&nbsp; &nbsp;
            <Typography variant='h5' style={{fontFamily:'Montserrat'}}>{symbol}{numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0,-6))}M</Typography>
          </span>
        </div>
      </div>
      
      <CoinInfo coin={coin}></CoinInfo>
     
    </div>
  )
}

export default CoinPage
