import "./App.css";
import { Navbar } from "./components/navBar";
import { RegisterPage } from "./pages/registerPage.jsx";
import { BrowserRouter, Routes, Route} from "react-router";
import { LoginPage } from "./pages/loginPage";
import { NotFoundPage } from "./pages/notfoundPage";
import { CategoryPage } from "./pages/categoryPage";
import { ItemsDetails } from "./components/items/itemDetails";
import { EditItem} from "./components/items/editItem.jsx";
import { NewCategory } from "./components/category/newCategory";
import { AboutPage } from "./pages/aboutPage";
import { EditCategory } from "./components/category/editCategory";
import { CategoryDetails } from "./components/category/categoryDetails";
import { AddItem } from "./components/items/addItem";

function App() {
  return (
    <main>
      <BrowserRouter>
        <Navbar />
        {/* <CategoryPage/>*/}
        <Routes>
          {/* <NotFoundPage/>*/}
          {/* <EditCategory/>*/}
          {/* <Route path="/" element={<IndexPage/>} />*/}
          <Route path="/" element={<CategoryPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/category/create" element={<NewCategory />} />
          <Route path="/category/:id" element={<CategoryDetails/>} />
          <Route path="/category/:id/update" element={<EditCategory/>} />
          <Route path="/items" element={<ItemsDetails/>} />
          <Route path="/items/add" element={<AddItem/>} />
          <Route path="/items/:id" element={<ItemsDetails/>} />
          <Route path="/items/:id/update" element={<EditItem/>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
