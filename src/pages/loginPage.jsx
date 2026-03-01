import { LoginForm } from "../components/forms/loginForm.jsx";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  return (
    <main>
      <div className="h-full w-full flex justify-center items-center min-h-screen">
        <div className="border-2 min-h-140 min-w-140 rounded-md shadow-md p-3 m-3 border-gray-600">
          <h1 className="text-3xl text-center tracking-wider font-bold">
            Login User
          </h1>
          <p className="font-light pt-2 text-center mt-1">
            To login to an account fill the form below:{" "}
          </p>
          <LoginForm />

          <div className="mt-4">
            <p className="text-center">
              Not a registered user?{" "}
              <Link
                to="/register"
                className="text-red-400 italic font-semibold hover:text-red-600 cursor-pointer"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
