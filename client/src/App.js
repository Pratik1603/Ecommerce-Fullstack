import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import Home from './pages/home/Home.js';

import LoginSignup from './pages/login/Login.js';
import ProductPage from './pages/product/product.js';
import CartPage from './pages/cart/cartPage.js';
import AddProduct from './components/addProduct.js';
function App() {
  // implementation of routing
  return (
    <div className='bg-gradient-to-br from-[#f6edff] to-[#f5eefd]'>
      
      <BrowserRouter>
        <Routes>
        
        <Route path="/" element={<Home />} />
     
        <Route path='/login' element={<LoginSignup/>}/>
        <Route path={`/product/:productSlug`} element={<ProductPage/>}/>
        <Route path={`/cart`} element={<CartPage/>}/>
        <Route path={`/addProduct`} element={<AddProduct/>}/>
      </Routes>
     </BrowserRouter>
     
      
    </div>
  );
}

export default App;
