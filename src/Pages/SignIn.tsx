import { useAppContext } from "@/contexts/AppContext";
import { useLoginUser } from "../hooks/user/login/login-user";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";

export type SignInFormData = {
  email: string;
  password: string;
};

export const SignIn = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();
  const { mutate, isSuccess, isError,error} = useLoginUser();

  useEffect(() => {
    if (isSuccess) {
      showToast({ message: "Login Success!", type: "SUCCESS" });
      navigate(location.state?.from?.pathname || "/user");
    }
    if (isError) {
      showToast({ message: (error as { message?: string })?.message || "Login Failed!", type: "ERROR" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess]);

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <>
      <NavBar />
      <Hero />
      <div className="flex justify-center w-full mt-28">
        <form className="flex flex-col gap-5 lg:w-[25%] " onSubmit={onSubmit}>
          <h2 className="text-3xl font-bold text-indigo-500 self-center">
            Sign in
          </h2>
          <label className="text-gray-700 text-sm font-bold flex-1">
            Email
            <input
              type="email"
              className="border border-gray-400 rounded w-full py-1 px-2 font-normal bg-white"
              {...register("email", { required: "This field is required" })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </label>
          <label className="text-gray-700 text-sm font-bold flex-1">
            Password
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="border  border-gray-400 rounded w-full py-1 px-2 font-normal  bg-white"
                {...register("password", {
                  required: "This field is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                })}
              />
              <span
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </label>
          <span className="flex flex-col justify-between gap-5">
            <span>
              Not register?
              <Link
                className="text-blue-500 hover:underline pl-2 underline"
                to="/register"
              >
                Create an account now.
              </Link>
            </span>
            <button
              type="submit"
              className="bg-indigo-500 rounded-sm hover:bg-blue-500 text-white font-bold p-2 text-l "
            >
              Login
            </button>
          </span>
        </form>
      </div>
      <div className="absolute w-full top-[92%]">
        <Footer />
      </div>
    </>
  );
};
