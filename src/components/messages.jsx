import { useContext, useEffect, useState } from "react";
import { Message } from "./message";
import { ChatContext } from "../context/chatcontext";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";

export function Messages() {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      unsub();
    };
  }, [data.chatId]);

  if (data.chatId == "null") {
    return (
      <div className="no-chat ">
        <h1>Please Select a chat</h1>
      </div>
    );
  }

  return (
    <div className="messages">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
}
