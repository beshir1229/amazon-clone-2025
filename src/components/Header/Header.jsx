import React, { useContext } from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { BsCartCheck } from "react-icons/bs";
import LowerHeader from "./LowerHeader";
import { SlLocationPin } from "react-icons/sl";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/firebase";

function Header() {
  const [state] = useContext(DataContext);
  const { user, basket } = state;
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  return (
    <section className={classes.fixed}>
      <div className={classes.header_container}>
        {/* LEFT: Logo + Delivery */}
        <div className={classes.logo_container}>
          <Link to="/">
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="amazon logo"
            />
          </Link>
          <div className={classes.delivery}>
            <span>
              <SlLocationPin />
            </span>
            <p>Delivered to</p>
            <span>United States</span>
          </div>
        </div>
        {/* MIDDLE: Search */}
        <div className={classes.search}>
          <select name="" id="">
            <option value="">All</option>
          </select>
          <input type="text" />
          <FaSearch size={25} />
        </div>
        {/* RIGHT: Language + Account + Orders + Cart */}
        <div className={classes.order_container}>
          <Link to="" className={classes.language}>
            <img
              src="https://i.etsystatic.com/20553578/r/il/e4756e/2218569548/il_fullxfull.2218569548_8icn.jpg"
              alt="flag"
            />
            <select name="" id="">
              <option value="">EN</option>
            </select>
          </Link>
          <Link to={!user && "/signup"}>
            <div>
              {user ? (
                <>
                  <p>Hello {user.email?.split("@")[0]}</p>
                  <span onClick={() => auth.signOut()}>Sign out</span>
                </>
              ) : (
                <>
                  {" "}
                  <p>Hello, Sign In</p>
                  <span>Account & Lists</span>
                </>
              )}
            </div>
          </Link>
          <Link to="/orders">
            <p>Returns</p>
            <span>& Orders</span>
          </Link>

          <Link to="/cart" className={classes.cart}>
            <BsCartCheck size={35} />
            <span>{totalItem}</span>
          </Link>
        </div>
      </div>
      <LowerHeader />
    </section>
  );
}

export default Header;
