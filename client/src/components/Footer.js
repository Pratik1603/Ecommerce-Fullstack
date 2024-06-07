import React from "react"
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
const Footer=()=>{
    return(
        <div className="bg-black h-full  text-white">
          
        <div className="h-68  flex justify-evenly py-8 text-white">
            <div className=" w-2/5 py-4 px-4 md:w-1/5">
                <div className="font-bold text-white text-xl mb-4">
                    Ecommerce App
                </div>
                <div className="text-sm">
                    comm.inc<br></br>
                    Contact us 87xxxxxx90<br></br>
                    Email us: Blocks@gmail.com
                </div>
                <div  className="border-2 transition ease-in hover:scale-110 rounded-xl mt-4 w-3/5 text-center font-bold">
                <a href="#home_section" >Get Started</a>
                    
                </div>
                <div className="mt-4 flex justify-evenly">
                    <FacebookIcon className="hover:scale-125 transition ease-in"/>
                    <InstagramIcon className="hover:scale-125 transition ease-in"/>
                    <LinkedInIcon className="hover:scale-125 transition ease-in"/>
                    <GitHubIcon className="hover:scale-125 transition ease-in"/>
                </div>
            </div>
            <div className="w-2/5 md:w-1/5 py-4 px-4">
                <div className="text-white text-lg font-bold">
                    Navigate
                </div>
                <div className="text-sm mt-4 ">
                    <ul className="flex flex-col gap-4">
                        <li className="hover:scale-105 transition ease-in">
                            Home
                        </li>
                        <li className="hover:scale-105 transition ease-in">
                            Services
                        </li>
                        <li className="hover:scale-105 transition ease-in">
                            Contact Us
                        </li>
                        <li className="hover:scale-105 transition ease-in">
                            Erc20
                        </li>
                    </ul>
                  
                </div>

            </div>
            <div className=" w-2/5 md:w-1/5 px-4 py-4">
                <div className="text-white text-lg font-bold">
                    Need Help ?
                </div>
                <div className="text-sm mt-4">
                With Ecommerce App, shopping becomes more than just a transaction—it's an immersive journey tailored to your preferences.
                </div>
            </div>
        </div>

        <div className="h-16 border-white border-t-4 bg-black flex w-full text-white ">
            <div className="w-2/4 text-center text-sm flex flex-col justify-center">
                Copyright © 2023 Pratik Gupta Ltd.
            </div>
            <div className="w-2/4 mx-auto flex flex-col justify-center">
                <ul className="flex justify-evenly text-xs mx-6 md:mx-14"> 
                    <li className="hover:scale-105 transition ease-in">
                        Terms And Conditions
                    </li>
                    <li className="hover:scale-105 transition ease-in">
                        Privacy Policy
                    </li>
                    <li className="hover:scale-105 transition ease-in">
                        Cookie Policy
                    </li>
                </ul>
            </div>
        </div>
       
        </div>
    )
}

export default Footer;