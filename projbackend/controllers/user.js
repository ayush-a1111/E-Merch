const User=require("../models/user.js")
const Order=require("../models/order.js")

//use of params
exports.getUserById=(req,res,next,id) => {

    //whenever there is  databse callback - err, object itself
    User.findById(id).exec((err,user) => {
        if(err || !user){
            return res.status(400).json({
                error : "No User was found in datatbase"
            })
        }

        req.profile = user;
        next();
    })
}

exports.getUser=(req,res)=>{
    
    //We are not making these values undefined in the database
    //We are just making these values undefined in the user profile
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;


    return res.json(req.profile)
}

//To get all users

// exports.getAllUsers=(req,res) =>{
//     User.find().exec((err,users)=>{
//         if(err || !users){
//             return res.status(400).json({
//                 error: "No user found"
//             })
//         }
//         res.json(users)
//     })
// }

exports.updateUser=(req,res)=>{
    User.findByIdAndUpdate(
        {_id : req.profile._id},
        //$set -> for properties that needs to be updated
        {$set : req.body},
        //necessary statements at the time of updating the database
        {new : true , useFindAndModify: false },
        (err,user)=>{
            if(err){
                return res.status(400).json({
                    error:"You are not authorized to update this information"
                })
            }

            user.salt = undefined;
            user.encry_password = undefined;
            user.createdAt = undefined;
            user.updatedAt = undefined;

            res.json(user)
        }
    )
}

//using populate to pulling the information from the order model
exports.userPurchaseList =(req,res)=>{
    Order.find({user : req.profile._id})
    //no commma in between _id and name (syntax)
    //if we wanted something other than _id and name (let's say email) then "_id name email"
    //.populate(which model/object you want to update,which fields you want to bring in)
    .populate("user","_id name")
    .exec((err,order)=>{
        if(err){
            return res.status(400).json({
                error:"No order in this account"
            })
        }

        return res.json(order)
    })
}


//Middleware
exports.pushOrderInPurchaseList=(res,req,next)=>{
    
    let purchases =[]
    req.body.order.products.forEach(product => {
        purchases.push({
            _id:product._id,
            name:product.name,
            description:product.description,
            category:product.category,
            quantity:product.quantity,
            amount:req.body.order.amount,
            transaction_id:req.body.order.transaction_id
        })
    })
    
    //store this in database
    User.findOneAndUpdate(
        {_id:req.profile._id},
        {$push:{purchases:purchases}},
        {new:true},
        (err,purchases)=>{
            if(err){
                return res.status(400).json({
                    error:"Unable to save purchase list"
                })
            }

            next();

        }
    )
    
}




