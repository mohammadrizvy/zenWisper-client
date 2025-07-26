/* eslint-disable react/no-unescaped-entities */
// src/pages/Authentication/Login.jsx - Fully Responsive Version
import axios from "axios";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        data
      );

      // Store JWT token in localStorage or sessionStorage
      localStorage.setItem("token", response.data.token);

      toast.success("Login success");
      console.log(response.data);
      reset();

      localStorage.setItem("username", response.data.userInfo.username);
      localStorage.setItem("email", response.data.userInfo.email);

      // Navigate to a protected route after successful login
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error.response?.data || error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center custom-bg items-center min-h-screen px-4 sm:px-6 lg:px-8">
      <Toaster />
      <div className="flex flex-col mx-auto bg-gray-700 justify-center items-center w-full max-w-xs sm:max-w-sm md:max-w-md p-4 sm:p-6 lg:p-10 rounded-md text-white">
        <div className="mb-6 sm:mb-8 text-center w-full">
          <h1 className="my-3 text-2xl sm:text-3xl lg:text-4xl font-bold">Log in</h1>
          <p className="text-xs sm:text-sm text-gray-300">
            Log in to access your account
          </p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 sm:space-y-12 w-full">
          <div className="space-y-3 sm:space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-xs sm:text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="leroy@jenkins.com"
                className="w-full px-3 py-2 sm:py-2.5 border rounded-md border-gray-600 bg-black text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#9269FD]"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-xs sm:text-sm">
                  Password
                </label>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="text-xs hover:underline text-gray-400"
                >
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="*****"
                className="w-full px-3 py-2 sm:py-2.5 border rounded-md border-gray-600 bg-black text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#9269FD]"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          
          <div className="-mt-2">
            <div className="pb-4">
              <button
                type="submit"
                className="w-full px-6 sm:px-8 py-2.5 sm:py-3 font-semibold btn rounded-md bg-[#9269FD] text-white hover:bg-[#7d4de7] transition-colors text-sm sm:text-base"
              >
                Sign in
              </button>
            </div>
            <p className="px-4 sm:px-6 text-xs sm:text-sm text-center text-gray-400">
              Don't have an account yet?
              <Link to="/signup" className="hover:underline text-gray-300">
                {" "}
                Sign up
              </Link>
              .
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;