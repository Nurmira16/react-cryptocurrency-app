import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext'
import { CoinList } from '../config/api'
import { Container, LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography, createTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { numberWithCommas } from './Banner/Carousel'

function CoinsTable() {
    const [coins,setCoins]=useState([])
    const[loading,setLoading]=useState(false)
    const navigate=useNavigate()
    const [search,setSearch]=useState("")
    const[page,setPage]=useState(1)

    const {currency,symbol}=CryptoState()
  

    const fetchCoins=async()=>{
        setLoading(true)
        const {data}=await axios.get(CoinList(currency))
        setCoins(data)
        setLoading(false)
    }
    console.log(coins);
    useEffect(()=>{
        fetchCoins()
    },[currency])

    const darkTheme=createTheme({
      palette: {
        primary: {
          main: '#FF5733',
          // light: will be calculated from palette.primary.main,
          // dark: will be calculated from palette.primary.main,
          // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
          main: '#E0C2FF',
          light: '#F5EBFF',
          // dark: will be calculated from palette.secondary.main,
          contrastText: '#47008F',
        },
      },
      })

      const handleSearch=()=>{
        return coins.filter((coin)=>(
          coin.name.toLowerCase().includes(search) ||
          coin.symbol.toLowerCase().includes(search) 
        ))
      }
  return (
  <ThemeProvider theme={darkTheme}>
    <Container style={{textAlign:'center'}}>
        <Typography variant='h4' style={{margin:18,fontFamily:'Montserrat'}}>CryptoCurrency Prices by Market Cap</Typography>
        <TextField label="Search for a Crypto Currency ..."
    variant='outlined'
    InputLabelProps={{ shrink: true }}
    style={{
        marginBottom: 70,
        width: '100%'
    }} onChange={(e)=>setSearch(e.target.value)}></TextField>
    <TableContainer>{loading?(
      <LinearProgress style={{backgroundColor:'gold'}}/>
    ):(<Table>
      <TableHead style={{backgroundColor:'#EEBC1D'}}>
        <TableRow>
          {['Coin','Price','24h Change','Market Cap'].map((head)=>(
            <TableCell style={{color:'black',fontWeight:'700',fontFamily:'Montserrat'}} key={head} align={head==='Coin'?"":"right"}>
              {head}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>{handleSearch().slice((page-1)*10, (page-1)*10+10).map(row=>{
        const profit=row.price_change_percentage_24h>0;
        return(
          <TableRow onClick={()=>navigate(`/coins/${row.id}`)} className='row' key={row.name}>
            <TableCell component='th' scope='row' style={{display:'flex',gap:15}}>
              <img src={row?.image} alt={row.name} height='50' style={{marginBottom:10}}></img>
              <div style={{display:'flex', flexDirection:'column'}}>
                <span style={{textTransform:'uppercase',fontSize:22, color:'white'}}>{row.symbol}</span>
                <span style={{color:'darkgrey'}}>{row.name}</span>
              </div>
            </TableCell>
            <TableCell align='right' style={{color:'white'}}>
              {symbol }{numberWithCommas(row.current_price.toFixed(2))}
            </TableCell>
            <TableCell align='right' style={{color:profit>0?'rgba(14,203,129)':'red', fontWeight:500}}>{profit && "+"}{row.price_change_percentage_24h.toFixed(2)}</TableCell>
            <TableCell align='right' style={{color:'white'}}>{symbol}{numberWithCommas(row.market_cap.toString().slice(0, -6))}M</TableCell>
          </TableRow>
        )
        })}</TableBody>
    
    </Table>
    )}
    </TableContainer>
    <Pagination style={{background:'#fff', padding:20,width:'100%',display:'flex',justifyContent:'center'}} count={(handleSearch()?.length/10).toFixed(0)} onChange={(_,value)=>{
      setPage(value);
      window.scroll(0,450)
    }}></Pagination>
    </Container>
  </ThemeProvider>
  )
}

export default CoinsTable
