import { Link } from "react-router-dom";

export const IndexPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100/80 px-6 py-16 dark:from-slate-900 dark:to-slate-800">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-200/80 bg-white/90 p-10 text-center shadow-xl shadow-slate-200/50 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/90 dark:shadow-slate-900/50">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl dark:text-white">
          Inventory management
        </h1>
        <p className="mt-3 text-slate-600 md:text-lg dark:text-slate-400">
          Organize categories and stock in one place.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/register"
            className="inline-flex min-w-[8.5rem] items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-slate-400 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
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
