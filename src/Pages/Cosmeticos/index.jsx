import React from "react";
import { useNavigate } from "react-router-dom";
import Cosmetico from "../../Components/Cosmetico";
import Header from "../../Components/Header";

export default function Cosmeticos({ adicionarAoDiario }) {
    const navigate = useNavigate();

    return (
        <div>
            <Header />
            <Cosmetico adicionarAoDiario={adicionarAoDiario} />
        </div>
    );
}
