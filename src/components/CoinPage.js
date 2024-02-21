import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CryptoState } from '../CryptoContext'
import { SingleCoin } from '../config/api'
import axios from 'axios'
import { Typography } from '@mui/material'
import HTMLReactParser from 'html-react-parser'

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
  return (
    <div className='container'>
      <div className='coinInfo'>
        <img height="200" src={coin?.image.large} alt={coin?.name}></img>
        <Typography variant='h3' className='heading'>{coin?.name}</Typography>
        <Typography variant='subtitle1' className='coinDescription'>{HTMLReactParser(`${coin?.description.en.split('. ')[0]}`)}</Typography>
      </div>
     
    </div>
  )
}

export default CoinPage
