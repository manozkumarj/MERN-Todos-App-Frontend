import React, { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authContext } from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader.jsx";

const Login = () => {
  const { setIsAuthenticated } = useContext(authContext);
  const inputFocus = useRef(null);
  const [isLogging, setIsLogging] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {}, 100000);
    inputFocus?.current?.focus();
  }, []);

  const validationSchema = z.object({
    email: z
      .string()
      .nonempty({ message: "Enter Email" })
      .trim()
      .min(1, { message: "Email is required." })
      .max(64, {
        message: "Email length should not exceed 64 characters.",
      })
      .email({
        message: "Enter a valid email.",
      }),
    password: z
      .string()
      .nonempty({ message: "Enter Password" })
      .min(8, { message: "Invalid Password" })
      .max(24, {
        message: "Invalid Password",
      }),
  });

  const {
    register: loginHandler,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = handleSubmit((data) => {
    setIsLogging(true);
    console.log("submit");
    setTimeout(() => {
      notify();
      console.log(data);
      setIsAuthenticated(true);
      setIsLogging(false);
      navigate("/dashboard");
    }, 5000);
    // alert(JSON.stringify(data));
  });

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   setIsLogging(true);
  //   onSubmit();
  // };

  const notify = () => toast.success("Here is your toast.");

  return (
    <div className="min-h-screen">
      <div className="min-h-[90%] flex justify-center items-center align-middle">
        <div className="w-full mx-12 md:w-1/3 px-16 py-8 my-12 bg-white shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.1)] inset-shadow-2xs rounded-md">
          <h1 className="text-4xl text-center font-bold mb-8">Login</h1>
          <form className="form" onSubmit={onSubmit}>
            <div className="my-3">
              <label htmlFor="email" className="font-bold">
                Email
              </label>
              <br />
              <input
                className={`w-full font-bold py-2 px-3 border-1 my-1 rounded-md ${
                  errors?.email?.message && "border-red-500"
                }`}
                type="text"
                id="email"
                placeholder="Enter Email"
                autoComplete="off"
                {...loginHandler("email")}
              />
              {errors?.email && (
                <span className="text-sm font-bold text-red-600">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="my-3">
              <label htmlFor="password" className="font-bold">
                Password
              </label>
              <br />
              <input
                className={`w-full font-bold py-2 px-3 border-1 my-1 rounded-md ${
                  errors?.password?.message && "border-red-500"
                }`}
                type="password"
                id="password"
                placeholder="Enter Password"
                {...loginHandler("password")}
              />
              {errors?.password && (
                <span className="text-sm font-bold text-red-600">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="mt-5 mb-3">
              <button
                type="submit"
                disabled={isLogging}
                className={`w-full flex justify-center items-center text-white font-bold bg-blue-500 hover:bg-blue-700 rounded-lg text-lg px-5 my-2 ${
                  !isLogging ? "py-2.5 cursor-pointer" : "py-3.5"
                }`}
              >
                {isLogging && (<Loader
                  size={'size-6'}
                  borderWidth={'border-3'}
                  lightThemeColor={"text-white"}
                  darkThemeColor={"text-red-600"}
                />)}
                {!isLogging && (<span>Login</span>)}
              </button>
            </div>
          </form>
          {/* <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-800"></div>
            <span className="flex-shrink mx-4 text-black -mt-1">or</span>
            <div className="flex-grow border-t border-gray-800"></div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
