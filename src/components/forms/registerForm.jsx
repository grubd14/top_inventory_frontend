export const RegisterForm = () => {
  return (
    <div>
      <form>
        {/*username */}
        <div className="flex flex-col gap-4">
          <label className="text-[16px] font-semibold" htmlFor="username">
            Username
          </label>
          <input
            className="border px-2 border-red-500 rounded-md focus:outline-red-700"
            type="text"
            placeholder="AngryBird"
            id="username"
          ></input>
        </div>
        {/*password */}
        <div className="flex flex-col gap-4">
          <label className="text-[16px] font-semibold" htmlFor="password">
            Password
          </label>
          <input
            className="border px-2 border-red-500 rounded-md focus:outlineoutline-red-700"
            type="password"
            id="password"
            placeholder="Enter password"
          ></input>
        </div>
        {/*database role */}
        <fieldset className="border">
          <legend>Select a database role: </legend>
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
      </form>
    </div>
  );
};
