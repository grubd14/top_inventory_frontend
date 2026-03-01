import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { logoutUser } from "../api/api";

function getStoredUser() {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    localStorage.removeItem("user");
    return null;
  }
}

export const Navbar = () => {
  const [user, setUser] = useState(getStoredUser);
  const navigate = useNavigate();
  const location = useLocation();

  // Re-read localStorage on every route change so the navbar
  // always reflects the current login state (e.g. after login/logout)
  useEffect(() => {
    setUser(getStoredUser());
  }, [location]);

  // Also keep in sync if localStorage changes in another tab
  useEffect(() => {
    function onStorage(e) {
      if (e.key === "user") {
        setUser(getStoredUser());
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error("Logout request failed:", err);
    } finally {
      localStorage.removeItem("user");
      setUser(null);
      navigate("/");
    }
  };

  return (
    <div className="shadow-xl">
      <div className="w-auto mx-auto">
        <nav className="bg-white text-black px-4 py-3">
          <div className="flex items-center justify-between">
            <Link
              to={user ? "/category" : "/"}
              className="text-lg font-semibold hover:text-blue-600"
            >
              Inventory Management
            </Link>
            <ul className="flex space-x-4 items-center">
              <li className="hover:bg-blue-300 rounded px-2 py-1 cursor-pointer">
                <Link to={user ? "/category" : "/"}>Home</Link>
              </li>
              {user ? (
                <>
                  <li className="text-sm px-2 py-1">
                    <span className="font-semibold">
                      Welcome, {user.username}
                    </span>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="bg-red-500 text-white rounded px-3 py-1 text-sm font-medium hover:bg-red-600 transition"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="hover:bg-blue-300 rounded px-2 py-1 cursor-pointer">
                    <Link to="/register">Register</Link>
                  </li>
                  <li className="hover:bg-blue-300 rounded px-2 py-1 cursor-pointer">
                    <Link to="/login">Login</Link>
                  </li>
                </>
              )}
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
