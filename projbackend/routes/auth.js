var express=require('express');
var router=express.Router();

const {check,validatonResult}=require('express-validator');

const {signout,signup,signin,isSignedIn}=require('../controllers/auth.js')


router.get("/signout",signout);

router.post("/signup",[
    check("name","name should be atleast 3 character").isLength({min:3}),
    check("email","email is required").isEmail(),
    check("password","password should be atleast 5 character").isLength({min:5})
],signup);

router.post("/signin",[
    //use of express validator
    check("email","email is required").isEmail(),
    check("password","password field is required").isLength({min:1})
],signin);

// router.get("/testroute", isSignedIn , (req,res)=>{
//     res.json(req.auth)
// })



module.exports=router;




