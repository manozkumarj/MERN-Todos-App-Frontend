import React, { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authContext } from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const { setIsAuthenticated } = useContext(authContext);
  const inputFocus = useRef(null);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {}, 100000);
    inputFocus?.current?.focus();
  }, []);

  const passwordValidation = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  );

  const validationSchema = z
    .object({
      fullName: z
        .string()
        .nonempty({ message: "Enter Full name" })
        .trim()
        .min(3, { message: "Full name length should be minimum 3 characters." })
        .max(24, {
          message: "Full name length should not exceed 24 characters.",
        }),
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
        .min(8, { message: "Password length should be minimum 8 characters." })
        .max(24, {
          message: "Password length should not exceed 24 characters.",
        })
        .regex(passwordValidation, {
          message:
            "Password should be combination of one lowercase, uppercase, number and special characters.",
        }),
      confirmPassword: z
      .string()
      .nonempty({ message: "Re-enter Password" })
      .min(1, { message: "Required." }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords didn't match.",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log("submit");
    notify();
    console.log(data);
    setIsFormSubmitting(true);
    setIsAuthenticated(true);
    navigate("/dashboard");
    // alert(JSON.stringify(data));
  });

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   setIsFormSubmitting(true);
  //   onSubmit();
  // };

  const notify = () => toast.success("Here is your toast.");

  return (
    <div className="min-h-screen">
      <div className="min-h-[90%] flex justify-center items-center align-middle">
        <div className="w-full mx-12 md:w-1/3 px-16 py-8 my-12 bg-white shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.1)] inset-shadow-2xs rounded-md">
          <h1 className="text-4xl text-center font-bold mb-8">Registration</h1>
          <form className="form" onSubmit={onSubmit}>
            <div className="my-3">
              <label htmlFor="fullName" className="font-bold">
                Full name
              </label>
              <br />
              <input
                className={`w-full font-bold py-2 px-3 border-1 my-1 rounded-md ${
                  errors?.fullName?.message && "border-red-500"
                }`}
                type="text"
                id="fullName"
                autoComplete="off"
                placeholder="Enter Full name"
                ref={inputFocus}
                {...register("fullName")}
              />
              {errors?.fullName && (
                <span className="text-sm font-bold text-red-600">
                  {errors.fullName.message}
                </span>
              )}
            </div>
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
                {...register("email")}
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
                {...register("password")}
              />
              {errors?.password && (
                <span className="text-sm font-bold text-red-600">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="my-3">
              <label htmlFor="reEnterPassword" className="font-bold">
                Re-enter Password
              </label>
              <br />
              <input
                className={`w-full font-bold py-2 px-3 border-1 my-1 rounded-md ${
                  errors?.confirmPassword?.message && "border-red-500"
                }`}
                type="password"
                id="confirmPassword"
                placeholder="Re-enter Password"
                {...register("confirmPassword")}
              />
              {errors?.confirmPassword && (
                <span className="text-sm font-bold text-red-600">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            <div className="mt-5 mb-3">
              <button
                type="submit"
                disabled={isFormSubmitting}
                className={`w-full text-white font-bold bg-blue-500 hover:bg-blue-700 rounded-lg text-lg px-5 py-2.5 my-2 ${
                  !isFormSubmitting && "cursor-pointer"
                }`}
              >
                Submit
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

export default Registration;
