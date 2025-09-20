"use client";
import { useState, useEffect } from "react";
import Icon from "../icon";

// ---------------------------------------

export default function ChatWidget() {

    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [step, setStep] = useState(0);
    const [userData, setUserData] = useState({
        name: "",
        mobile: "",
        city: "",
        area: "",
        category: "",
    });

    const cityOptions = ["Ahmedabad", "Gandhinagar"];

    const areaOptions = {
        Ahmedabad: ["Ghodasar", "Ramol"],
        Gandhinagar: ["Sargasan", "Kudasan", "Gift City"],
    };

    const categoryOptions = ["Haircut", "Spa", "Facial", "Manicure", "Pedicure"];

    const addMessage = (sender, text, options = null) => {
        setMessages((prev) => [...prev, { sender, text, options }]);
    };

    const handleInput = () => {
        if (!input.trim()) return;
        addMessage("user", input);

        if (step === 0) {
            localStorage.setItem("salonUserName", input);
            localStorage.setItem("isBoxOpen", "true");
            setUserData({ ...userData, name: input });
            addMessage("ai", `Thanks ${input}! Please enter your mobile number.`);
            setStep(1);
        } else if (step === 1) {
            setUserData({ ...userData, mobile: input });
            addMessage("ai", "Great! Please select your city.", cityOptions);
            setStep(2);
        }
        setInput("");
    };

    const handleButtonSelect = (value) => {
        addMessage("user", value);

        if (step === 2) {
            setUserData({ ...userData, city: value });
            addMessage("ai", "Select your area:", areaOptions[value]);
            setStep(3);
        } else if (step === 3) {
            setUserData({ ...userData, area: value });
            addMessage("ai", "Choose category of service:", categoryOptions);
            setStep(4);
        } else if (step === 4) {
            setUserData({ ...userData, category: value });
            addMessage("ai", "What would you like to do next?", ["Book an Appointment", "Benefits for You"]);
            setStep(5);
        } else if (step === 5) {
            if (value === "Book an Appointment") {
                addMessage("ai", "Redirecting to offer page...");
                window.location.href = "/offer-page";
            } else if (value === "Benefits for You") {
                addMessage("ai", "Choose option:", ["Get Offer", "Top Rated Salon"]);
                setStep(6);
            }
        } else if (step === 6) {
            if (value === "Get Offer") {
                addMessage("ai", "Redirecting to WhatsApp...");
                window.location.href = "https://wa.me/xxxxxxxxxx";
            } else if (value === "Top Rated Salon") {
                addMessage("ai", "Redirecting to Top Rated Salon page...");
                window.location.href = "/top-rated";
            }
        }
    };

    const createNewChat = () => {
        setMessages([]);
        setStep(localStorage.getItem("salonUserName") ? 2 : 0);
        setUserData({ name: localStorage.getItem("salonUserName") || "", mobile: "", city: "", area: "", category: "" });
        if (localStorage.getItem("salonUserName")) {
            addMessage("ai", `Welcome back ${localStorage.getItem("salonUserName")}! Please select your city:`, cityOptions);
        } else {
            addMessage("ai", "Hello! Welcome to Salon Assistant 👋 Please enter your name.");
        }
    };

    useEffect(() => {
        if (open && messages.length === 0) {
            if (localStorage.getItem("salonUserName")) {
                setStep(2);
                setOpen(true)
                addMessage("ai", `Welcome back ${localStorage.getItem("salonUserName")}! Please select your city:`, cityOptions);
            }
            else {
                addMessage("ai", "Hello! Welcome to Salon Assistant 👋 Please enter your name.");
            }
        }
    }, [open]);

    useEffect(() => {
        const boxStatus = localStorage.getItem("isBoxOpen");
        if (boxStatus === "true") {
            setOpen(true);
        }
    }, []);

    return (
        <div>

            <button
                onClick={() => setOpen(!open)}
                className="fixed bottom-6 right-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
            >
                {open ? (
                    <Icon icon="radix-icons:cross-1" height={25} width={25} />
                ) : (
                    <Icon icon="mingcute:message-4-fill" height={25} width={25} />
                )}
            </button>

            {open && (
                <div className="fixed bottom-[6rem] right-6 w-96 h-[600px] bg-white border shadow-2xl rounded-2xl flex flex-col overflow-hidden">

                    <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-3 flex justify-between items-center">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <Icon icon="mdi:hair-dryer" height={22} width={22} />
                            Salon Assistant
                        </h2>
                        <button
                            onClick={createNewChat}
                            className="text-xs bg-white text-pink-600 px-2 py-1 rounded-full hover:bg-gray-100 transition"
                        >
                            New Chat
                        </button>
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`flex items-end ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                            >
                                {msg.sender === "ai" && (
                                    <Icon
                                        icon="fluent:bot-sparkle-20-filled"
                                        height={30}
                                        width={30}
                                        className="mr-2 text-purple-600"
                                    />
                                )}
                                <div className="flex flex-col">
                                    <span
                                        className={`px-4 py-2 rounded-2xl max-w-[100%] text-sm ${msg.sender === "user"
                                            ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                                            : "bg-white border text-gray-800 shadow-sm"
                                            }`}
                                    >
                                        {msg.text}
                                    </span>

                                    {msg.sender === "ai" && msg.options && (
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {msg.options.map((opt) => (
                                                <button
                                                    key={opt}
                                                    onClick={() => handleButtonSelect(opt)}
                                                    className="bg-blue-100 text-blue-700 px-3 py-2 rounded-full hover:bg-blue-200 transition"
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {msg.sender === "user" && (
                                    <Icon
                                        icon="mdi:account-circle"
                                        height={30}
                                        width={30}
                                        className="ml-2 text-pink-600"
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {(step === 0 || step === 1) && (
                        <div className="p-3 border-t bg-white flex items-center gap-2">
                            <input
                                type="text"
                                className="flex-1 border rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-pink-500 outline-none"
                                placeholder={step === 0 ? "Enter your name..." : "Enter your mobile number..."}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleInput()}
                            />
                            <button
                                onClick={handleInput}
                                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-3 rounded-full hover:scale-105 transition"
                            >
                                <Icon icon="mdi:send" height={22} width={22} />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
