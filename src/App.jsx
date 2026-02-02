import "./App.css";
import { Navbar } from "./components/navbar";
import { RegisterPage } from "./pages/registerPage.jsx";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import { IndexPage } from "./pages/indexPage.jsx";
import { LoginPage } from "./pages/loginPage";
import { NotFoundPage } from "./pages/notfoundPage";
import { CategoryPage } from "./pages/categoryPage";
import { ItemsDetails } from "./components/itemDetails";
import { EditItemForm } from "./components/editItem";
import { NewCategory } from "./components/newCategory";
import { AboutPage } from "./pages/aboutPage";

function App() {
  return (
    <main>
      <Navbar />
      <IndexPage/>
      {/* <RegisterPage/>*/}
      {/* <RegisterPage />*/}
      {/* <LoginPage/>*/}
      {/* <CategoryPage/>*/}
      {/* <EditItemForm/>*/}
      {/* <ItemsDetails/>*/}
      {/* <NewCategory />*/}
      {/* <AboutPage/>*/}
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/register" element={<IndexPage />} />
          <Route path="/login" element={<IndexPage />} />
          <Route path="/about" element={<IndexPage />} />
          <Route path="/category" element={<IndexPage />} />
          
          {/* <Route path="/" element = {<NotFoundPage/>}/>*/}
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
