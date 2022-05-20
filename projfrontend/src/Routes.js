import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home.js";
import Signin from "./user/Signin.js";
import Signup from "./user/Signup.js";
import AdminRoute from "./auth/helper/AdminRoutes.js";
import PrivateRoute from "./auth/helper/PrivateRoutes.js";
import UserDashBoard from "./user/UserDashBoard"
import AdminDashBoard from "./user/AdminDashBoard"
import AddCategory from "./admin/AddCategory"
import ManageCategories from "./admin/ManageCategories.js";
import AddProduct from "./admin/AddProduct.js";
import ManageProducts from "./admin/ManageProducts.js"
import UpdateProduct from "./admin/UpdateProduct.js"
import Cart from "./core/Cart.js";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/cart" exact component={Cart} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashBoard}/>
        <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard}/>
        <AdminRoute path="/admin/create/category" exact component={AddCategory}/>
        <AdminRoute path="/admin/categories" exact component={ManageCategories}/>
        <AdminRoute path="/admin/create/product" exact component={AddProduct}/>
        <AdminRoute path="/admin/products" exact component={ManageProducts}/>
        <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct}/>
      </Switch>
    </BrowserRouter>
  );
};


export default Routes;


