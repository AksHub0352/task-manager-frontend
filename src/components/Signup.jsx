import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(signupData.email && signupData.password)) {
      return toast.error("invalid input");
    }
    //

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      if (response.ok) {
        toast.success("Register Successful, Please Login");
        navigate("/login");
      } else {
        toast.error("User already exists");
      }
    } catch (error) {
      console.error("Error during Signup:", error);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="w-full max-w-2xl bg-slate-200 p-10">
          <div className="text-3xl text-center font-semibold pb-3">SignUp</div>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                name="email"
                value={signupData.email}
                onChange={handleChange}
                className="outline-none border-2 border-blue-400 focus:ring-2 rounded-md"
                autoComplete="off"
              />
            </div>
            <div className="">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                value={signupData.password}
                onChange={handleChange}
                className="outline-none border-2 border-blue-400 focus:ring-2 rounded-md"
              />
            </div>
            <div className="">
              <input
                type="submit"
                value="Signup"
                className="cursor-pointer bg-blue-300 hover:bg-blue-500 rounded-md text-lg py-2 transition-all duration-500"
              />
            </div>
            <div className="">
              <input
                type="submit"
                value="Already a User ? Login"
                className="cursor-pointer bg-blue-300 hover:bg-blue-500 rounded-md text-lg py-2 transition-all duration-500 hover:underline"
                onClick={handleLogin}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
