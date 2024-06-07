import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Card=({card})=>{
    const navigate=useNavigate();
    const { currentUser } = useSelector((state) => state.user);
    const handleClick=()=>{
      if(currentUser){
        navigate(`/product/${card.slug}`) 
      }
      else{
        navigate('/login');
      }
    }
    return(
        <div className="bg-white  rounded-xl flex flex-col justify-evenly shadow-lg   w-[90%] h-56 ">
        <div className="h-[50%] w-[95%]  rounded-xl mx-auto">
          <img src={card.imageUrl} className="w-[100%] h-[100%] rounded-xl" alt={card.name} />
        </div>
        <div className=" h-[50%]  px-[2%]">
          <div className="my-1 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">{card.name}</div>
          
          <div className="p-[2%] bg-orange-400 text-white font-semibold h-[20%] flex flex-col justify-center text-center rounded-xl ">
                                    {card.category}
                                </div>
          <div className="my-3 px-[2%] flex items-center justify-between">
            <span className="text-sm font-bold text-gray-900 dark:text-white">{card.price}/Qty</span>
            <a
              href="#"
              onClick={() => { handleClick()}}
              className="rounded-lg bg-cyan-700 px-1 py-1.5 text-center text-xs font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
            >
              View Product
            </a>
          </div>
        </div>
      </div>
    )
}

export default Card;