const User=require('../models/user.js');

//body
const {check, validationResult} = require('express-validator');

var jwt=require('jsonwebtoken');
var expressJwt=require('express-jwt');

exports.signout=(req,res)=>{    
    res.clearCookie("token");

    res.json({
        message:"User signout successfully"
    })
}

exports.signup=(req,res)=>{
    const errors=validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }

    const user=new User(req.body);
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                err: "NOT ABLE TO SAVE USER IN DATABASE"
            })
        }
        res.json({
            name:user.name,
            email:user.email,
            id:user._id
        })
    })

}

exports.signin=(req,res)=>{
    const errors=validationResult(req);
    const {email,password} = req.body; //destructuring of data

    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }

    User.findOne({email},(err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error:"USER is not signed up"
            })
        }

        if(!user.authenticate(password)){
            return res.status(401).json({
                error:"Email and Password does not match"
            })
        }
        
        // CREATE TOKEN
        const token=jwt.sign({_id: user._id}, process.env.SECRET)
        
        //PUT TOKEN IN COOKIE
        res.cookie("token" ,token , {expire:new Date()+9999});

        //SEND RESPONSE TO FRONT END
        const {_id,name,email,role}=user; //deconstructing data
        return res.json({token , user: {_id,name,email,role}})

    })
}


//PROTECTED ROUTES (It is a middleware)
//Checker for token
exports.isSignedIn=expressJwt({
    secret:process.env.SECRET,
    userProperty:"auth"
});//next() is not used because we have created a middleware using express-jwt


//CUSTOM MIDDLEWARE
exports.isAuthenticated=(req,res,next)=>{

    //profile -> through the frontend we will make a property under the user and this property is only going to be set if the user is logged in
    //auth -> set up by protected route(isSignedIn)  
    let checker = (req.profile) && (req.auth) && (req.profile._id == req.auth._id) ;

    if(!checker){
        return res.status(403).json({
            errror:"ACCESS DENIED"
        })
    }
    next();
}

exports.isAdmin=(req,res,next)=>{

    if(req.profile.role === 0){
        return res.status(403).json({
            errror:"YOU ARE NOT ADMIN, ACCESS DENIED"
        })
    }
    
    next();
}