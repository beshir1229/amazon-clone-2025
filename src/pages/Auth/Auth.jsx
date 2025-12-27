import React, { useState, useContext } from "react";
import classes from "./Auth.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { CircleLoader } from "react-spinners";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
import { TiThSmall } from "react-icons/ti";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });

  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const navStateData = useLocation();
  console.log(navStateData);

  const authHandler = async (e, type) => {
    e.preventDefault();

    if (type === "signin") {
      setLoading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signIn: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signIn: false });
        });
    } else if (type === "signup") {
      setLoading({ ...loading, signUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signUp: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signUp: false });
        });
    }
  };

  return (
    <section className={classes.login}>
      <Link to="/">
        <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="" />
      </Link>

      <div className={classes.login_con}>
        <h1>Sign In</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData?.state?.msg}
          </small>
        )}

        <div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>

          <div>
            <label htmlFor="Password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>

          <button
            type="button"
            onClick={(e) => authHandler(e, "signin")}
            className={classes.login_signInButton}
          >
            {loading.signIn ? (
              <CircleLoader color="purple" size={25} />
            ) : (
              "Sign In"
            )}
          </button>
          <p>
            By singning-in to the amazon-2025 clone you agree conditions of Use
            & Sale. Before sign in see the privacy agrrement, our cookies Notice
            and our Interest-Based Ads Notice.
          </p>

          <button
            type="button"
            onClick={(e) => authHandler(e, "signup")}
            className={classes.login_creatAccount}
          >
            {loading.signUp ? (
              <CircleLoader color="purple" size={25} />
            ) : (
              "Create Your Cloned Amazon-2025 Account"
            )}
          </button>
        </div>

        {error && <small style={{ color: "red" }}>{error}</small>}
      </div>
    </section>
  );
}

export default Auth;
