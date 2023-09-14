import React from 'react'
import Slider from './HomeSections/Slider/Slider'
import NewBooks from '../Home/HomeSections/NewBooks/NewBooks.jsx'
import AboutUs from './HomeSections/AboutUs/AboutUs';
import Reviews from './HomeSections/Reviews/Reviews';
import Rating from '../ReusableComponents/Rating/Rating';


export default function Home() {
  
  return (
   <>
   <Slider/>
<NewBooks/>
<AboutUs/>
<Reviews/>
<Rating/>

   </>
  )
}
