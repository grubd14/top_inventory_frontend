// import { Link } from "react-router";
import { Link } from "react-router";

export const NotFoundPage = () => {
  return (
    <main className="min-h-screen w-full flex items-center justify-center">
      <div className="flex flex-col items-center  text-center gap-4">
        <h1 className="text-3xl font-bold">Page Not Found</h1>
        <p className="text-gray-600">404 - Not Found</p>
        <Link to="/">Go back to home!</Link>
      </div>
    </main>
  );
};
