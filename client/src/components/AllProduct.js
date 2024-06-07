import { Button, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { Alert, Spinner } from 'flowbite-react';

import { FloatingLabel } from 'flowbite-react';
import FilterAltIcon from '@mui/icons-material/FilterAlt.js';
import { productFetchStart,productFetchSuccess,productFetchFailure } from '../redux/product/productSlice.js';
import Card from './card.js';
export default function Search() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { loading, products, error: errorMessage } = useSelector((state) => state.product);

  const [category, setCategory] = useState("all");
 
  const [name, setName] = useState("");
 
  const [showMore, setShowMore] = useState(true);
  const navigate = useNavigate();
  const [isOpen,setOpen]=useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 720);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(productFetchStart());
        const res = await fetch(`http://localhost:8000/api/products`);
        const data = await res.json();
        if (res.ok) {

          dispatch(productFetchSuccess(data.products));
          if (data.products.length <= 12) {
            setShowMore(false);
          }
        }
      } catch (error) {
        dispatch(productFetchFailure(error.message));
        console.log(error.message);
      }
    };

    fetchProducts();

  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    try {
      dispatch(productFetchStart());
      let url = 'http://localhost:8000/api/products';  // fetching all products

      const queryParams = [];
      if (category !== "all") {
        queryParams.push(`category=${encodeURIComponent(category)}`);
      }
      if (name != "") {
        queryParams.push(`searchTerm=${encodeURIComponent(name)}`);
      }
      
      // setting the query parameters
      if (queryParams.length > 0) {
        url += '?' + queryParams.join('&');
      }
      console.log(url);
      const res = await fetch(url);
      console.log(res);
      // to filter according to category and name
      const data = await res.json();
      if (res.ok) {
        dispatch(productFetchSuccess(data.products));
        setShowMore(data.products.length >= 12);
      }
    } catch (error) {
      dispatch(productFetchFailure(error.message));
      console.log(error.message);
    }
  }
  console.log(products);
  return (
    <div >
   
      <div className=' flex flex-col relative  bg-[#f6edff] h-[90vh] my-[2%]  md:flex-row'>
        <div className="absolute right-[2%]  top-[2%] ">

          {isSmallScreen && <Button size="sm" onClick={() => setOpen(!isOpen)} >
            <FilterAltIcon />Filter
          </Button>}
        </div>
        {isOpen && isSmallScreen?
        <div className='px-7 opacity-95 absolute right-[2%] top-[6%] bg-white m-[2%] shadow-xl text-gray-800 rounded-xl border-b  md:border-r h-[50%] w-[50%]  '>
        <div className='my-[12%] font-bold text-xl'>
          Filters
        </div>
        <form className='flex flex-col gap-8'>
          <div className='flex flex-col items-center gap-6'>
            <FloatingLabel onChange={(e) => setName(e.target.value)} variant="standard" label="Search by Name" name="name" className="text-gray-800" type="text"
            />

            <div className='flex justify-evenly gap-5'>


              <label htmlFor="category" className="block text-gray-800 text-lg font-bold mb-2">Category</label>
              <select
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-[60%] px-3 py-2 border text-black text-sm rounded-md focus:outline-none focus:border-blue-500"
                required
              >
               <option value="">Select Category</option>
                                <option value="fruit">Fruit & Veggies</option>
                                <option value="Clothes">Clothes</option>
                                <option value="Groccery">Groccery</option>
              </select>
            </div>

            <Button type='submit' onClick={handleSubmit} outline gradientDuoTone='purpleToPink'>
              Apply Filters
            </Button>
            {errorMessage &&
              <Alert color='failure'>
                {errorMessage}

              </Alert>}
          </div>
        </form>

      </div>:""}

            
      {!isSmallScreen && <div className='px-7 bg-white m-[2%] shadow-xl text-gray-800 rounded-xl border-b border-2 md:border-r h-[90%] w-[30%]  '>
        <div className='my-[12%] font-bold text-xl'>
          Filters
        </div>
        <form className='flex flex-col gap-8'>
          <div className='flex flex-col items-center gap-6'>
            <FloatingLabel onChange={(e) => setName(e.target.value)} variant="standard" label="Search by Name" name="name" className="text-gray-800" type="text"
            />

          
            <div className='flex justify-evenly gap-5'>


              <label htmlFor="category" className="block text-gray-800 text-lg font-bold mb-2">Category</label>
              <select
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-[60%] px-3 py-2 border text-black text-sm rounded-md focus:outline-none focus:border-blue-500"
                required
              >
                <option value="">Select Category</option>
                                <option value="Fruit & Veggies">Fruit & Veggies</option>
                                <option value="Clothes">Clothes</option>
                                <option value="Groccery">Groccery</option>
              </select>
            </div>

            <Button type='submit' onClick={handleSubmit} outline gradientDuoTone='purpleToPink'>
              Apply Filters
            </Button>
            {errorMessage &&
              <Alert color='failure'>
                {errorMessage}

              </Alert>}
          </div>
        </form>

      </div>}
        
        <div className=' h-full    w-full'>
          <h1 className='text-2xl mx-[3%] md:mx-0 h-[8%] font-semibold sm:border-b-2 border-orange-500   mt-5 '>
            Product List:
          </h1>

          <div className='p-2 h-[89%]  flex flex-wrap gap-4 overflow-hidden overflow-y-scroll'>
            {loading &&
              <div className="text-center flex flex-col justify-center h-full  mx-auto">
                <Spinner size='xl' />
                <span className='pl-3'>Loading...</span>
              </div>
            }

            {!loading && products?.length === 0 && (
              <p className='text-xl text-gray-500'>No Products found.</p>
            )}


            <div className="mt-[2%]    grid grid-cols-2 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-4 gap-8    w-[100%] mx-auto">

              {products?.length > 0 && products?.map((card) => (
                <Card card={card} />
              ))}

            </div>

            {showMore && (
              <button
                // onClick={handleShowMore}
                className='text-teal-500 text-sm hover:underline  w-full'
              >
                Show More
              </button>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}