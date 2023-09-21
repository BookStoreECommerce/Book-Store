import React from 'react'
import Slider from '../../Components/HomeComponents/Slider/Slider'
import NewBooks from '../../Components/HomeComponents/NewBooks/NewBooks'
import AboutUs from '../../Components/HomeComponents/AboutUs/AboutUs';
import Reviews from '../../Components/HomeComponents/Reviews/Reviews';
import Categories from '../../Components/HomeComponents/Categories/Categories';
import ScrollToTop from '../../Components/ReusableComponents/ScrollToTop/ScrollToTop';
import BestSeller from '../../Components/HomeComponents/BestSeller/BestSeller';
import PolicyDialog from '../../Components/Dialogs/PolicyDialog/PolicyDialog';


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
      <PolicyDialog/>
    </>
  )
}
