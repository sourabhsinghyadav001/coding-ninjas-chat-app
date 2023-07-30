import { useEffect, useState } from "react";
import classes from "./Screen.module.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseSettings";
import { ChatLink } from "./ChatLink";
import { toast } from "react-toastify";
import { Outlet, useNavigate } from "react-router-dom";
import { BounceLoader } from "react-spinners";
export function Screen() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [chats, setChats] = useState({});
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDocs(collection(db, "users"));

        const fetchedUsers = result.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .sort((a, b) => b.displayOrder - a.displayOrder);

        setUsers(fetchedUsers);
        setLoading(false);
        if (fetchedUsers.length) {
          setSelected(`${fetchedUsers[0].id}`);
          navigate(`chat/${fetchedUsers[0].id}`);
        }
      } catch (err) {
        toast("Unable to load chats.");
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []);
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <BounceLoader />
      </div>
    );
  }
  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <div className={classes.search}>
          <input
            placeholder="Search chats"
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
          <button>
            <img src="/search.png" alt="search chat"></img>
          </button>
        </div>
        {users
          .filter((user) => user.name.toLowerCase().includes(search))
          .map(({ id, avatarUrl, lastSeen, name, lastChat }, index) => (
            <ChatLink
              key={id}
              avatarUrl={avatarUrl}
              lastSeen={lastSeen}
              name={name}
              lastChat={lastChat}
              id={id}
              setUsers={setUsers}
              selected={selected}
              setSearch={setSearch}
              users={users}
              setSelected={setSelected}
            />
          ))}
      </div>
      <div className={classes.right}>
        <Outlet context={{ setUsers, chats, setChats }} />
      </div>
    </div>
  );
}
