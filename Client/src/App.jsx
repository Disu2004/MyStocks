import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Components/Login'
import Registration from './Components/Registration'
import Home from './Components/Home';
import MyStocks from './Components/MyStocks';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home/:id" element={<Home/>} />
      <Route path="/register" element={<Registration />} />
      <Route path="/mystocks/:id" element={<MyStocks />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}

export default App;
