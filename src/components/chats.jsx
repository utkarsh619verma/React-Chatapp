import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { ChatContext } from "../context/chatcontext";

export function Chats() {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const [userChat, setUserchat] = useState([]);

  useEffect(() => {
    const getchats = () => {
      const unsub = onSnapshot(doc(db, "userchats", currentUser.uid), (doc) => {
        setUserchat(doc.data());
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getchats();
  }, [currentUser.uid]);

  const handleselect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });
  };

  return (
    <div className="chats">
      {Object.entries(userChat)
        ?.sort((a, b) => {
          b[1].date - a[1].date;
        })
        .map((chat) => (
          <div
            className="userChat"
            key={chat[0]}
            onClick={() => handleselect(chat[1].userInfo)}
          >
            <img src={chat[1].userInfo.photoURL} alt="" />
            <div className="userChatInfo">
              <span>{chat[1].userInfo.displayname}</span>
              <p>Hello</p>
            </div>
          </div>
        ))}
    </div>
  );
}
