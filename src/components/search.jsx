import { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

export function Search() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const handlesearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayname", "==", username)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((docs) => {
        setUser(docs.data());
        console.log(currentUser);
      });
    } catch (error) {
      setErr(true);
      console.log(error.message);
    }
  };

  const handlekey = (e) => {
    e.code === "Enter" && handlesearch();
  };
  user && console.log(user);
  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        // create a chat in chats collection
        console.log("Creating");
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        //create user chats
        await updateDoc(doc(db, "userchats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayname: user.displayname,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userchats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayname: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      setErr(true);
      console.log(error.message);
    }
    setUser(null);
    setUsername("");
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          onKeyDown={handlekey}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          value={username}
          placeholder="find a user "
        />
      </div>
      {err && <span>User not found</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayname}</span>
          </div>
        </div>
      )}
    </div>
  );
}
