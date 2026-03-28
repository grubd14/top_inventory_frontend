import { Link } from "react-router-dom";

export const IndexPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100/80 px-6 py-16">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-200/80 bg-white/90 p-10 text-center shadow-xl shadow-slate-200/50 backdrop-blur-sm">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
          Inventory management
        </h1>
        <p className="mt-3 text-slate-600 md:text-lg">
          Organize categories and stock in one place.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/register"
            className="inline-flex min-w-[8.5rem] items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="inline-flex min-w-[8.5rem] items-center justify-center rounded-xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
          >
            Log in
          </Link>
        </div>
      </div>
    </main>
  );
};
