import { RegisterForm } from "../components/forms/registerForm.jsx";
import { Link } from "react-router-dom";

export const RegisterPage = () => {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 dark:bg-slate-900">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-md items-center justify-center">
        <div className="w-full rounded-2xl border border-slate-200/80 bg-white p-8 shadow-lg shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-800 dark:shadow-slate-900/50">
          <h1 className="text-center text-3xl font-bold tracking-tight text-slate-800 dark:text-white">
            Create an account
          </h1>
          <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
            Choose a username and password to get started.
          </p>
          <div className="mt-6">
            <RegisterForm />
          </div>
          <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
            Already registered?{" "}
            <Link
              to="/login"
              className="font-semibold text-sky-600 underline decoration-sky-600/30 underline-offset-2 hover:text-sky-700 dark:text-sky-400"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};
