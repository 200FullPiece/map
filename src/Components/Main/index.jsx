import React from "react";
import video from "../../assets/videos/video.mp4";
import "../../assets/fonts/style.css";
import { useNavigate } from "react-router-dom";

export default function Main() {
    const navigate = useNavigate();

    return (
        <div className="relative h-[700px] overflow-hidden mt-14">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover"
            >
                <source src={video} type="video/mp4" />
            </video>

            <div className="relative z-10 bg-blue-800 bg-opacity-50 flex items-end justify-end px-8 py-12 h-full">
                <div className="flex flex-col items-end text-right mr-[100px]">
                    <h1 className="text-white text-5xl font-poppins uppercase leading-[1.2] mb-5 ml-[200px]">
                        Diário de Tempestades
                    </h1>

                    <p className="font-poppins text-white text-xl w-[80%] mt-2">
                        Monte suas metas da <span>temporada</span>
                    </p>

                    <button
                        onClick={() => navigate("/diario")}
                        className="bg-yellow-400 text-black w-[280px] h-[80px] flex justify-center items-center hover:bg-yellow-500 transition anton mt-8"
                    >
                        Entrar
                    </button>
                </div>
            </div>
        </div>
    );
}
