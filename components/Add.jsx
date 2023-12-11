import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoClose } from "react-icons/io5";
import LoadingSpinner from './LoadingSpinner';

const Add = ({ setClose, editData, setEditData }) => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState(null);
    const [desc, setDesc] = useState(null);
    const [prices, setPrices] = useState([]);
    const [extraOptions, setExtraOptions] = useState([]);
    const [extra, setExtra] = useState(null);

    const [disableButton, setDisableButton] = useState(false);

    useEffect(() => {
        if (editData) {
            setTitle(editData.title || '');
            setDesc(editData.desc || '');
            setPrices(editData.prices || [0, 0, 0]);
            setExtraOptions(editData.extraOptions || []);
        }
    }, [editData]);

    const changePrice = (e, index) => {
        const currentPrices = prices;
        currentPrices[index] = e.target.value;
        setPrices([...currentPrices]);
    };

    const handleExtraInput = (e) => {
        setExtra({ ...extra, [e.target.name]: e.target.value });
    };

    const handleExtra = (e) => {
        setExtraOptions((prev) => [...prev, extra]);
    };

    const handleCreate = async () => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "uploads");

        setDisableButton(true);

        try {
            let url = '';

            if (file) {
                const uploadRes = await axios.post(
                    "https://api.cloudinary.com/v1_1/dn0mdmu8g/image/upload",
                    data
                );
                url = uploadRes.data.url;
            } else if (editData) {
                url = editData.img;
            }

            const newItem = {
                title,
                desc,
                prices,
                extraOptions,
                img: url,
            };

            if (editData) {
                console.log("editing...");
                await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${editData._id}`, newItem);
            } else {
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, newItem);
            };

            setTimeout(() => {
                window.location.reload();
            }, 500);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDeleteExtra = (index) => {
        setExtraOptions((prev) => {
            const updatedExtraOptions = [...prev];
            updatedExtraOptions.splice(index, 1);
            return updatedExtraOptions;
        });
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full mt-8 bg-gray-300 bg-opacity-80 z-40 flex items-center justify-center">
            <div className="bg-white px-4 py-2 h-auto rounded-xl relative w-[90vw] md:w-auto">
                <div
                    onClick={() => {
                        setClose(true);
                        setEditData(null);
                    }}
                    className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer absolute top-0 right-0 -mt-4 -mr-4 hover:bg-red-700 hover:scale-105"
                >
                    <IoClose size={20} />
                </div>
                <h1 className="text-2xl font-bold mt-4 md:mt-0 mb-4">{!editData ? "Create a New Menu Item" : "Edit a Menu Item"}</h1>
                <div className="mb-2">
                    <label className="block text-sm font-semibold mb-1">Image</label>
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                </div>
                <div className="mb-2">
                    <label className="block text-sm font-semibold mb-1">Title</label>
                    <input
                        className="w-full border border-gray-300 outline-none p-1"
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-sm font-semibold mb-1">Description</label>
                    <textarea
                        className="w-full border border-gray-300 outline-none p-1"
                        rows={4}
                        type="text"
                        name="desc"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-sm font-semibold mb-1">Prices</label>
                    <div className="flex justify-between">
                        <input
                            className="border border-gray-300 outline-none w-1/4 p-1"
                            type="number"
                            name="price_small"
                            placeholder="Small"
                            value={prices[0]}
                            onChange={(e) => changePrice(e, 0)}
                            onInput={(e) => {
                                if (e.target.value < 0) {
                                    e.target.value = 0;
                                }
                            }}
                        />
                        <input
                            className="border border-gray-300 outline-none w-1/4 p-1"
                            type="number"
                            name="price_medium"
                            placeholder="Medium"
                            value={prices[1]}
                            onChange={(e) => changePrice(e, 1)}
                            onInput={(e) => {
                                if (e.target.value < 0) {
                                    e.target.value = 0;
                                }
                            }}
                        />
                        <input
                            className="border border-gray-300 outline-none w-1/4 p-1"
                            type="number"
                            name="price_large"
                            placeholder="Large"
                            value={prices[2]}
                            onChange={(e) => changePrice(e, 2)}
                            onInput={(e) => {
                                if (e.target.value < 0) {
                                    e.target.value = 0;
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="mb-2">
                    <label className="block text-sm font-semibold mb-1">Extra Ingredients</label>
                    <div className="flex justify-between">
                        <input
                            className="border border-gray-300 outline-none w-1/4 p-1"
                            type="text"
                            placeholder="Ingredient"
                            name="text"
                            onChange={handleExtraInput}
                        />
                        <input
                            className="border border-gray-300 outline-none w-1/4 p-1"
                            type="number"
                            placeholder="Price"
                            name="price"
                            onChange={handleExtraInput}
                        />
                        <button
                            className={`${!extra || !extra.text || !extra.price
                                ? 'bg-gray-300 cursor-not-allowed'
                                : 'bg-red-500 hover:bg-red-700 hover:scale-105'
                                } text-white font-semibold px-2 py-1 rounded`}
                            onClick={handleExtra}
                            disabled={!extra || !extra.text || !extra.price}
                        >
                            Add Ingredient
                        </button>
                    </div>
                    <div className="flex flex-wrap mt-2">
                        {extraOptions.map((option, index) => (
                            <div key={option.text} className="flex items-center border border-red-500 bg-white text-red-500 px-2 py-1 rounded mr-2 mb-2 cursor-pointer">
                                {option.text}
                                <div
                                    className="text-red-500 ml-2 cursor-pointer"
                                    onClick={() => handleDeleteExtra(index)}
                                >
                                    <IoClose size={15} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {!disableButton && (
                    <button
                        className={`${!title || !desc || (!prices[0] && !prices[1] && !prices[2])
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-red-500 text-white hover:bg-red-700 hover:scale-105'
                            } w-1/4 text-white font-semibold px-2 py-1 rounded`}
                        onClick={handleCreate}
                        disabled={!title || !desc || (!prices[0] && !prices[1] && !prices[2])}
                    >
                        {!editData ? "Create" : "Edit"}
                    </button>
                )}

                {disableButton && (
                    <button
                        type="button"
                        className="bg-gray-300 cursor-not-allowed w-1/4 px-2 py-1"
                        onClick={handleCreate}
                        disabled={true}
                    >
                        <LoadingSpinner />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Add;