import { useNavigate } from "react-router-dom";
import classes from "./ChatLink.module.css";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseSettings";
import { toast } from "react-toastify";
export function ChatLink({
  id,
  avatarUrl,
  lastSeen,
  name,
  lastChat,
  setUsers,
  selected,
  setSelected,
  setSearch,
  users,
}) {
  const navigate = useNavigate();
  const navigateToChat = async () => {
    try {
      const index = users.findIndex((user) => `${user.id}` === `${id}`);
      await setDoc(
        doc(db, "users", `${id}`),
        { displayOrder: new Date().getTime() },
        { merge: true }
      );

      setSearch("");
      setUsers((prev) => [
        prev[index],
        ...prev.filter((user) => `${user.id}` !== `${id}`),
      ]);
      setSelected(`${id}`);
      navigate(`chat/${id}`);
    } catch (err) {
      toast("Something went wrong!");
    }
  };
  return (
    <div
      className={`${classes.container} ${
        `${selected}` !== `${id}` ? "" : classes.selected
      }`}
      onClick={navigateToChat}
    >
      <div className={classes.avatar}>
        <img src={avatarUrl} className={classes.avatarImage} alt="avatar" />
      </div>
      <div className={classes.subContainer}>
        <div className={classes.name}>
          <div>{name}</div>
          <div className={classes.lastSeen}>{lastSeen}</div>
        </div>
        <div className={classes.lastChat}>{lastChat.message}</div>
      </div>
    </div>
  );
}
