import React, { useState,useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import {getCategories,getProduct,updateProduct} from "./helper/adminapicall"
import {isAuthenticated} from "../auth/helper/index"


const UpdateProduct = ({match}) => {

  const {user,token} = isAuthenticated()

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formData: "",
  });

  {/*Destructuring*/}
  const {
    name,
    description,
    price,
    stock,
    categories,
    photo,
    category,
    loading,
    error,
    createdProduct,
    getaRedirect,
    formData
  } = values;


  const preLoad=(productId)=>{
      getProduct(productId)
      .then(data=>{
          if(data.error){
              setValues({...values,error:data.error})
          }
          else{
            preloadCategories()

              setValues({
                  ...values,
                  name:data.name,
                  description:data.description,
                  price:data.price,
                  category:data.category._id,
                  stock:data.stock,
                  formData : new FormData()
                })
          }
      })
  }

  const preloadCategories = ()=>{
      getCategories().then(data=>{
          if(data.error){
            setValues({...values,error:data.error})
          }
          else{
              setValues({
                  categories:data,
                  formData : new FormData()
              })
          }
      })
  }

  useEffect(()=>{
      preLoad(match.params.productId)
  },[])

  const onSubmit = event => {
    event.preventDefault();
    setValues({...values,error:"",loading:true})

    updateProduct(match.params.productId,user._id,token,formData)
    .then(data=>{
        if(data.error){
            setValues({...values,error:data.error})
        }
        else{
            setValues({
                ...values,
                name:"",
                description:"",
                price:"",
                photo:"",
                stock:"",
                loading:false,
                createdProduct: data.name
            })
        }
    })
  };

  const handleChange = name => event => {
    const value =name === "photo"
    ? event.target.files[0]
    : event.target.value 

    formData.set(name,value);
    setValues({...values,[name]:value})
  };

  const successMessage =()=>{
    return(  
    <div className="alert alert-success mt-3"
      style={{display: createdProduct ? "" : "none"}}
      >
      <h4>{createdProduct} updated Successfully</h4>
      </div>
    )
  }
  
  //TODO
  const warningMessage =()=>{
    if(error){
        return <h4 className="text-danger">Failed to create product</h4>
      }
}
  

  const createProductForm = () => {
    return (
      <form>
        <span>Post photo</span>
        <div className="form-group">
          <label className="btn btn-block btn-success form-label">
            <input
              onChange={handleChange("photo")}
              type="file"
              name="photo"
              accept="image"
              placeholder="choose a file"
            />
          </label>
        </div>

        <div className="form-group form-label">
          <input
            onChange={handleChange("name")}
            name="photo"
            className="form-control"
            placeholder="Name"
            value={name}
          />
        </div>

        <div className="form-group form-label">
          <textarea
            onChange={handleChange("description")}
            name="photo"
            className="form-control"
            placeholder="Description"
            value={description}
          />
        </div>

        <div className="form-group form-label">
          <input
            onChange={handleChange("price")}
            type="number"
            className="form-control"
            placeholder="Price"
            value={price}
          />
        </div>

        <div className="form-group form-label">
          <select
            onChange={handleChange("category")}
            className="form-control"
            placeholder="Category"
          >
            <option >Select</option>
            {categories && 
            categories.map((cate,index)=>(
                <option key={index} value={cate._id}>{cate.name}</option>
            ))
            }
          </select>
        </div>

        <div className="form-group form-label">
          <input
            onChange={handleChange("stock")}
            type="number"
            className="form-control"
            placeholder="Stock"
            value={stock}
          />
        </div>

        <button
          type="submit"
          onClick={onSubmit}
          className="btn bg-success text-white mb-3 form-label"
        >
          Update Product
        </button>
      </form>
    );
  };

  return (
    <Base
      title="Add a product here"
      description="Welcome to product creation section"
      className="container bg-info p-4"
    >
      <Link
        className="btn btn-sm text-white bg-dark btn-outline-light mb-2 mt-2"
        to="/admin/dashboard"
      >
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
        {successMessage()}
        {createProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateProduct;









