import React from "react";
import { useNavigate } from "react-router-dom";
import Shop from "../../Components/Shop";
import Header from "../../Components/Header";

export default function Loja({ adicionarAoDiario }) {
    const navigate = useNavigate();

    return (
        <div>
            <Header />
            <Shop adicionarAoDiario={adicionarAoDiario} />
        </div>
    );
}
