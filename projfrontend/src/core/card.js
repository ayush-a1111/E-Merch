import React,{useState,useEffect} from "react";
import { addItemTOCart, removeItemFromCart } from "./helper/cartHelper";
import ImageHelper from "./helper/ImageHelper";
import {Redirect} from "react-router-dom"


const Card = ({ product, addToCart = true, removeFromCart = false,setReload= f => f,reload=undefined }) => {
  
  const [redirect,setRedirect] = useState(false)
  const [count,setCount] = useState(product.count)

  
  const cardTitle= product 
  ? product.name
  : "Photo from pexels"

  const cardDescription= product 
  ? product.description
  : "Default description"

  const cardPrice= product 
  ? product.price
  : "Default price"
  
  const AddToTheCart=()=>{
    addItemTOCart(product,()=>setRedirect(true))
  }

  const getARedirect=(redirect)=>{
    if(redirect){
      return <Redirect to="/cart" />
    }
  }
  
  const showAddToCart = (addToCart) => {
        return(
            addToCart && (
                <button onClick={AddToTheCart} className="btn btn-outline-success">
                Add to Cart
              </button>
            )
        )
  };

  const showRemoveFromCart = (removeFromCart) => {
      return(
          removeFromCart && (
            <button onClick={() => {
              removeItemFromCart(product._id)
              setReload(!reload)
            }} className="btn btn-outline-danger mt-3">
            Remove from cart
          </button>
          )
      )
  };
  
  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{cardTitle}</div>
      <div className="card-body">
        {getARedirect(redirect)}
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {cardDescription}
        </p>
        <p className="btn btn-success rounded btn-sm px-4">₹ {cardPrice}</p>
        <div className="row">
         {showAddToCart(addToCart)}
          {showRemoveFromCart(removeFromCart)}
        </div>
      </div>
    </div>
  );
};

export default Card;
