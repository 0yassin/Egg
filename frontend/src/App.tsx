import { NavBar } from "./components/NavBar";
import { Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./pages/home";
import { Account } from "./pages/Account";
import { Farm } from "./pages/Farm";
import Footer from "./components/Footer";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { EggDetails } from "./pages/EggDetails";
import { AnimatePresence } from "motion/react";
import { PageTransition } from "./components/PageTransition";
function App() {
  const location = useLocation()
  return (
    <>
      <div className="sticky w-full top-0 z-10">
        <NavBar />
      </div>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>}  />
          <Route path="/farm" element={<PageTransition><Farm /></PageTransition>}/>
          <Route path="/account" element={<PageTransition><Account /></PageTransition>} />
          <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
          <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
          <Route path="/egg/:id" element={<EggDetails />} />
        </Routes>
      </AnimatePresence>
      <Footer/>
    </>
  );
}

export default App;
