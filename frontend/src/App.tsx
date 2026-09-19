import { NavBar } from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { Account } from "./pages/Account";
import { Farm } from "./pages/Farm";
import Footer from "./components/Footer";
function App() {
  return (
    <>
      <div className="sticky w-full top-0 z-10">
        <NavBar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/farm" element={<Farm />} />
        <Route path="/account" element={<Account />} />
      </Routes>
        <Footer />
    </>
  );
}

export default App;
