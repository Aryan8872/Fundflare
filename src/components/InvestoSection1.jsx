import { FiCheck, FiStar } from "react-icons/fi";

export default function InvestoSection1() {
    const features = [
        "Account management",
        "Investment research tools",
        "Trading platform",
        "News and updates",
        "Tracking investment",
        "24/7 Customer support",
        "Well Secured"
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                                Why investo.co is the<br />
                                Right Choice for your<br />
                                Investment Goals
                            </h1>
                            <p className="text-lg text-gray-500 mb-8">
                                Some important facilities to consider including are:
                            </p>
                        </div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                                        <FiCheck className="w-4 h-4 text-gray-900" strokeWidth={2.5} />
                                    </div>
                                    <span className="text-gray-700 font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <div className="pt-6">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200">
                                Browse Projects
                            </button>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="relative">
                        {/* Brand Header */}
                        <div className="absolute top-0 right-0 z-10 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <div className="w-4 h-4 bg-white rounded-sm"></div>
                                </div>
                                <span className="text-lg font-semibold text-blue-600">Investo.co</span>
                            </div>
                        </div>

                        {/* Trust Badge */}
                        <div className="absolute top-16 right-0 z-10 bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-200">
                            <div className="text-center">
                                <div className="flex items-center justify-center gap-2 mb-1">
                                    <span className="text-gray-700">We are globally</span>
                                    <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">100%</span>
                                    <span className="text-gray-700">trusted</span>
                                </div>
                                <p className="text-sm text-gray-600">investment & Fund Raising company</p>
                            </div>
                        </div>

                        {/* Main Image */}
                        <div className="relative">
                            <img
                                src="/api/placeholder/600/400"
                                alt="Professional businessman reading investment documents"
                                className="w-full h-96 object-cover rounded-2xl shadow-lg"
                            />

                            {/* Testimonial Card */}
                            <div className="absolute bottom-8 left-8 bg-white p-4 rounded-lg shadow-lg max-w-xs">
                                <div className="flex items-center gap-1 mb-3">
                                    <FiStar className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm font-bold text-gray-900">5.0</span>
                                </div>
                                <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                                    "I highly recommend investo.co's investments to anyone looking to start or grow their investment portfolio."
                                </p>
                                <div className="flex items-center gap-2">
                                    <img
                                        src="/api/placeholder/32/32"
                                        alt="Abdullah Zaber"
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                    <span className="text-sm font-medium text-gray-900">Abdullah Zaber</span>
                                </div>
                            </div>

                            {/* Curved Arrow */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <svg width="120" height="80" viewBox="0 0 120 80" fill="none" className="opacity-30">
                                    <path
                                        d="M20 20 Q60 10, 100 40 Q90 50, 80 45"
                                        stroke="#60A5FA"
                                        strokeWidth="3"
                                        fill="none"
                                        strokeDasharray="5,5"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}