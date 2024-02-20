import { AppBar, Container, MenuItem, Select, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CryptoState } from '../CryptoContext'

function Header() {
const {currency,setCurrency}=CryptoState()

  const navigate=useNavigate()
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
    <AppBar color='transparent' position='static'>
      <Container >
        <Toolbar >
          <Typography onClick={()=>navigate(-1)} className='title' variant='h6'>
            Crypto Hunter
          </Typography>
          <Select  variant="standard" 
              style={{ width: 100, height: 40, color:"white", border:'1px solid white', textAlign:'center' }}
              value={currency} 
              onChange={(event) => setCurrency(event.target.value)}>
                
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"EUR"}>EUR</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  )
}

export default Header
