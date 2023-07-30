import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { db } from "../firebaseSettings";
import { BounceLoader } from "react-spinners";
import classes from "./Chat.module.css";
import { toast } from "react-toastify";

export function Chat() {
  const { id } = useParams();
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const { setUsers, chats, setChats } = useOutletContext();
  useEffect(() => {
    async function fetchChat() {
      const result = await getDoc(doc(db, "chats", id));
      setChats((prev) => ({ ...prev, [id]: result.data().chat }));
      setLoading(false);
    }
    if (!chats[id]) {
      setLoading(true);
      fetchChat();
    }
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (!loading) inputRef.current.scrollIntoView();
  }, [chats?.[id], id, loading]);

  const submit = async (event) => {
    try {
      event.preventDefault();
      const messageObj = { sender: "self", message: inputRef.current.value };
      await updateDoc(doc(db, "chats", `${id}`), {
        chat: arrayUnion(messageObj),
      });
      await setDoc(
        doc(db, "users", `${id}`),
        { lastChat: messageObj },
        { merge: true }
      );
      setChats((prev) => ({ ...prev, [id]: [...prev[id], messageObj] }));
      setUsers((prev) =>
        prev.map((user) =>
          `${user.id}` === `${id}` ? { ...user, lastChat: messageObj } : user
        )
      );
      inputRef.current.value = "";
    } catch (err) {
      toast("Could not send message");
    }
  };
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <BounceLoader />
      </div>
    );
  }
  return (
    <div className={classes.container}>
      {(chats[id] ?? []).map((conv, index) => (
        <div
          className={conv.sender === "self" ? classes.self : classes.other}
          key={index}
        >
          {conv.message}
        </div>
      ))}
      <form onSubmit={submit} className={classes.send}>
        <input placeholder="Send a message" ref={inputRef} />
        <button type="submit">
          <img src="/send.png" alt="send message" />
        </button>
      </form>
    </div>
  );
}
