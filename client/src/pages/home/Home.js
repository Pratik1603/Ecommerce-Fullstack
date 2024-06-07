import { useState } from "react";
import React from "react";
import AddProduct from "../../components/addProduct.js";
import Footer from '../../components/Footer.js';
import Navbar from '../../components/Navbar.js';
import { useSelector } from "react-redux";
import Search from "../../components/AllProduct.js";
import HomeCarousel from "../../components/homeCarousel.js";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [open, setOpen] = useState(false);
  const {currentUser}=useSelector((state)=>state.user);
  const navigate=useNavigate();
  return (
    <div className="bg-[#f6edff]">
      <Navbar/>
      <HomeCarousel/>
      {currentUser?.isAdmin ?
      <Button  gradientDuoTone='pinkToOrange' className=" m-6 "onClick={()=>navigate('/addProduct')}>
        Add Product
      </Button>:""}

   
      <Search/>


      
      <Footer/>
    </div>



  )

}

export default Home

