export const RegisterForm = () => {
  return (
    <div>
      <form>
        {/*username */}
        <div>
          <label>Username</label>
          <input type="text" placeholder="AngryBird"></input>
        </div>
        {/*password */}
        <div>
          <label>Password</label>
          <input type="password" placeholder="Enter password"></input>
        </div>
        {/*database role */}
        <div>
          <label>Role</label>
          <input type="checkbox"></input>
        </div>
      </form>
    </div>
  );
};
