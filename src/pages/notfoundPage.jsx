import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-slate-50 px-4">
      <div className="flex flex-col items-center gap-6 text-center">
        <div>
          <h1 className="mb-2 text-6xl font-bold text-slate-800">404</h1>
          <p className="text-2xl font-semibold text-slate-700">Page not found</p>
        </div>
        <p className="max-w-md text-lg text-slate-600">
          That URL does not match any page. Check the address or go back home.
        </p>
        <Link
          to="/"
          className="rounded-lg bg-sky-600 px-6 py-3 font-medium text-white transition hover:bg-sky-700"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
};
