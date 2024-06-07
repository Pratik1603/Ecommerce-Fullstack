import { useState, useEffect } from "react";
import React from "react";
import Footer from '../../components/Footer.js';
import Navbar from '../../components/Navbar.js';
import { Button, Modal, TextInput, Label } from "flowbite-react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    productFetchStart,
    productFetchSuccess,
    productFetchFailure,
} from '../../redux/product/productSlice.js';
import Card from "../../components/card.js";
import { updateCart } from "../cart/cartAction.js";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { productSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const { products, error: errorMessage } = useSelector((state) => state.product);
    const [error, setError] = useState(false);
    const [product, setProduct] = useState(null);
    const { currentUser } = useSelector((state) => state.user);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updatedProduct, setUpdatedProduct] = useState({
        name: '',
        imageUrl: '',
        description: '',
        price: '',
        category: '',
        stock: ''
    });
// Delete product , only admin function
    const handleDelete = async (productId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/products/${productId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Could not remove item from cart');
            }
            navigate('/');
        } catch (error) {
            return error.message;
            navigate('/');
        }
    };
    // Add product to cart
    const handleIncrease = (productId) => {
        if (currentUser) {
            console.log('Adding to cart:', productId, currentUser._id);
            dispatch(updateCart({ userId: currentUser._id, productId, quantity: 1 }));
        } else {
            console.log('User not logged in');
        }
    };

    const handleUpdate = async (productId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/products/${productId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProduct),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Could not update the product');
            }
            setProduct(data);
            setShowUpdateModal(false);
        } catch (error) {
            console.error('Error updating product:', error.message);
        }
    };
    // use effect to fetch products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                dispatch(productFetchStart());
                const res = await fetch(`http://localhost:8000/api/products?limit=5`);
                const data = await res.json();
                if (res.ok) {
                    dispatch(productFetchSuccess(data.products));
                } else {
                    throw new Error(data.message);
                }
            } catch (error) {
                dispatch(productFetchFailure(error.message));
                console.log('Error fetching products:', error.message);
            }
        };
        fetchProducts();
    }, [dispatch]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const res = await fetch(`http://localhost:8000/api/products?slug=${productSlug}`);
                const data = await res.json();
                if (res.ok) {
                    setProduct(data.products[0]);
                    setUpdatedProduct(data.products[0]);
                    setLoading(false);
                    setError(false);
                } else {
                    setError(true);
                    setLoading(false);
                }
            } catch (error) {
                setError(true);
                setLoading(false);
                console.log('Error fetching product:', error.message);
            }
        };
        fetchProduct();
    }, [productSlug]);

    return (
        <div className="border-2">
            <Navbar />
            <div className="px-[2%] mt-[6%] h-[100vh]">
                <div className="relative h-[45%] flex justify-evenly">
                    <div className="w-[40%] md:w-[25%] flex rounded-xl flex-col justify-center">
                        <img src={product?.imageUrl} className="rounded-xl w-full md:w-[70%] h-[90%] mx-auto" alt={product?.name} />
                    </div>
                    <div className="w-[60%] md:w-[70%] relative">
                        {currentUser?.isAdmin && (
                            <>
                                <button
                                    onClick={() => handleDelete(product?._id)}
                                    className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-2xl hover:bg-red-700"
                                >
                                    <DeleteIcon />
                                </button>
                                <button
                                    onClick={() => setShowUpdateModal(true)}
                                    className="absolute mx-2 top-2 right-12 bg-blue-600 text-white p-2 rounded-2xl hover:bg-blue-700"
                                >
                                    Update
                                </button>
                            </>
                        )}
                        <div className="font-bold text-2xl p-2 w-full h-[20%]">
                            {product?.name}
                        </div>
                        <div className="px-[1%] m-[1%] rounded-xl border-black bg-[#f3ecfc] overflow-hidden overflow-y-scroll py-[1%] text-sm h-[39%]" dangerouslySetInnerHTML={{ __html: product && product?.description }}></div>
                        <div className="mx-2 p-2 bg-orange-400 md:w-[20%] w-[90%] text-white font-semibold h-[10%] flex flex-col justify-center text-center rounded-xl">
                            {product?.category}
                        </div>
                        <div className="h-[18%] flex justify-between">
                            <div className="mx-[2%] flex flex-col justify-center text-xl md:text-2xl font-bold">
                                $ {product?.price}/Qty
                            </div>
                            <div className="w-[60%] md:w-[40%] h-[60%] md:h-full my-auto flex justify-evenly">
                                <Button gradientDuoTone='purpleToBlue' onClick={() => handleIncrease(product?._id)}>
                                    <span className="mx-1">Add to Cart</span>
                                    <AddShoppingCartIcon />
                                </Button>
                                <div>
                                    <FavoriteBorderIcon style={{ margin: "auto", marginTop: "30%" }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex h-[55%]">
                    <div className="p-[2%] flex flex-col justify-evenly w-full md:w-[70%]">
                        <div className="mb-[2%] border-b-4 border-orange-500 py-[1%] w-[40%] md:w-[20%] text-xl font-bold">
                            Product Details
                        </div>
                        <div className="flex border-b-2 border-[#2c4cab] w-[80%] h-10">
                            <div className="text-sm flex flex-col justify-center px-[2%] font-bold w-[30%]">
                                Product Title
                            </div>
                            <div className="text-sm flex flex-col justify-center px-[2%] w-[70%]">
                                {product?.name}
                            </div>
                        </div>
                        <div className="flex border-b-2 border-[#2c4cab] w-[80%] h-10">
                            <div className="text-sm flex flex-col justify-center px-[2%] font-bold w-[30%]">
                                Total Stock
                            </div>
                            <div className="text-sm flex flex-col justify-center px-[2%] w-[70%]">
                                {product?.stock}
                            </div>
                        </div>
                        <div className="flex border-b-2 border-[#2c4cab] w-[80%] h-10">
                            <div className="text-sm flex flex-col justify-center px-[2%] font-bold w-[30%]">
                                Price
                            </div>
                            <div className="text-sm flex flex-col justify-center px-[2%] w-[70%]">
                                {product?.price}
                            </div>
                        </div>
                        <div className="flex border-b-2 border-[#2c4cab] w-[80%] h-10">
                            <div className="text-sm flex flex-col justify-center px-[2%] font-bold w-[30%]">
                                Category
                            </div>
                            <div className="text-sm flex flex-col justify-center px-[2%]">
                                <div className="p-2 bg-orange-400 text-white font-semibold h-[80%] flex flex-col justify-center text-center rounded-xl">
                                    {product?.category}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-[2%]">
                <div className="text-2xl font-bold">
                    Similar Products
                </div>
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 h-64 w-[100%] mx-auto">
                    {products?.length > 0 && products?.map((card) => (
                        <Card key={card._id} card={card} />
                    ))}
                </div>
                <div className="text-center w-full">
                    <button
                        onClick={() => navigate('/')}
                        className='w-full text-teal-500 self-center text-sm py-1'
                    >
                        Show more
                    </button>
                </div>
            </div>
            <Footer />

            {showUpdateModal && (
                <Modal
                    show={showUpdateModal}
                    onClose={() => setShowUpdateModal(false)}
                >
                    <Modal.Header>Update Product</Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="mb-4">
                                <Label htmlFor="name">Name</Label>
                                <TextInput
                                    id="name"
                                    type="text"
                                    value={updatedProduct.name}
                                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                                />
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="imageUrl">Image URL</Label>
                                <TextInput
                                    id="imageUrl"
                                    type="text"
                                    value={updatedProduct.imageUrl}
                                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, imageUrl: e.target.value })}
                                />
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="description">Description</Label>
                                <TextInput
                                    id="description"
                                    type="text"
                                    value={updatedProduct.description}
                                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })}
                                />
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="price">Price</Label>
                                <TextInput
                                    id="price"
                                    type="number"
                                    value={updatedProduct.price}
                                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="category" className="block text-gray-800 text-lg font-bold mb-2">Category</label>
                                <select
                                    id="category"
                                    name="category"
                                    value={updatedProduct.category}
                                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, category: e.target.value })}
                                    className="w-[60%] px-3 py-2 border text-black text-sm rounded-md focus:outline-none focus:border-blue-500"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    <option value="fruit">Fruit & Veggies</option>
                                    <option value="Clothes">Clothes</option>
                                    <option value="Groccery">Groccery</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="stock">Stock</Label>
                                <TextInput
                                    id="stock"
                                    type="number"
                                    value={updatedProduct.stock}
                                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, stock: e.target.value })}
                                />
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => handleUpdate(product?._id)}>
                            Update
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
}

export default ProductPage;
