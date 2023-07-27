import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const userInfo = await response.json();
        setUser(userInfo);
        alert("Login successful");
        setRedirect(true);
      } else {
        alert(`HTTP-Error ${response.status}`);
      }
    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  if (redirect) {
    return <Navigate to={`/account`} />;
  }

  return (
    <div className="px-5 mt-4">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <h1 className="text-2xl text-center font-bold text-gray-700">Login</h1>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="label-control">
                Email address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control "
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="label-control">
                Password
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>
            <button type="submit" className="btn-primary">
              Login
            </button>

            <div className="text-center py-1">
              Don't have an account yet?{" "}
              <Link to={`/register`} className="text-primary">
                Register Now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
