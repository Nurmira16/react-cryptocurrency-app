import { Container, Typography } from '@mui/material'
import React from 'react'
import Carousel from './Carousel'

function Banner() {
  return (
    <div className='banner'>
      <Container className='bannerContent'>
        <div className='tagline'>
          <Typography variant='h2' style={{fontWeight:'bold', marginBottom:15,fontFamily:'Montserrat'}} >Crypto Hunter</Typography>
          <Typography variant='subtitle2' style={{fontFamily:'Montserrat', color:'darkgrey',textTransform:'capitalize'}} >Get all the info regarding your favorite Crypto Currency</Typography>
        </div>
        <Carousel/>
      </Container>
    </div>
  )
}

export default Banner
