export default function InvestoSection2() {
    return (
        <div className="min-h-screen bg-white p-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content - Image */}
                    <div className="relative">
                        {/* Main Image Container */}
                        <div className="relative rounded-2xl overflow-hidden shadow-xl">
                            <img
                                src="/api/placeholder/600/500"
                                alt="Professional man working at office with Investo.co branding"
                                className="w-full h-96 lg:h-[500px] object-cover"
                            />

                            {/* Investo.co Logo Overlay */}
                            <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
                                <div className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                                            <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                                        </div>
                                        <span className="font-semibold text-lg">Investo.co</span>
                                    </div>
                                </div>
                            </div>

                            {/* Achievement Badge */}
                            <div className="absolute bottom-8 left-8">
                                <div className="bg-yellow-400 text-gray-900 px-4 py-3 rounded-full shadow-lg transform rotate-12">
                                    <div className="text-center">
                                        <div className="font-bold text-lg">#1</div>
                                        <div className="text-xs font-semibold">Fundraising</div>
                                        <div className="text-xs font-semibold">Company</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="space-y-6">
                        {/* Brand Badge */}
                        <div className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full">
                            <div className="w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                            </div>
                            <span className="font-semibold">Investo.co</span>
                        </div>

                        {/* Main Heading */}
                        <div>
                            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                                Unleashing Potential<br />
                                through Community<br />
                                Fundraising
                            </h1>
                        </div>

                        {/* Description */}
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                            <p>
                                We are a business that specialises in helping organisations, non-profits,
                                and individuals raise money for various causes and initiatives.
                                Fundraising companies typically offer a range of services, including
                                event planning, donor management, marketing and communications,
                                and fundraising strategy development.
                            </p>

                            <p>
                                The primary goal of a fund raising company is to help their clients reach
                                their financial targets by developing effective fund raising strategies and
                                engaging with potential donors.
                            </p>
                        </div>

                        {/* CTA Button */}
                        <div className="pt-6">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}