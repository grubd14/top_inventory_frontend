import { Link } from "react-router";

export const IndexPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-3xl  rounded-xl p-8 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-2">
          Inventory Management Application
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          Manage inventory as a user or admin!
        </p>
        <div className=" pt-4 flex  justify-center items-center gap-4">
          {/* <Button></Button>*/}
          {/* <Link to="/register"  title="Register Here" className=" rounded-xl h-auto w-30 p-4 text-center hover:bg-blue-300  rounded-1xl border border-sky-800 cursor-pointer">Register</Link>*/}
          <Link to="/register"><button title="Register Here" className="rounded-xl h-auto w-30 p-4 text-center hover:bg-blue-300  rounded-1xl border border-sky-800 cursor-pointer">Register</button></Link>
          <Link to="/login"><button title="Login User" className=" rounded-xl p-4 text-center hover:bg-blue-300 w-30 h-auto rounded-1xl border  border-sky-800 cursor-pointer">Login</button></Link>
        </div>
      </div>
    </main>
  );
};

