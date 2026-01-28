import { RegisterForm } from "../components/forms/registerForm";

export const RegisterPage = () => {
  return (
    <main>
      <div className=" outline h-full w-full flex justify-center items-center">
        <div className="border-2 min-h-140 min-w-140 rounded-2xl p-3 m-3 bg-red-50 border-red-500">
          <div>
            <h1>Register User</h1>
            <p>To register an account fill the form below: </p>
            <RegisterForm />
          </div>
        </div>
      </div>
    </main>
  );
};

