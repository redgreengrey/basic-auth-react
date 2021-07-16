import React from "react";
import styles from "./Users.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { withAuth } from "../../Auth";

const Users = withAuth(() => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users/")
      .then((res) => setUsers(res.data));
  }, []);

  return (
    <div className={styles.users}>
      <h1>This is private page, only registered users can be here</h1>
      <h2>List of all users: </h2>
      <div>
        {users &&
          users.map((user) => <h3 key={user.username}>{user.username}</h3>)}
      </div>
    </div>
  );
});

export default Users;
