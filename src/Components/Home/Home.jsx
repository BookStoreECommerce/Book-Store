import React from 'react'
import Slider from './HomeSections/Slider/Slider'
import NewBooks from '../Home/HomeSections/NewBooks/NewBooks.jsx'
import AboutUs from './HomeSections/AboutUs/AboutUs';
import Reviews from './HomeSections/Reviews/Reviews';
import Categories from './HomeSections/Categories/Categories';
import ScrollToTop from '../ReusableComponents/ScrollToTop/ScrollToTop';
import BestSeller from './HomeSections/BestSeller/BestSeller';
import BookProfile from '../BookProfile/BookProfile.jsx';


export default function Home() {

  return (
    <>
      <Slider />
      <NewBooks />
      <Categories />
      <AboutUs />
      <BestSeller />
      <Reviews />
      <ScrollToTop />
      <BookProfile />
    </>
  )
}
