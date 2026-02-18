export const RegisterForm = () => {
  return (
    <div>
      <form>
        {/*username */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold" htmlFor="username">
            Username
          </label>
          <input
            className=" text-sm border px-3 py-2 focus:outline-1 border-gray-300 rounded-lg focus:ring-red-500 transition"
            type="text"
            placeholder="AngryBird"
            id="username"
          ></input>
        </div>
        {/*password */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold" htmlFor="password">
            Password
          </label>
          <input
            className=" text-sm border px-3 py-2 focus:outline-1 border-gray-300 rounded-lg focus:ring-red-500 transition"
            type="password"
            id="password"
            placeholder="Enter password"
          ></input>
        </div>
        {/*database role */}
        <fieldset className="border rounded-lg">
          <legend className=" text-sm font-semibold">Select a database role: </legend>
          <div className="flex justify-center gap-6">
            <div>
              <label htmlFor="admin" className="">
                Admin
              </label>
              <input
                type="radio"
                id="admin"
                name="role"
                value="admin"
                className=""
              ></input>
            </div>
            <div>
              <label htmlFor="user">User</label>
              <input type="radio" id="user" name="role" value="user"></input>
            </div>
          </div>
        </fieldset>
        <Link to={"/category"}><button
          type="submit"
          className="w-full bg-red-500 rounded-lg font-medium hover:bg-red-400 transition disabled:opacity-60"
        ></button>
        </Link>
      </form>
    </div>
  );
};
