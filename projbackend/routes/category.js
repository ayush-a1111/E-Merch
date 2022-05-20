const express=require('express');
const router=express.Router();

const {getCategoryById,createCategory,getCategory,getAllCategory,updateCategory,removeCategory}=require("../controllers/category.js")
const {isAdmin,isAuthenticated,isSignedIn}=require("../controllers/auth.js")
const {getUserById}=require("../controllers/user.js")


//PARAMS
router.param("userId", getUserById );
router.param("categoryId",getCategoryById);

//ACTUAL ROUTES
//create route
router.post("/category/create/:userId",isSignedIn,isAuthenticated,isAdmin, createCategory)
//get route
router.get("/category/:categoryId",getCategory)
router.get("/categories",getAllCategory)
//update route
router.put("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,updateCategory)
//delete route
router.delete("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,removeCategory)



module.exports=router;

