import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'flowbite-react';
import { fetchCart, updateCart, removeFromCart } from './cartAction';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
const CartPage = () => {
    const dispatch = useDispatch(); // use of redux
    const navigate = useNavigate();
    const { cart, loading, error } = useSelector(state => state.cart);
    const [total, setTotal] = useState(0);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        if (currentUser) {
            dispatch(fetchCart(currentUser._id));
        }
    }, [dispatch, currentUser]);
    // setting the cart
    useEffect(() => {
        if (cart?.products) {
            const totalAmount = cart?.products.reduce((acc, product) => acc + (product?.productId?.price * product?.quantity), 0);
            setTotal(totalAmount);
        }
    }, [cart]);
    // add item
    const handleIncrease = (productId) => {
        if (currentUser) {
            console.log('Adding to cart:', productId, currentUser._id);
            dispatch(updateCart({ userId: currentUser._id, productId, quantity: 1 })).then(() => {
                dispatch(fetchCart(currentUser._id));
            });
        } else {
            console.log('User not logged in');
        }
    };
    //remove item
    const handleDecrease = (productId) => {
        if (currentUser) {
            console.log('Adding to cart:', productId, currentUser._id);
            dispatch(updateCart({ userId: currentUser._id, productId, quantity: -1 })).then(() => {
                dispatch(fetchCart(currentUser._id));
            });
        } else {
            console.log('User not logged in');
        }
    };

    const handleRemove = (productId) => {
        if (currentUser) {
            console.log('Adding to cart:', productId, currentUser._id);
            dispatch(removeFromCart({ userId: currentUser._id, productId })).then(() => {
                dispatch(fetchCart(currentUser._id));
            });
        } else {
            console.log('User not logged in');
        }
    };

    
    return (
        <div className="bg-gradient-to-br border-2 from-[#f6edff] to-[#f5eefd]">
            <Navbar />
            <div className="px-[2%] mt-[6%] min-h-[70vh] overflow-y-scroll overflow-hidden">
                <h1 className="text-2xl font-bold">Your Cart</h1>
                {loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>Error: {error}</div>
                ) : (
                    <div className="flex flex-col mt-4">
                        {cart && cart?.products?.map(product => (
                            <div key={product.productId?._id} className="flex justify-between items-center  border-b-2 border-b-black py-4 h-44  ">
                                <div className="flex items-center  h-full">
                                    <img src={product.productId?.imageUrl} alt={product.productId?.name} className="rounded-xl w-40 h-40 object-cover mr-4" />
                                    
                                    <div className='flex flex-col justify-evenly   h-full'>
                                        <div className="text-xl   font-bold">{product?.productId?.name}</div>
                                        <div className="p-2 bg-orange-400 text-white font-semibold h-8 flex flex-col justify-center text-center rounded-xl">
                                    {product.productId?.category}
                                </div>
                                        <p className='font-bold text-lg'>$ {product?.productId?.price}</p>
                                    </div>
                                </div>
                                <div className="flex items-center ">
                                    <Button  gradientDuoTone='pinkToOrange' className='rounded-full text-xl' onClick={() => {
                                        if(product.quantity > 1){
                                            handleDecrease(product.productId?._id);
                                        } else {
                                            handleRemove(product.productId?._id);
                                        }
                                    }}><RemoveIcon/></Button>
                                    <span className="mx-4 text-lg font-bold">{product.quantity}</span>
                                    <Button  gradientDuoTone='pinkToOrange' className='text-xl rounded-full' onClick={() => handleIncrease(product.productId?._id)}><AddIcon/></Button>
                                    <Button  onClick={() => handleRemove(product.productId?._id)}  gradientDuoTone='pinkToOrange' className="ml-4"><RemoveShoppingCartIcon/></Button>
                                </div>
                            </div>
                        ))}
                       
                    </div>
                )}
            </div>
            <div className="text-right border-2 h-14 py-2 border-t-black px-2 ">
                            <h2 className="text-2xl font-bold">Total: $ {total}</h2>
            </div>
            <Footer />
        </div>
    );
};

export default CartPage;
