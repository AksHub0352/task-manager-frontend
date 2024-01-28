import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/signup");
  };

  const handleChange = (e) => {
    e.preventDefault();
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/");
        toast.success("Login Success");
      } else {
        toast.error("An error Occured");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="w-full max-w-2xl bg-slate-200 p-10">
          <div className="text-3xl text-center font-semibold pb-3">Login</div>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                className="outline-none border-2 border-blue-400 focus:ring-2 rounded-md"
                autoComplete="off"
                required
              />
            </div>
            <div className="">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                className="outline-none border-2 border-blue-400 focus:ring-2 rounded-md"
                required
              />
            </div>
            <div className="">
              <input
                type="submit"
                value="Login"
                className="cursor-pointer bg-blue-300 hover:bg-blue-500 rounded-md text-lg py-2 transition-all duration-500"
              />
            </div>
            <div className="">
              <input
                type="submit"
                value="Already have an account ? Register"
                className="cursor-pointer bg-blue-300 hover:bg-blue-500 rounded-md text-lg py-2 transition-all duration-500 hover:underline"
                onClick={handleRegister}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
