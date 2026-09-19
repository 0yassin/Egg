import { NavBar } from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Account } from "./pages/Account";
import { Farm } from "./pages/Farm";
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/farm" element={<Farm />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </>
  );
}

export default App;
