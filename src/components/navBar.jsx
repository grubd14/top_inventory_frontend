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

  useEffect(() => {
    queueMicrotask(() => {
      setUser(getStoredUser());
    });
  }, [location]);

  useEffect(() => {
    function onStorage(e) {
      if (e.key === "user") {
        setUser(getStoredUser());
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/", { replace: true });
    void logoutUser().catch(() => {
      /* session already cleared locally */
    });
  };

  const linkClass =
    "rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900";

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link
          to={user ? "/category" : "/"}
          className="text-lg font-semibold tracking-tight text-slate-900 transition hover:text-sky-700"
        >
          Inventory
        </Link>
        <ul className="flex flex-wrap items-center justify-end gap-1 sm:gap-2">
          <li>
            <Link to={user ? "/category" : "/"} className={linkClass}>
              Home
            </Link>
          </li>
          {user && (
            <>
              <li>
                <Link to="/item" className={linkClass}>
                  Items
                </Link>
              </li>
              <li className="hidden px-2 text-sm text-slate-500 sm:block">
                <span className="font-medium text-slate-700">
                  {user.username}
                </span>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                >
                  Log out
                </button>
              </li>
            </>
          )}
          {!user && (
            <>
              <li>
                <Link to="/register" className={linkClass}>
                  Register
                </Link>
              </li>
              <li>
                <Link to="/login" className={linkClass}>
                  Log in
                </Link>
              </li>
            </>
          )}
          <li>
            <Link to="/about" className={linkClass}>
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
