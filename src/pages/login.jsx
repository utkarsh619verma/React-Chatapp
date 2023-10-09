// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

export function Login() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setErr(true);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chat App</span>
        <span className="title">Login</span>
        <form onSubmit={handlesubmit} action="">
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>Sign In</button>
          {err && <span>Something went wrong!</span>}
        </form>
        <p>
          Don&apos;t have an acccount?
          <span>
            {" "}
            <Link to="/register">Sign Up</Link>{" "}
          </span>
        </p>
      </div>
    </div>
  );
}
