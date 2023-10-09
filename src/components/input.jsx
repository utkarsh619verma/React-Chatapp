import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/chatcontext";
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export function Input() {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const handlesend = async () => {
    if (text == "" && img == null) {
      return;
    }
    if (img) {
      const storageRef = ref(storage, uuid());
      console.log(storageRef);
      const uploadTask = uploadBytesResumable(storageRef, img);
      console.log(uploadTask);
      uploadTask.on(
        // eslint-disable-next-line no-unused-vars
        (error) => {
          // Handle unsuccessful uploads
          // seterr(true);
          console.log(error.message);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
    await updateDoc(doc(db, "userchats", currentUser.uid), {
      [data.chatId + ".lastmessage"]: { text },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userchats", data.user.uid), {
      [data.chatId + ".lastmessage"]: { text },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    console.log("text-> " + text);
    setText("");
    setImg(null);
  };
  if (data.chatId == "null") return;
  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        name=""
        value={text}
        onChange={(e) => setText(e.target.value)}
        id=""
      />
      <div className="send">
        <img src={Attach} alt="" />
        <input
          type="file"
          name=""
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={handlesend}>Send</button>
      </div>
    </div>
  );
}
