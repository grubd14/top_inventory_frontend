import "./App.css";
import { Navbar } from "./components/navBar";
import { RegisterPage } from "./pages/registerPage.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

function isLoggedIn() {
  try {
    return !!localStorage.getItem("user");
  } catch {
    return false;
  }
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Home/Category Routes */}
        <Route
          path="/"
          element={
            isLoggedIn() ? <Navigate to="/category" replace /> : <IndexPage />
          }
        />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/category/create" element={<NewCategory />} />
        <Route path="/category/:id" element={<CategoryDetails />} />
        <Route path="/category/:id/update" element={<EditCategory />} />
        <Route path="/category/:id/new-item" element={<AddItem />} />

        {/* Item Routes */}
        <Route path="/item" element={<ItemsDetails />} />
        <Route path="/item/add" element={<AddItem />} />
        <Route path="/item/:id" element={<ItemsDetails />} />
        <Route path="/item/:id/edit" element={<EditItem />} />
        <Route path="/item/:id/update" element={<EditItem />} />

        {/* Auth Routes */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Info Routes */}
        <Route path="/about" element={<AboutPage />} />

        {/* 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
