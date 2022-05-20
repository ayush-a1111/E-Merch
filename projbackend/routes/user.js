const express=require("express")
const router = express.Router();

const {getUserById, getUser/*,getAllUsers*/,updateUser,userPurchaseList}=require("../controllers/user.js")
const {isSignedIn,isAuthenticated,isAdmin}=require("../controllers/auth.js")


router.param("userId", getUserById );

router.get("/user/:userId",isSignedIn, isAuthenticated, getUser);
//route to get all users
// router.get("/users",getAllUsers)
router.put("/user/:userId",isSignedIn,isAuthenticated,updateUser)

router.get("/orders/user/:userId",isSignedIn,isAuthenticated,userPurchaseList)



module.exports = router;