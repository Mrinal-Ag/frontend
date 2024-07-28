import React from 'react'
import HomeFeed from './HomeFeed'
import Navbar from '../../header/Navbar'

function Home(SERVER_URL) {
  return (
    <div className='Home_Main'>
        <Navbar className="z-index:100"/> 
        <div className='homer'>
            <HomeFeed className="Homefeed" SERVER_URL = {SERVER_URL}/>

           
        </div>
    </div>
  )
}

export default Home;