import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!user) {
      try {
        fetch("http://localhost:5000/profile/", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        })
          .then((response) => response.json())
          .then((userData) => {
            setUser(userData);
            setReady(true);
          });
      } catch (err) {
        console.log(err);
      }
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
};
