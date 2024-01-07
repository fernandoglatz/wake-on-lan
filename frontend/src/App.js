import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Common/Header";
import CreateDevice from "./components/Device/CreateDevice";
import Device from "./components/Device/Device";
import EditDevice from "./components/Device/EditDevice";
import ShowDevice from "./components/Device/ShowDevice";
function App() {
  return (
    <div className="App">
      <header className="container">
        <div className="">
          <Header />
          <Routes>
          
            <Route path="/" element={<ShowDevice />} />
            <Route path="/edit-device/:id" element={<EditDevice />} />
            <Route path="/device/:id" element={<Device />} />
            <Route path="/create-device" element={<CreateDevice />} />
            <Route path="/show-device" element={<ShowDevice />} />
          </Routes>
          
        </div>
      </header>
    </div>
  );
}

export default App;
