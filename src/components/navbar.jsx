export const Navbar = () => {
  return (
    <div className="bg-white shadow">
      <div className="w-auto mx-auto">
        <nav className="bg-gray-600 text-white px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">Inventory Management</div>
            <ul className="flex space-x-4">
              <li className="hover:bg-blue-500 rounded px-2 py-1 cursor-pointer">
                Home
              </li>
              <li className="hover:bg-blue-500 rounded px-2 py-1 cursor-pointer">
                Register
              </li>
              <li className="hover:bg-blue-500 rounded px-2 py-1 cursor-pointer">
                Login
              </li>
              <li className="hover:bg-blue-500 rounded px-2 py-1 cursor-pointer">
                About
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};


