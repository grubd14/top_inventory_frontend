import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center text-center gap-6">
        <div>
          <h1 className="text-6xl font-bold text-gray-800 mb-2">404</h1>
          <p className="text-2xl font-semibold text-gray-700">Page Not Found</p>
        </div>
        <p className="text-gray-600 text-lg max-w-md">
          Sorry, the page you're looking for doesn't exist. It might have been
          moved or deleted.
        </p>
        <Link to="/">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition">
            Go Back to Home
          </button>
        </Link>
      </div>
    </main>
  );
};
