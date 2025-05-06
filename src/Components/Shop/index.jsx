import React, { useState, useEffect } from "react";

const Shop = () => {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [loadingText, setLoadingText] = useState("");
    const vbuckIcon = "https://fortnite-api.com/images/vbuck.png";

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
        fetch("https://fortnite-api.com/v2/shop")
            .then(res => res.json())
            .then(data => {
                setEntries(data.data.entries || []);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, []);

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
            name: currentItem.bundle?.name || "Item sem nome",
            image: currentItem.bundle?.image || currentItem.newDisplayAsset?.renderImages?.[0]?.image,
            rarity: currentItem.finalPrice ? "Raro" : "Comum",
            text
        };
        const savedItems = JSON.parse(localStorage.getItem("diaryItems")) || [];
        savedItems.push(diaryItem);
        localStorage.setItem("diaryItems", JSON.stringify(savedItems));
        closeModal();
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
            <input
                type="text"
                placeholder="Pesquisar por nome..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full max-w-md mx-auto block mb-6 px-4 py-2 rounded-lg bg-[#1a1a2e] text-white placeholder-gray-400 border border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-md"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {entries.map((entry, idx) => {
                    const image = entry.bundle?.image || entry.newDisplayAsset?.renderImages?.[0]?.image;
                    const name = entry.bundle?.name || entry.brItems?.[0]?.name || "Item sem nome";
                    const finalPrice = entry.finalPrice;

                    return (
                        <div
                            key={idx}
                            className="bg-gradient-to-b from-[#101020] to-[#1a1a2e] border-2 border-cyan-400 rounded-2xl overflow-hidden transform hover:scale-105 hover:shadow-cyan-500/20 shadow-lg transition-all duration-300"
                        >
                            <img
                                src={image}
                                alt={name}
                                className="w-full h-48 object-cover bg-black border-b-2 border-cyan-500"
                            />
                            <div className="p-4 text-white space-y-2">
                                <h2 className="text-lg font-bold uppercase tracking-wide">{name}</h2>

                                <div className="flex items-center gap-2">
                                    <img src={vbuckIcon} alt="V-Bucks" className="w-5 h-5" />
                                    <span className="text-xl font-bold">{finalPrice}</span>
                                </div>

                                <button
                                    onClick={() => openModal(entry)}
                                    className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded-lg"
                                >
                                    Adicionar ao Diário
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {modalVisible && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-[#1a1a2e] p-6 rounded-xl w-full sm:w-1/2 lg:w-1/3">
                        <h2 className="text-white text-xl mb-4">Adicionar ao Diário</h2>
                        <textarea
                            placeholder="Adicione uma nota..."
                            className="w-full h-32 mb-4 p-2 bg-[#0c0c1c] text-white border border-cyan-400 rounded-md"
                            onChange={(e) => setCurrentItem({ ...currentItem, text: e.target.value })}
                            value={currentItem?.text || ""}
                        />
                        <div className="flex justify-between">
                            <button onClick={closeModal} className="px-4 py-2 bg-red-500 text-white rounded-lg">Fechar</button>
                            <button onClick={() => handleSaveDiaryItem(currentItem?.text)} className="px-4 py-2 bg-cyan-500 text-white rounded-lg">Salvar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Shop;
