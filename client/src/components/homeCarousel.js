import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // import the carousel styles
import img from "../images/image1.avif";
import img1 from "../images/img2.webp";
import img2 from "../images/img3.jpg";
import img3 from "../images/img6.png";
// Landing Page carousel
const HomeCarousel = () => {
    return (
        <div style={{ width: '98vw', height: '100vh' }} className='mx-auto'>
            <Carousel 
                autoPlay 
                infiniteLoop 
                showThumbs={false} 
                showStatus={false} 
                dynamicHeight={false}
                interval={3000} // Change slide every 3 seconds
            >
                <div>
                    <img src={img2} alt="Image 1" style={{ width: '100%', height: '100vh', objectFit: 'cover' }} />
                </div>
                <div>
                    <img src={img1} alt="Image 2" style={{ width: '100%', height: '100vh', objectFit: 'cover' }} />
                </div>
                <div>
                    <img src={img3} alt="Image 3" style={{ width: '100%', height: '100vh', objectFit: 'cover' }} />
                </div>
            </Carousel>
        </div>
    );
};

export default HomeCarousel;
