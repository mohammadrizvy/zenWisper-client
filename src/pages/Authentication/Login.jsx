import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

/* eslint-disable react/no-unescaped-entities */
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

   const onSubmit = async (data) => {
     try {
       const response = await axios.post(
         `${import.meta.env.VITE_BACKEND_URL}/login`,
         data
       );
       console.log(response.data); // Success message
      //  navigate("/login"); // Navigate to login page after successful signup
     } catch (error) {
       console.error(
         "Error signing up:",
         error.response?.data || error.message
       );
     }
   };

  return (
    <div className="flex justify-center custom-bg items-center min-h-screen">
      <div className="flex flex-col mx-auto bg-gray-700 justify-center items-center max-w-md p-6 rounded-md sm:p-10 text-white">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Log in</h1>
          <p className="text-sm text-gray-300">Log in to access your account</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="leroy@jenkins.com"
                className="w-full px-3 py-2 border rounded-md border-gray-600 bg-black text-white"
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
                <label htmlFor="password" className="text-sm">
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
                className="w-full px-3 py-2 border rounded-md border-gray-600 bg-black text-white"
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
                className="w-full px-8   font-semibold btn rounded-md bg-[#9269FD] text-white"
              >
                Sign in
              </button>
            </div>
            <p className="px-6 text-sm text-center text-gray-400">
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
