import React, { useState, useEffect } from "react";

const Cosmetico = () => {
    const [cosmetics, setCosmetics] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
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
        fetch("https://fortnite-api.com/v2/cosmetics")
            .then(res => res.json())
            .then(data => {
                const cosmeticsData = data.data.br || [];
                setCosmetics(cosmeticsData);
                setFiltered(cosmeticsData);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const filteredData = cosmetics.filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase())
        );
        setFiltered(filteredData);
    }, [search, cosmetics]);

    const openModal = (item) => {
        setCurrentItem(item);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setCurrentItem(null);
    };

    const handleSaveDiaryItem = (text) => {
        const diaryItem = {
            name: currentItem.name || "Item sem nome",
            image: currentItem.images?.icon || "https://via.placeholder.com/150",
            rarity: currentItem.rarity?.displayValue || "Comum",
            text
        };
        const savedItems = JSON.parse(localStorage.getItem("diaryItems")) || [];
        savedItems.push(diaryItem);
        localStorage.setItem("diaryItems", JSON.stringify(savedItems));
        closeModal();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-[#0c0c1c] to-[#1a1a2e] flex justify-center items-center px-4">
                <pre className="text-white text-center font-mono text-sm sm:text-lg md:text-2xl whitespace-pre-wrap">{loadingText}</pre>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0c0c1c] to-[#1a1a2e] p-4 sm:p-6 md:p-8">
            <input
                type="text"
                placeholder="Pesquisar por nome..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full max-w-lg mx-auto block mb-6 px-4 py-2 rounded-lg bg-[#1a1a2e] text-white placeholder-gray-400 border border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-md"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                {filtered.map((item, idx) => (
                    <div key={idx} className="bg-[#1a1a2e] rounded-xl shadow-lg border border-cyan-400 p-4 text-white hover:scale-105 transition-transform duration-200">
                        <img src={item.images.icon} alt={item.name} className="w-full h-40 object-contain mb-4 rounded-lg" />
                        <h3 className="text-lg md:text-xl font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-300">Raridade: {item.rarity?.displayValue || "Comum"}</p>
                        <button
                            onClick={() => openModal(item)}
                            className="mt-4 w-full px-4 py-2 bg-cyan-500 text-white rounded-lg text-sm sm:text-base"
                        >
                            Adicionar ao Diário
                        </button>
                    </div>
                ))}
            </div>

            {modalVisible && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center p-4">
                    <div className="bg-[#1a1a2e] p-4 sm:p-6 rounded-xl w-full max-w-md md:max-w-xl">
                        <h2 className="text-white text-lg sm:text-xl mb-4">Adicionar ao Diário</h2>
                        <textarea
                            placeholder="Adicione uma nota..."
                            className="w-full h-32 mb-4 p-2 bg-[#0c0c1c] text-white border border-cyan-400 rounded-md text-sm sm:text-base"
                            onChange={(e) => setCurrentItem({ ...currentItem, text: e.target.value })}
                            value={currentItem?.text || ""}
                        />
                        <div className="flex flex-col sm:flex-row justify-between gap-2">
                            <button onClick={closeModal} className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded-lg text-sm sm:text-base">Fechar</button>
                            <button onClick={() => handleSaveDiaryItem(currentItem?.text)} className="w-full sm:w-auto px-4 py-2 bg-cyan-500 text-white rounded-lg text-sm sm:text-base">Salvar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cosmetico;
