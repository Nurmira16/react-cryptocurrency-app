import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext'
import axios from 'axios'
import { HistoricalChart } from '../config/api'
import { ThemeProvider, createTheme } from '@mui/material'
import { dark } from '@mui/material/styles/createPalette'

function CoinInfo({coin}) {
    const [historicalData,setHistoricalData]=useState()
    const [day,setDay]=useState(1)
    const {currency}=CryptoState()
    const fetchHistoricalData=async()=>{
        const {data}=await axios.get(HistoricalChart(coin.id,day,currency))
        setHistoricalData(data.prices)
    }

    useEffect(()=>{
        fetchHistoricalData()
    },[currency,day])

    const darkTheme=createTheme({
        palette:{
          primary:{
            main: "#fff"
          },
          type:'dark'
        }
      })
  return (
    <ThemeProvider theme={darkTheme}>
        <div className='container'>
            
        </div>
    </ThemeProvider>
  )
}

export default CoinInfo
