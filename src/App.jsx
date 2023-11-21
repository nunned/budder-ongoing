import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import DashPage from "./pages/DashPage";
import StrainPage from "./pages/StrainPage";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";
import AdminPage from "./pages/AdminPage";
import ImmaturePage from "./pages/ImmaturePage";
import VegPage from "./pages/VegPage";
import FlowerPage from "./pages/FlowerPage";
import WastePage from "./pages/WastePage";
import HarvestPage from "./pages/HarvestPage";
import PackagesPage from "./pages/PackagesPage";
import FormPage from "./pages/FormPage";

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
          <Route path="/formpage" element={<FormPage />} />
          <Route path="/immature" element={<ImmaturePage />} />
          <Route path="/veg" element={<VegPage />} />
          <Route path="/flower" element={<FlowerPage />} />
          <Route path="/waste" element={<WastePage />} />
          <Route path="/harvest" element={<HarvestPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/packages" element={<PackagesPage />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
