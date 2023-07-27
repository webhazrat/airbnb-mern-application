import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import AccountNav from "../components/AccountNav";

const ProfilePage = () => {
  const [redirect, setRedirect] = useState(null);
  const { user, setUser, ready } = useContext(UserContext);

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={`/login`} />;
  }

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:5000/logout/", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        const result = await response.json();
        if (result) {
          setRedirect("/");
          setUser(null);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="px-5">
      <AccountNav />
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <p className="mb-5">
          Logged in as {user.name} ({user.email})
        </p>
        <button type="button" onClick={logout} className="btn-primary">
          Logout
        </button>
      </div>
    </div>
  );
};
export default ProfilePage;
