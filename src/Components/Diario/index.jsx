import React, { useState, useEffect } from "react";

const Diario = () => {
    const [diaryItems, setDiaryItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingText, setLoadingText] = useState("");

    const emojiParts = [
        "⠀⠀⠀⠀⠀⠀⣰⣾⠁⠀⢦⣾⣤⠆⠀⠻⣧⠀⠀⠀⠀⠀⠀",
        "⠀⠀⠀⠀⢠⣼⠏⠀⠀⠀⠀⣿⡇⠀⠀⠀⠈⢷⣄⠀⠀⠀⠀",
        "⠀⠀⢀⣸⣿⠃⠀⠀⠀⠀⠀⣿⡇⠀⠀⠀⠀⠀⢿⣧⡀⠀⠀",
        "⠀⢰⣾⣿⡁⠀⠀⠀⠀⠀⠀⣿⡇⠀⠀⠀⠀⠀⢀⣿⣿⠖⠀",
        "⠀⠀⠈⠻⣿⣦⣄⠀⠀⠀⠀⣿⡇⠀⠀⠀⢀⣴⣿⠟⠁⠀⠀",
        "⠀⠀⠀⠀⠈⠻⢿⣷⣄⡀⠀⣿⡇⠀⣠⣾⣿⠟⠁⠀⠀⠀⠀",
        "⠀⠀⠀⠀⠀⠀⠀⠙⢿⣿⣦⣿⣧⣾⣿⠟⠁⠀⠀⠀⠀⠀⠀",
        "⠀⠀⠀⠀⠀⠀⠀⠀⠀⢙⣿⣿⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀",
        "⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⣿⣿⣦⡀⠀⠀⠀⠀⠀⠀",
        "⠀⠀⠀⠀⠀⢀⣴⣿⣿⠟⠁⣻⣿⠈⠙⢿⣿⣦⡀⠀⠀⠀⠀",
        "⠀⠀⠀⢀⣴⣿⡿⠋⠀⠀⠀⣽⣿⠀⠀⠀⠙⢿⣿⣦⣄⠀⠀",
        "⠀⣠⣴⣿⡿⠋⠀⠀⠀⠀⠀⢼⣿⠀⠀⠀⠀⠀⠈⢻⣿⣷⣄",
        "⠈⠙⢿⣿⣦⣄⠀⠀⠀⠀⠀⢸⣿⠀⠀⠀⠀⠀⣠⣾⣿⠟⠁",
        "⠀⠀⠀⠙⢿⣿⣷⣄⠀⠀⠀⢸⣿⠀⠀⠀⣠⣾⣿⠟⠁⠀⠀",
        "⠀⠀⠀⠀⠀⠙⢻⣿⣷⡄⠀⢸⣿⠀⠀⣼⣿⣿⠃⠀⠀⠀⠀",
        "⠀⠀⠀⠀⠀⠀⠈⠻⢿⣿⣦⣸⣿⣠⣾⣿⠟⠁⠀⠀⠀⠀⠀",
        "⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⢿⣿⣿⣿⡿⠁⠀⠀⠀⠀⠀⠀⠀",
        "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀"
    ];

    useEffect(() => {
        if (loading) {
            let currentIndex = 0;
            const interval = setInterval(() => {
                setLoadingText((prev) => prev + emojiParts[currentIndex] + "\n");
                currentIndex++;
                if (currentIndex >= emojiParts.length) {
                    clearInterval(interval);
                }
            }, 50);

            return () => clearInterval(interval);
        }
    }, [loading]);

    useEffect(() => {
        setTimeout(() => {
            const savedItems = JSON.parse(localStorage.getItem("diaryItems")) || [];
            setDiaryItems(savedItems);
            setLoading(false);
        }, 2000);
    }, []);

    const editDiaryItem = (index, newItem) => {
        const updatedItems = [...diaryItems];
        updatedItems[index] = newItem;
        setDiaryItems(updatedItems);
        localStorage.setItem("diaryItems", JSON.stringify(updatedItems));
    };

    const deleteDiaryItem = (index) => {
        const updatedItems = diaryItems.filter((_, i) => i !== index);
        setDiaryItems(updatedItems);
        localStorage.setItem("diaryItems", JSON.stringify(updatedItems));
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-[#0c0c1c] to-[#1a1a2e] flex justify-center items-center">
                <pre className="text-white text-center font-mono text-2xl">
                    {loadingText}
                </pre>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0c0c1c] to-[#1a1a2e] p-6">
            <h1 className="text-center text-white text-3xl mb-6">Diário</h1>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {diaryItems.map((item, index) => (
                    <div key={index} className="bg-[#1a1a2e] rounded-xl shadow-lg border border-cyan-400 p-4 text-white">
                        <img src={item.image} alt={item.name} className="w-full h-40 object-contain mb-4 rounded-lg" />
                        <h3 className="text-xl font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-300">Raridade: {item.rarity || "Comum"}</p>
                        <p className="mt-2">{item.text}</p>
                        <div className="mt-4 flex gap-2">
                            <button
                                onClick={() => editDiaryItem(index, { ...item, text: prompt("Editar texto", item.text) })}
                                className="px-4 py-2 bg-cyan-500 text-white rounded-lg"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => deleteDiaryItem(index)}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                            >
                                Deletar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Diario;
