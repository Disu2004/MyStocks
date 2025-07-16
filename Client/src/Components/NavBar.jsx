import React from 'react'
import { useParams } from 'react-router'

const NavBar = () => {
  const {id} = useParams()
  return (
    <div>
    <nav style={{ display: 'flex', justifyContent: 'space-around', padding: '1rem', background: '#222', color: '#fff' }}>
        <a href={`/home`} style={{ color: '#fff', textDecoration: 'none' }}>Home</a>
        <a href="/about" style={{ color: '#fff', textDecoration: 'none' }}>About</a>
        <a href={`/mystocks`} style={{ color: '#fff', textDecoration: 'none' }}>My Stocks</a>
        <a href="/contact" style={{ color: '#fff', textDecoration: 'none' }}>Contact</a>
        <a href="/profile" style={{ color: '#fff', textDecoration: 'none' }}>Profile</a>
        <a href="/logout" style={{ color: '#fff', textDecoration: 'none' }}>LogOut</a>
    </nav>
    </div>
  )
}

export default NavBar
