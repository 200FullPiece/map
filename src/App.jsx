import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from './Pages/Home';
import Loja from './Pages/Loja';
import Cosmeticos from './Pages/Cosmeticos';
import Diario from './Pages/Diarios';

export default function App() {
  const [itensDiario, setItensDiario] = useState([]);

  const adicionarAoDiario = (item) => {
    setItensDiario(prev => [...prev, item]);
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/loja" element={<Loja adicionarAoDiario={adicionarAoDiario} />} />
      <Route path="/cosmeticos" element={<Cosmeticos adicionarAoDiario={adicionarAoDiario} />} />
      <Route path="/diario" element={<Diario itens={itensDiario} />} />
    </Routes>
  );
}
