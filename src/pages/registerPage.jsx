import { RegisterForm } from "../components/forms/registerForm";

export const RegisterPage = () => {
  return (
    <main>
      <div className="  h-full w-full flex justify-center items-center">
        <div className="border-2 min-h-140 min-w-140 rounded-md shadow-md p-3 m-3 border-gray-600">
          <h1 className="text-3xl text-center tracking-wider font-bold">
            Register User
          </h1>
          <p className="font-light pt-2 text-center mt-1">
            To register an account fill the form below:{" "}
          </p>
          <RegisterForm />

          <div className="mt-2">
            <p className="text-center">
              Already a registered user?{" "}
              <span className="text-red-400 italic font-semibold cursor-pointer">
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
