import React from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Create from './components/create';
import Edit from './components/Edit';
function App() {
  return (
    <div className='main'>
    <BrowserRouter>
      <Navbar />
      <Routes><Route path='/' element={<Home />} />
                          <Route path='/create' element={<Create />} />
        <Route path='/Edit/:id' element={<Edit />} /> 
       
      </Routes>    
         </BrowserRouter>
  </div>
  );
}

export default App;
