const {Order,ProductCart} = require("../models/order.js")


exports.getOrderById=(req,res,next,id)=>{
    Order.findById(id)
    .populate("products.product" , "name price")//no comma in populate "name price"
    .exec((err,order)=>{
        if(err){
            return res.status(400).json({
                error:"No order found in database"
            })
        }
        req.order = order
        next();
    })
}


exports.createOrder=(req,res)=>{
    req.body.order.user = req.profile
    const order = new Order(req.body.order)

    order.save((err,order)=>{
        if(err){
            return res.status(400).json({
                error:"Failed to save your order in database"
            })
        }
        res.json(order)
    })
    
    
}


exports.getAllOrders=(req,res)=>{
    Order.find()
    .populate("user","_id name")//no comma in populate
    .exec((err,order)=>{
        if(err){
            return res.status(400).json({
                error:"No orders found in database"
            })
        }
        res.json(order)
    })
}

exports.getOrderStatus=(req,res)=>{
    res.json(Order.schema.path("status").enumVallues)
}

exports.updateStatus=(res,req)=>{
    Order.update(
        {_id:req.body.orderId},
        {$set:{status:req.body.status}},
        (err,order)=>{
            if(err){
                return res.status(400).json({
                    error:"Cannot update order status"
                })
            }
            res.json(order)
        }
    )
}




