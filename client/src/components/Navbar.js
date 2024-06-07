import React, { useState } from 'react';
import './navbar.css';
import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import img from "../images/logo.jpg";
import PersonIcon from '@mui/icons-material/Person';
// Responsive navbr with all functions
function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const { currentUser } = useSelector((state) => state.user);

  const handleSignOut = () => {
    dispatch(signoutSuccess()); // Dispatch the logout action
    navigate('/login'); // Navigate to login page after sign-out
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={img} className='h-12 w-12 rounded-xl' alt="Logo"/>
      </div>
      <div className="navbar-links">
        <a onClick={() => navigate('/')} className='font-bold cursor-pointer '>Home</a>
        <a className='font-bold cursor-pointer'>Benefits</a>
        <a className=' font-bold cursor-pointer'>Features</a>
        <a onClick={() => navigate('/cart')} className='font-bold cursor-pointer'>Cart <ShoppingCartIcon /></a> 
        {!currentUser ? 
          <Button gradientDuoTone="pinkToOrange" className="inline" onClick={() => navigate('/login')}>
            LogIn / SignUp
          </Button> : 
          <div className='user-menu' onMouseEnter={toggleMenu} onMouseLeave={toggleMenu}>
            <PersonIcon/>
            <span className='mx-2'>{currentUser.username}</span>
            {showMenu && 
              <div className='user-menu-dropdown'>
                <a onClick={handleSignOut} className='font-bold cursor-pointer'>Sign Out</a>
              </div>
            }
          </div>
        }
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        <div className={`bar1 ${showMenu ? 'change' : ''}`}></div>
        <div className={`bar2 ${showMenu ? 'change' : ''}`}></div>
        <div className={`bar3 ${showMenu ? 'change' : ''}`}></div>
      </div>
      <div className={`${showMenu ? 'show' : 'not-show'}`}>
        <a className='font-bold cursor-pointer'>Home</a>
        <a className='font-bold cursor-pointer'>About</a>
        <a className='font-bold cursor-pointer' >Services</a>
        <a className='font-bold cursor-pointer' onClick={() => navigate('/cart')}>Cart <ShoppingCartIcon /></a>
        {!currentUser ? 
          <Button gradientDuoTone="pinkToOrange" className="inline" onClick={() => navigate('/login')}>
            LogIn / SignUp
          </Button> :
          <div className='font-bold cursor-pointer'><PersonIcon/><span className='mx-2'>{currentUser.username}</span></div>}
      </div>
    </nav>
  );
}

export default Navbar;
