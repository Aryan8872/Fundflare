import { FiArchive, FiBriefcase, FiCamera, FiDollarSign, FiHardDrive , FiHeart, FiHome, FiTool, FiTrendingUp, FiLoader } from "react-icons/fi";

const FundraisingSection = () => {
    return (
        <div className="bg-gray-50 min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                {/* Fundraising Section */}
                <div className="mb-16">
                    <div className="flex flex-col lg:flex-row gap-12 items-start">
                        {/* Left Content */}
                        <div className="lg:w-1/2">
                            <h1 className="text-4xl lg:text-5xl font-bold text-navy-900 mb-8 leading-tight">
                                An Exploration of<br />
                                How It Works
                            </h1>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                                Create an Account
                            </button>
                        </div>

                        {/* Right Content */}
                        <div className="lg:w-1/2">
                            <p className="text-gray-600 text-lg leading-relaxed">
                                A fundraising company typically works by partnering with organisations,
                                charities, or individuals to help them raise money for a specific cause or
                                project. The company provides a variety of fundraising services, such as
                                marketing, event planning, and donor management, to help their clients
                                achieve their fundraising
                            </p>
                        </div>
                    </div>

                    {/* Three Steps */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="text-center">
                            <div className="w-20 h-20 mx-auto mb-6 border-2 border-blue-300 border-dashed rounded-full flex items-center justify-center">
                                <FiBriefcase className="w-8 h-8 text-blue-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                Find your passionate project
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Finding your passionate project can be an exciting and rewarding experience that allows you to pursue your interests and make a positive impact in the world.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="text-center">
                            <div className="w-20 h-20 mx-auto mb-6 border-2 border-blue-300 border-dashed rounded-full flex items-center justify-center">
                                <FiDollarSign className="w-8 h-8 text-blue-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                Invest your savings on project
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Investing your savings in a project can be a great way to potentially earn a higher return on your money than you would by leaving it in a savings account.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="text-center">
                            <div className="w-20 h-20 mx-auto mb-6 border-2 border-blue-300 border-dashed rounded-full flex items-center justify-center">
                                <FiTrendingUp className="w-8 h-8 text-blue-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                Get return from investment
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Getting a return from an investment typically involves earning a profit on the money you have invested. There are several ways to earn a return on an investment.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Business Trends Section */}
                <div className="bg-white rounded-2xl p-8 lg:p-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-center text-navy-900 mb-12">
                        Exploring the Latest<br />
                        Categories of Business Trends
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                        {/* Row 1 */}
                        <div className="bg-blue-50 hover:bg-blue-100 transition-colors rounded-xl p-4 flex items-center gap-3 cursor-pointer">
                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                                <FiHome className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <span className="font-medium text-gray-900">Real Estate</span>
                                <span className="text-gray-500 ml-2">(41)</span>
                            </div>
                        </div>

                        <div className="bg-red-50 hover:bg-red-100 transition-colors rounded-xl p-4 flex items-center gap-3 cursor-pointer">
                            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                                <FiCamera className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <span className="font-medium text-gray-900">Automotive</span>
                                <span className="text-gray-500 ml-2">(12)</span>
                            </div>
                        </div>

                        <div className="bg-teal-50 hover:bg-teal-100 transition-colors rounded-xl p-4 flex items-center gap-3 cursor-pointer">
                            <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
                                <FiCamera className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <span className="font-medium text-gray-900">Education</span>
                                <span className="text-gray-500 ml-2">(7)</span>
                            </div>
                        </div>

                        <div className="bg-orange-50 hover:bg-orange-100 transition-colors rounded-xl p-4 flex items-center gap-3 cursor-pointer">
                            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                                <FiLoader className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <span className="font-medium text-gray-900">Food & Dining</span>
                                <span className="text-gray-500 ml-2">(49)</span>
                            </div>
                        </div>

                        <div className="bg-purple-50 hover:bg-purple-100 transition-colors rounded-xl p-4 flex items-center gap-3 cursor-pointer">
                            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                                <FiHeart className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <span className="font-medium text-gray-900">Health & Medicine</span>
                                <span className="text-gray-500 ml-2">(9)</span>
                            </div>
                        </div>

                        {/* Row 2 */}
                        <div className="bg-green-50 hover:bg-green-100 transition-colors rounded-xl p-4 flex items-center gap-3 cursor-pointer">
                            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                <FiDollarSign className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <span className="font-medium text-gray-900">Finance</span>
                                <span className="text-gray-500 ml-2">(64)</span>
                            </div>
                        </div>

                        <div className="bg-red-50 hover:bg-red-100 transition-colors rounded-xl p-4 flex items-center gap-3 cursor-pointer">
                            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                                <FiTool className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <span className="font-medium text-gray-900">Manufacturing</span>
                                <span className="text-gray-500 ml-2">(5)</span>
                            </div>
                        </div>

                        <div className="bg-lime-50 hover:bg-lime-100 transition-colors rounded-xl p-4 flex items-center gap-3 cursor-pointer">
                            <div className="w-10 h-10 bg-lime-500 rounded-full flex items-center justify-center">
                                <FiHome className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <span className="font-medium text-gray-900">Home & Garden</span>
                                <span className="text-gray-500 ml-2">(153)</span>
                            </div>
                        </div>

                        <div className="bg-amber-50 hover:bg-amber-100 transition-colors rounded-xl p-4 flex items-center gap-3 cursor-pointer">
                            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                                <FiArchive className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <span className="font-medium text-gray-900">Entertainment</span>
                                <span className="text-gray-500 ml-2">(1)</span>
                            </div>
                        </div>

                        <div className="bg-blue-50 hover:bg-blue-100 transition-colors rounded-xl p-4 flex items-center gap-3 cursor-pointer">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                                <FiHardDrive className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <span className="font-medium text-gray-900">Construction</span>
                                <span className="text-gray-500 ml-2">(23)</span>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium px-6 py-3 rounded-full transition-colors flex items-center gap-2 mx-auto">
                            <span className="w-2 h-2 bg-gray-900 rounded-full"></span>
                            More 20+
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FundraisingSection;