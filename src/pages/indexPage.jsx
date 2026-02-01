export const IndexPage = () => {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-xl p-8 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-2">
          Inventory Management Application
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          Manage inventory as a user or admin!
        </p>
        <div className=" pt-4 flex  justify-center items-center gap-4">
          {/* <Button></Button>*/}
          <button title="Register User" className=" rounded-xl h-auto w-auto p-4 text-center hover:bg-blue-400  rounded-1xl border border-sky-800">Register</button>
          <button title="Register User" className=" rounded-xl p-4 text-center hover:bg-blue-400 w-auto h-auto rounded-1xl border  border-sky-800">Login</button>
        </div>
      </div>
    </main>
  );
};

