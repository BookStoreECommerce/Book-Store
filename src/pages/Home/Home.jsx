import React from 'react'
import Slider from '../../Components/HomeComponents/Slider/Slider'
import NewBooks from '../../Components/HomeComponents/NewBooks/NewBooks'
import AboutUs from '../../Components/HomeComponents/AboutUs/AboutUs';
import Reviews from '../../Components/HomeComponents/Reviews/Reviews';
import Categories from '../../Components/HomeComponents/Categories/Categories';
import ScrollToTop from '../../Components/ReusableComponents/ScrollToTop/ScrollToTop';
import BestSeller from '../../Components/HomeComponents/BestSeller/BestSeller';
import Suggested from '../../Components/HomeComponents/Suggested/Suggested';
import LastSearch from '../../Components/HomeComponents/LastSearch/LastSearch';
import { useSelector } from 'react-redux';


export default function Home() {

  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Slider />
      {user?<><Suggested/></>:''}
      <Categories />
      <NewBooks />

      <AboutUs />
      <BestSeller />
      {user?<><LastSearch/></>:''}
      <Reviews />
      <ScrollToTop />
    </>
  )
}
