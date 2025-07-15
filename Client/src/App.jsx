import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Components/Login'
import Registration from './Components/Registration'
import Home from './Components/Home';
import MyStocks from './Components/MyStocks';
import Profile from './Components/Profile';
import Logout from './Components/Logout';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home/>} />
      <Route path="/register" element={<Registration />} />
      <Route path="/mystocks/:id" element={<MyStocks />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
      <Route path='/logout' element={<Logout/>}/>
    </Routes>
  );
}

export default App;
