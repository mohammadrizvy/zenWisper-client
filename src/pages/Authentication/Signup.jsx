// src/pages/Authentication/Signup.jsx - Fully Responsive Version
import axios from "axios";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/signup`,
        data
      );
      console.log(response.data);
      toast.success("Account created successfully");
      navigate("/");
      reset();
    } catch (error) {
      console.error("Error signing up:", error.response?.data || error.message);
      toast.error(`${error.response?.data.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center custom-bg min-h-screen px-4 sm:px-6 lg:px-8">
      <Toaster />
      <div className="flex flex-col mx-auto bg-gray-700 justify-center items-center w-full max-w-xs sm:max-w-sm md:max-w-md p-4 sm:p-6 lg:p-10 rounded-md text-white">
        <div className="mb-6 sm:mb-8 text-center w-full">
          <h1 className="my-3 text-2xl sm:text-3xl lg:text-4xl font-bold">Sign up</h1>
          <p className="text-xs sm:text-sm text-gray-300">
            Create an account to get started
          </p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 sm:space-y-12 w-full">
          <div className="space-y-3 sm:space-y-4">
            <div>
              <label htmlFor="username" className="block mb-2 text-xs sm:text-sm">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="john_doe"
                className="w-full px-3 py-2 sm:py-2.5 border rounded-md border-gray-600 bg-black text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#9269FD]"
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="block mb-2 text-xs sm:text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="john@example.com"
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
              <label htmlFor="password" className="block mb-2 text-xs sm:text-sm">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="*****"
                className="w-full px-3 py-2 sm:py-2.5 border rounded-md border-gray-600 bg-black text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#9269FD]"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>

                
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <div>
              <button
                type="submit"
                className="w-full px-6 sm:px-8 py-2.5 sm:py-3 font-semibold rounded-md bg-[#9269FD] text-white hover:bg-[#7d4de7] transition-colors text-sm sm:text-base"
              >
                Sign up
              </button>
            </div>
            <p className="px-4 sm:px-6 text-xs sm:text-sm text-center text-gray-400">
              Already have an account?
              <Link to="/login" className="hover:underline text-gray-300">
                {" "}
                Log in
              </Link>
              .
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;