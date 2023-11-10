import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import DashPage from "./pages/DashPage";
import StrainPage from "./pages/StrainPage";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";

function App() {
  const [selectedFacility, setSelectedFacility] = useState("");

  return (
    <div className="app-wrap">
      <BrowserRouter>
        <NavBar
          selectedFacility={selectedFacility}
          setSelectedFacility={setSelectedFacility}
        />
        <Routes>
          <Route index element={<ChatPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route
            path="/dashboard"
            element={<DashPage facility={selectedFacility} />}
          />
          <Route path="/strains" element={<StrainPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
