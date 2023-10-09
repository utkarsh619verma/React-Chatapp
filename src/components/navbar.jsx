import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export function Navbar() {
  const [username, setUsername] = useState("");
  const [img, setImg] = useState("");
  // eslint-disable-next-line no-unused-vars
  const currentUser = useContext(AuthContext);
  onAuthStateChanged(auth, (user) => {
    setUsername(user.displayName);
    setImg(user.photoURL);
  });
  return (
    <div className="navbar">
      <div className="logo">Chat App</div>
      <div className="user">
        <img src={img} alt="" />
        <span>{username} </span>
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>
    </div>
  );
}
