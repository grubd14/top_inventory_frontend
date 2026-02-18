import { Link } from 'react-router';

export const Navbar = () => {
  return (
    <div className="shadow-xl">
      <div className="w-auto mx-auto">
        <nav className="bg-white-600 text-black px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">Inventory Management</div>
            <ul className="flex space-x-4">
              <li className="hover:bg-blue-300 rounded px-2 py-1 cursor-pointer">
                <Link to="/">Home</Link>
              </li>
              <li className="hover:bg-blue-300 rounded px-2 py-1 cursor-pointer">
                <Link to="/register">Register</Link>
              </li>
              <li className="hover:bg-blue-300 rounded px-2 py-1 cursor-pointer">
                <Link to="/login">Login</Link>
              </li>
              <li className="hover:bg-blue-300 rounded px-2 py-1 cursor-pointer">
                <Link to="/about">About</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};
