import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Components/Login'
import Registration from './Components/Registration'
import Home from './Components/Home';
import MyStocks from './Components/MyStocks';
import Profile from './Components/Profile';
import Logout from './Components/Logout';
import showStocks from './Components/showStocks';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home/>} />
      <Route path="/register" element={<Registration />} />
      <Route path="/mystocks" element={<MyStocks />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
      <Route path='/logout' element={<Logout/>}/>
      <Route path='/stocks' elemen={<showStocks/>}/>
    </Routes>
  );
}

export default App;
