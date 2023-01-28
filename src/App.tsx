import React from "react";
import Main from "./components/Main";
import Login from "./components/Login";
import Register from "./components/Register";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cryptos from "./components/Cryptos";
import Favorites from "./components/Favorites";

function App() {
  return (
    <div className="App" >

<BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/cryptos" element={<Cryptos/>} />
        <Route path="/favorite" element={<Favorites/>} />
      </Routes>
    </BrowserRouter>

      
    </div>
  );
}

export default App;
