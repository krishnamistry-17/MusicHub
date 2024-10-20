import React, { useRef, useState, useLayoutEffect } from "react";
import RippleButton from "ripple-effect-reactjs";
import { Link, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { EyeNotVisibility, EyeVisibility } from "../components";
import ClipLoader from "react-spinners/ClipLoader";
import { motion } from "framer-motion";
import userApis from "../Api/userApi";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { isLogged } from "../redux/slice/userSlice";

const LogIn = () => {
  const navigate = useNavigate();
  const [validateEmail, setValidateEmail] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const Login = useMutation({
    mutationFn: (data) => userApis.Login(data),
    onSuccess: (data) => {
      console.log("data",data);
      localStorage.setItem("token", data.token);
      dispatch(isLogged(data));
      navigate("/");
    },
    onError: (res) => {
     // toast.error(res?.response?.data?.message || "An error occurred");
    },
  });

  useLayoutEffect(() => {
    if (user.isLogged) {
      navigate("/");
    }
  }, [user.isLogged]);

  const HandlePasswordVisibility = () => {
    setPasswordVisibility((prev) => !prev);
  };

  const handleSubmit = () => {
    if (emailRef.current.value !== "" && passwordRef.current.value.trim() !== "") {
      const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailRef.current.value);
      if (!emailValidation) {
        toast.error("Please provide a valid email address");
        return setValidateEmail(true);
      }
      setValidateEmail(false);
      let data = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      Login.mutate(data);
    } else {
      toast.error("Please fill in all fields");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="max-w-md w-full mx-auto mt-16 p-8 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-lg shadow-lg flex flex-col items-center"
    >
      <div className="rounded-full bg-white p-3 shadow-lg">
        <PersonIcon fontSize="large" color="primary" />
      </div>

      <h3 className="text-white text-3xl font-bold mt-6">Log In</h3>

      <form className="w-full flex flex-col gap-6 mt-6">
        <div className={`relative rounded-md border transition-all duration-300 ease-in-out ${validateEmail ? "border-red-500" : "border-white"}`}>
          <input
            type="email"
            id="email"
            placeholder=" "
            ref={emailRef}
            className="w-full h-12 px-4 bg-transparent text-white border-none outline-none peer placeholder-transparent"
          />
          <label
            htmlFor="email"
            className="absolute left-4 top-3 text-white transition-all duration-300 ease-in-out peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-sm"
          >
            Email Address
          </label>
          {validateEmail && (
            <p className="text-red-500 text-sm mt-1 px-1">
              Please provide a valid email address
            </p>
          )}
        </div>

        <div className="relative rounded-md border transition-all duration-300 ease-in-out border-white">
          <input
            type={passwordVisibility ? "text" : "password"}
            id="pwd"
            placeholder=" "
            ref={passwordRef}
            className="w-full h-12 px-4 bg-transparent text-white border-none outline-none peer placeholder-transparent"
          />
          <label
            htmlFor="pwd"
            className="absolute left-4 top-3 text-white transition-all duration-300 ease-in-out peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-sm"
          >
            Password
          </label>
          <div
            className="absolute top-2 right-2 cursor-pointer text-white"
            onClick={HandlePasswordVisibility}
          >
            {passwordVisibility ? <EyeVisibility /> : <EyeNotVisibility />}
          </div>
        </div>

        <div className="flex justify-center">
          <RippleButton speed={400} color={"#4a90e2"} radius={8} width={40}>
            <button
              type="button"
              className="bg-white text-blue-600 rounded-md w-full h-12 flex items-center justify-center font-semibold"
              onClick={handleSubmit}
            >
              {Login.isLoading ? (
                <ClipLoader size={24} color="#4a90e2" />
              ) : (
                "Log In"
              )}
            </button>
          </RippleButton>
        </div>
      </form>

      <div className="flex flex-col items-center mt-6 text-gray-200">
        <Link
          to="/forgotPassword"
          className="hover:text-white transition duration-150"
        >
          Forgot Password?
        </Link>
        <Link
          to="/signup"
          className="hover:text-white transition duration-150 mt-2"
        >
          Don't have an account? Sign Up
        </Link>
      </div>
    </motion.div>
  );
};

export default LogIn; 

