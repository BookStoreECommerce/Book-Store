import React from 'react'
import Slider from './HomeSections/Slider/Slider'
import NewBooks from '../Home/HomeSections/NewBooks/NewBooks.jsx'
import AboutUs from './HomeSections/AboutUs/AboutUs';
import Reviews from './HomeSections/Reviews/Reviews';
import Rating from '../ReusableComponents/Rating/Rating';
import Categories from './HomeSections/Categories/Categories';
import ScrollToTop from '../ReusableComponents/ScrollToTop/ScrollToTop';


export default function Home() {

  return (
    <>
      <Slider />
      <Categories/>
      <NewBooks />
      <AboutUs />
      <Reviews />
      <Rating />
      <ScrollToTop/>

    </>
  )
}
