import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { NavBar } from "@/components/NavBar";
import { useAppContext } from "@/contexts/AppContext";
import { useRegisterUser } from "@/hooks/user/register/register-user";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const Register = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const { mutate, isSuccess, isError } = useRegisterUser();

  useEffect(() => {
    if (isSuccess) {
      showToast({ message: "Registration Success!", type: "SUCCESS" });
      navigate("/user");
    }
    if (isError) {
      showToast({ message: "Registration Failed!", type: "ERROR" });
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
      <div className="flex justify-center w-full mt-20">
        <form className="flex flex-col gap-5 lg:w-[25%]" onSubmit={onSubmit}>
          <h2 className="text-3xl font-bold text-indigo-500 self-center">
            Create an Account
          </h2>
          <div className="flex flex-col md:flex-row gap-5">
            <label className="text-sm font-bold flex-1">
              First Name
              <input
                type="text"
                className="border rounded w-full py-1 px-2 font-normal border-gray-400 bg-white"
                {...register("firstName", {
                  required: "First Name is required",
                  validate: (value) => {
                    if (!value || typeof value !== "string") {
                      return "First Name must be a string";
                    }
                    const namePattern = /^[A-Za-z]+$/;
                    if (!namePattern.test(value)) {
                      return "First Name must contain only alphabets.";
                    }
                    return true;
                  },
                })}
              />
              {errors.firstName && (
                <span className="text-red-500 text-sm">
                  {errors.firstName.message}
                </span>
              )}
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
              Last Name
              <input
                type="text"
                className="border rounded w-full py-1 px-2 font-normal border-gray-400 bg-white"
                {...register("lastName", {
                  required: "Last Name is required",
                  validate: (value) => {
                    if (!value || typeof value !== "string") {
                      return "Last Name must be a string";
                    }
                    const namePattern = /^[A-Za-z]+$/;
                    if (!namePattern.test(value)) {
                      return "Last Name must contain only alphabets.";
                    }
                    return true;
                  },
                })}
              />
              {errors.lastName && (
                <span className="text-red-500 text-sm">
                  {errors.lastName.message}
                </span>
              )}
            </label>
          </div>
          <label className="text-gray-700 text-sm font-bold flex-1">
            Email
            <input
              type="email"
              className="border rounded w-full py-1 px-2 font-normal border-gray-400 bg-white"
              {...register("email", {
                required: "Email is required",
                validate: (value) => {
                  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!value.match(emailPattern)) {
                    return "Please enter a valid email address";
                  }
                  return true;
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </label>
          <label className="text-sm font-bold flex-1 relative">
            Password
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Toggle between 'text' and 'password'
                className="border rounded w-full py-1 px-2 font-normal border-gray-400 bg-white pr-16" // Add padding for toggle text
                {...register("password", {
                  required: "Password is required",
                  validate: (value) => {
                    const hasUpperCase = /[A-Z]/.test(value);
                    const hasNumber = /[0-9]/.test(value);
                    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(value);
                    const errors = [];
                    const baseMessage = "Password must contain at least ";
                    if (value.length < 8) {
                      errors.push("8 characters");
                    }
                    if (!hasUpperCase) {
                      errors.push("one uppercase letter");
                    }
                    if (!hasNumber) {
                      errors.push("one number");
                    }
                    if (!hasSymbol) {
                      errors.push("one special character");
                    }

                    if (errors.length > 0) {
                      return `${baseMessage} ${errors.join(", ")}`;
                    }

                    return true;
                  },
                })}
              />
              {/* Show/Hide toggle */}
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
          <label className="text-gray-700 text-sm font-bold flex-1">
            Confirm Password
            <input
              type="password"
              className="border rounded w-full py-1 px-2 font-normal border-gray-400 bg-white"
              {...register("confirmPassword", {
                validate: (value) => {
                  if (!value) {
                    return "This field is required";
                  } else if (value !== watch("password")) {
                    return "Passwords do not match";
                  }
                  return true;
                },
              })}
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </span>
            )}
          </label>
          <span className="flex flex-col justify-between gap-5">
            <span>
              Already have an account?{" "}
              <Link
                className="text-blue-500 hover:underline pl-2 underline"
                to="/sign-in"
              >
                Sign In.
              </Link>
            </span>
            <button
              type="submit"
              className="bg-indigo-500 rounded-sm hover:bg-blue-500 text-white font-bold p-2 text-l"
            >
              Create Account
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
