import "./App.css";
import { Navbar } from "./components/navBar";
import { RegisterPage } from "./pages/registerPage.jsx";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
  useNavigate,
} from "react-router-dom";
import { LoginPage } from "./pages/loginPage";
import { NotFoundPage } from "./pages/notfoundPage";
import { CategoryPage } from "./pages/categoryPage";
import { ItemsDetails } from "./components/items/itemDetails";
import { EditItem } from "./components/items/editItem.jsx";
import { NewCategory } from "./components/category/newCategory";
import { AboutPage } from "./pages/aboutPage";
import { EditCategory } from "./components/category/editCategory";
import { CategoryDetails } from "./components/category/categoryDetails";
import { AddItem } from "./components/items/addItem";
import { IndexPage } from "./pages/indexPage";
import { useEffect, useState, createContext, useContext } from "react";
import { AUTH_CHANGE_EVENT } from "./lib/auth";

const DarkModeContext = createContext();

export function useDarkMode() {
  return useContext(DarkModeContext);
}

function isLoggedIn() {
  try {
    return !!localStorage.getItem("user");
  } catch {
    return false;
  }
}

/** `/` — re-checks auth when `inventory-auth-change` fires (same-tab logout does not fire `storage`). */
function HomePage() {
  const [, setTick] = useState(0);
  useEffect(() => {
    const bump = () => setTick((n) => n + 1);
    window.addEventListener(AUTH_CHANGE_EVENT, bump);
    window.addEventListener("storage", bump);
    return () => {
      window.removeEventListener(AUTH_CHANGE_EVENT, bump);
      window.removeEventListener("storage", bump);
    };
  }, []);

  if (isLoggedIn()) {
    return <Navigate to="/category" replace />;
  }
  return <IndexPage />;
}

/** Redirects to `/` if there is no stored user (e.g. after logout while still on `/category`). */
function RequireAuth({ children }) {
  const navigate = useNavigate();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const bump = () => setTick((n) => n + 1);
    window.addEventListener(AUTH_CHANGE_EVENT, bump);
    window.addEventListener("storage", bump);
    return () => {
      window.removeEventListener(AUTH_CHANGE_EVENT, bump);
      window.removeEventListener("storage", bump);
    };
  }, []);

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/", { replace: true });
    }
  }, [navigate, tick]);

  if (!isLoggedIn()) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-600">
        Redirecting…
      </div>
    );
  }
  return children;
}

function RedirectItemEdit() {
  const { id } = useParams();
  return <Navigate to={`/item/${id}/edit`} replace />;
}

function DarkModeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem("darkMode");
    if (stored !== null) return stored === "true";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("darkMode", String(isDark));
  }, [isDark]);

  return (
    <DarkModeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function App() {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Home/Category Routes */}
          <Route path="/" element={<HomePage />} />
          <Route
            path="/category"
            element={
              <RequireAuth>
                <CategoryPage />
              </RequireAuth>
            }
          />
          <Route
            path="/category/create"
            element={
              <RequireAuth>
                <NewCategory />
              </RequireAuth>
            }
          />
          <Route
            path="/category/:id"
            element={
              <RequireAuth>
                <CategoryDetails />
              </RequireAuth>
            }
          />
          <Route
            path="/category/:id/update"
            element={
              <RequireAuth>
                <EditCategory />
              </RequireAuth>
            }
          />
          <Route
            path="/category/:id/new-item"
            element={
              <RequireAuth>
                <AddItem />
              </RequireAuth>
            }
          />

          {/* Item Routes */}
          <Route
            path="/item"
            element={
              <RequireAuth>
                <ItemsDetails />
              </RequireAuth>
            }
          />
          <Route
            path="/item/add"
            element={
              <RequireAuth>
                <AddItem />
              </RequireAuth>
            }
          />
          <Route
            path="/item/:id"
            element={
              <RequireAuth>
                <ItemsDetails />
              </RequireAuth>
            }
          />
          <Route
            path="/item/:id/edit"
            element={
              <RequireAuth>
                <EditItem />
              </RequireAuth>
            }
          />
          <Route
            path="/item/:id/update"
            element={
              <RequireAuth>
                <RedirectItemEdit />
              </RequireAuth>
            }
          />

          {/* Auth Routes */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Info Routes */}
          <Route path="/about" element={<AboutPage />} />

          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </DarkModeProvider>
  );
}

export default App;
