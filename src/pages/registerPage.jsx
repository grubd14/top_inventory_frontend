import { RegisterForm } from "../components/forms/registerForm.jsx";
import { Link } from "react-router-dom";

export const RegisterPage = () => {
  return (
    <main>
      <div className="h-full w-full flex justify-center items-center min-h-screen">
        <div className="border-2 min-h-140 min-w-140 rounded-md shadow-md p-3 m-3 border-gray-600">
          <h1 className="text-3xl text-center tracking-wider font-bold">
            Register User
          </h1>
          <p className="font-light pt-2 text-center mt-1">
            To register an account fill the form below:
          </p>
          <RegisterForm />

          <div className="mt-4">
            <p className="text-center">
              Already a registered user?{" "}
              <Link
                to="/login"
                className="text-red-400 italic font-semibold hover:text-red-600 underline"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
