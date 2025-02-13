import React from 'react'
import {Routes,Route,Navigate} from 'react-router-dom';
import Home from '../pages/Home';
import TourDetail from '../pages/TourDetail';
import Tours from '../pages/Tours';
import Login from '../pages/Login';
import Register from '../pages/Register';
import SearchResultList from '../pages/SearchResultList';
import ThankYou from '../pages/ThankYou';
import MasonryImagesGallery from '../components/Image-gallery/MasonryImagesGallery';
import About from '../components/About/About';

const Router = () => {
  return (
    <Routes>
        <Route path='/' element={<Navigate to='/home'/>}/> 
        <Route path='/home' element={<Home/>}/> 
        <Route path='/tours' element={<Tours/>}/> 
        <Route path='/tours/:id' element={<TourDetail/>}/> 
        <Route path='/login' element={<Login/>}/> 
        <Route path='/gallery' element={<MasonryImagesGallery/>}/> 
        <Route path='/about' element={<About/>}/> 
        <Route path='/register' element={<Register/>}/> 
        <Route path='/thank-you' element={<ThankYou/>}/> 
        <Route path='/tours/search' element={<SearchResultList/>}/> 


    </Routes>
  )
}

export default Router