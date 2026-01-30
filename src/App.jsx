import "./App.css";
import { Navbar } from "./components/navbar";
import { RegisterPage } from "./pages/registerPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import { IndexPage } from "./pages/indexPage.jsx";
import { LoginPage } from "./pages/loginPage";
import { NotFoundPage } from "./pages/notfoundPage";

function App() {
  return (
    <main>
      <Navbar />
      {/* <IndexPage />*/}
      {/* <RegisterPage/>*/}
      {/* <RegisterPage />*/}
      <NotFoundPage />
      {/* <LoginPage />*/}
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<IndexPage />}></Route>*/}
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
