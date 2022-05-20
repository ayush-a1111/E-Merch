import React, {Fragment} from "react";
import { Link, withRouter } from "react-router-dom";
import { signout,isAuthenticated } from "../auth/helper/index.js";


const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#FFFFFF" };
  }
};

const Menu = ({ history }) => {
  return (
    <div>
      <ul className="nav nav-tabs bg-dark">
        <li className="nav-items">
          <Link style={currentTab(history, "/")} className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li className="nav-items">
          <Link
            style={currentTab(history, "/cart")}
            className="nav-link"
            to="/cart"
          >
            Cart
          </Link>
        </li>
       {isAuthenticated() && isAuthenticated().user.role===0 && (
        <li className="nav-items">
        <Link
          style={currentTab(history, "/user/dashboard")}
          className="nav-link"
          to="/user/dashboard"
        >
          Dashboard
        </Link>
      </li>
       )}
       {isAuthenticated() && isAuthenticated().user.role===1 && (
        <li className="nav-items">
        <Link
          style={currentTab(history, "/admin/dashboard")}
          className="nav-link"
          to="/admin/dashboard"
        >
          Admin Dashboard
        </Link>
      </li>
       )}
        {!isAuthenticated() &&
          <Fragment>
          <li className="nav-items">
            <Link style={currentTab(history, "/signup")}
            className="nav-link" to="/signup">
              Sign up
            </Link>
          </li>
          <li className="nav-items">
            <Link style={currentTab(history, "/signin")}
            className="nav-link" to="/signin">
              Sign in
            </Link>
          </li>
          </Fragment>
        }
        {isAuthenticated() && (
          <li className="nav-items">
          <button
          className="nav-link text-danger box-outline-danger"
          type="button"
          onClick={()=>{
            signout(()=>{
              history.push("/")
            })
          }}
          >
          Signout
          </button>
          </li>
        )}
      </ul>
    </div>
  );
};


export default withRouter(Menu);
