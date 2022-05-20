export const addItemTOCart=(item,next)=>{
    let cart=[];

    if(typeof window !== undefined){
        if(localStorage.getItem("cart")){
            cart=JSON.parse(localStorage.getItem("cart"))
        }
        cart.push({
            ...item,
            count:1
        })
        localStorage.setItem("cart",JSON.stringify(cart))
        next();
    }
}


export const loadCart=()=>{
    if(typeof window !== undefined){
        if(localStorage.getItem("cart")){
            return JSON.parse(localStorage.getItem("cart"))
        }
    }
}


export const removeItemFromCart=(productId)=>{
    let cart=[]

    if(typeof window !== undefined){
        if(localStorage.getItem("cart")){
            cart=JSON.parse(localStorage.getItem("cart"))
        }
        cart.map((product, ind)=>{
            if(product._id===productId){
                cart.splice(ind,1)
            }
        })
        localStorage.setItem("cart",JSON.stringify(cart))
    }
    return cart;
}


export const cartEmpty = next =>{
    if(typeof window !==undefined){
        localStorage.removeItem("cart")
        next();
    }
}


