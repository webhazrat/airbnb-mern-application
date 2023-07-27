import { useState } from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ name, email, password }),
      });
      if (response.ok) {
        let json = await response.json();
        setName("");
        setEmail("");
        setPassword("");
        alert("Registration successful. Now you can log in");
      } else {
        alert(`HTTP-Error ${response.status}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="px-5 mt-4">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <h1 className="text-2xl text-center font-bold text-gray-700">
          Register
        </h1>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={registerUser}>
            <div>
              <label htmlFor="name" className="label-control">
                Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control "
                />
              </div>
            </div>
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
              Register
            </button>

            <div className="text-center py-1">
              Already a member?{" "}
              <Link to={`/login`} className="text-primary">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
