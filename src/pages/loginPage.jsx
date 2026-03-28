import { LoginForm } from "../components/forms/loginForm.jsx";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-md items-center justify-center">
        <div className="w-full rounded-2xl border border-slate-200/80 bg-white p-8 shadow-lg shadow-slate-200/50">
          <h1 className="text-center text-3xl font-bold tracking-tight text-slate-800">
            Log in
          </h1>
          <p className="mt-2 text-center text-sm text-slate-600">
            Enter your credentials to continue.
          </p>
          <div className="mt-6">
            <LoginForm />
          </div>
          <p className="mt-6 text-center text-sm text-slate-600">
            No account?{" "}
            <Link
              to="/register"
              className="font-semibold text-sky-600 underline decoration-sky-600/30 underline-offset-2 hover:text-sky-700"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};
