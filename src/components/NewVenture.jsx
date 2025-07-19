import { useState } from "react";
import {FiShoppingBag,FiCoffee,FiCreditCard,FiPhone,FiTarget, FiChevronLeft, FiChevronRight} from "react-icons/fi"
import VentureCard from "./VentureCard";
const NewVenture = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const ventures = [
        {
            id: 1,
            name: "Givenchy",
            description: "Luxury fashion brand specializing in high-end clothing designs and premium fragrances for discerning customers worldwide.",
            image: "/api/placeholder/300/200",
            tags: ["Fashion", "Luxury", "Retail"],
            goal: 550000,
            backers: 142,
            equity: 5,
            collected: 270000,
            icon: <FiShoppingBag className="w-4 h-4 text-gray-700" />
        },
        {
            id: 2,
            name: "Hip Hip Coffee",
            description: "Premium specialty coffee roasters focusing on sustainable sourcing and artisanal brewing methods.",
            image: "/api/placeholder/300/200",
            tags: ["Food & Beverage", "Sustainable"],
            goal: 300000,
            backers: 238,
            equity: 10,
            collected: 180000,
            icon: <FiCoffee className="w-4 h-4 text-gray-700" />
        },
        {
            id: 3,
            name: "Frog Scooter",
            description: "Award-winning manufacturer of lightweight, safe, and fun mobility solutions designed specifically for children.",
            image: "/api/placeholder/300/200",
            tags: ["Transportation", "Kids", "Sports"],
            goal: 850000,
            backers: 89,
            equity: 15,
            collected: 420000,
            icon: <FiCreditCard className="w-4 h-4 text-gray-700" />
        },
        {
            id: 4,
            name: "TechFlow",
            description: "Innovative mobile technology solutions focused on seamless device integration and smart connectivity.",
            image: "/api/placeholder/300/200",
            tags: ["Technology", "Mobile", "IoT"],
            goal: 1200000,
            backers: 156,
            equity: 8,
            collected: 480000,
            icon: <FiPhone className="w-4 h-4 text-gray-700" />
        },
        {
            id: 5,
            name: "GreenSpace",
            description: "Urban gardening solutions making sustainable living accessible through innovative indoor growing systems.",
            image: "/api/placeholder/300/200",
            tags: ["Sustainability", "Home & Garden"],
            goal: 400000,
            backers: 203,
            equity: 12,
            collected: 250000,
            icon: <FiTarget className="w-4 h-4 text-gray-700" />
        }
    ];

    const itemsPerPage = 3;
    const totalPages = Math.ceil(ventures.length / itemsPerPage);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalPages);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalPages) % totalPages);
    };

    const getCurrentVentures = () => {
        const start = currentSlide * itemsPerPage;
        return ventures.slice(start, start + itemsPerPage);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-1">
                                Investment Opportunities
                            </h1>
                            <p className="text-gray-600">Discover promising ventures and back innovative startups</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
                                50+ Active
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 py-6">
                {/* Navigation */}
                <div className="flex items-center justify-between mb-6">
                    <div className="text-sm text-gray-600">
                        Showing {currentSlide * itemsPerPage + 1} - {Math.min((currentSlide + 1) * itemsPerPage, ventures.length)} of {ventures.length} ventures
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={prevSlide}
                            disabled={currentSlide === 0}
                            className="p-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <FiChevronLeft className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                            onClick={nextSlide}
                            disabled={currentSlide === totalPages - 1}
                            className="p-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <FiChevronRight className="w-4 h-4 text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Ventures Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {getCurrentVentures().map((venture) => (
                        <VentureCard
                            key={venture.id}
                            venture={venture}
                        />
                    ))}
                </div>

                {/* Page Indicators */}
                <div className="flex justify-center items-center gap-2">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2 h-2 rounded-full transition-colors ${index === currentSlide
                                    ? 'bg-blue-600'
                                    : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default NewVenture
