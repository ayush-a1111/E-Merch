import React ,{useState,useEffect} from "react";
import "../styles.css";
import { API } from "../backend.js";

import Base from "./Base.js";
import Card from "./card";
import {loadCart} from "./helper/cartHelper"

const Cart=() =>{
  
    const [products,setProducts] = useState([])
    const[reload,setReload]=useState(false)



    useEffect(()=>{
        setProducts(loadCart)
    },[reload])

    const loadAllProducts = () =>{
        return (
            <div>
            <h2>This section is to load products</h2>
            {products.map((product,index)=>{
                return(
                <Card
                key={index}
                product={product}
                removeFromCart={true}
                addToCart={false}
                setReload={setReload}
                reload={reload}
                />
                )
            })}
            </div>
        )
    }

    const loadCheckout = () =>{
        return (
            <div>
            <h2>This section is for checkout</h2>
            </div>
        )
    }
    

  return (
    <Base title="Cart" description="Ready to checkout">
      <div className="row text-center">
      <div className="col col-6">{loadAllProducts()}</div>
      <div className="col col-6">{loadCheckout()}</div>
      </div>
    </Base>
  );
}



export default Cart;

