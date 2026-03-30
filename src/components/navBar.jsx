import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { logoutUser } from "../api/api";
import { notifyAuthChanged } from "../lib/auth";
import { useDarkMode } from "../App";

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
  const { isDark, setIsDark } = useDarkMode();

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
    notifyAuthChanged();
    navigate("/", { replace: true });
    void logoutUser().catch(() => {
      /* session already cleared locally */
    });
  };

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  const linkClass =
    "rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white";

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/95">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link
          to={user ? "/category" : "/"}
          className="text-lg font-semibold tracking-tight text-slate-900 transition hover:text-sky-700 dark:text-white dark:hover:text-sky-400"
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
              <li className="hidden px-2 text-sm text-slate-500 sm:block dark:text-slate-400">
                <span className="font-medium text-slate-700 dark:text-slate-300">
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
            <button
              type="button"
              onClick={toggleDarkMode}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </li>
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
