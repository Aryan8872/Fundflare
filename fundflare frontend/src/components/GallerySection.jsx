import React from "react";
import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";

const GallerySection = ({ images = [], isLoading = false }) => {
    // Loading skeleton
    if (isLoading) {
        return (
            <section className="container mx-auto my-20">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-PoppinsBold">Our Gallery</h2>
                    <div className="flex items-center gap-2 text-primaryGreen">
                        <FaSpinner className="animate-spin" />
                        <span className="text-sm font-PoppinsMedium">Loading...</span>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className="h-40 bg-gray-300 rounded-lg animate-pulse"></div>
                    ))}
                </div>
            </section>
        );
    }

    // If no images available, show default content
    if (images.length === 0) {
        return (
            <section className="container mx-auto my-20">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-PoppinsBold">Our Gallery</h2>
                    <Link
                        to="/gallery"
                        className="text-primaryGreen font-PoppinsMedium hover:text-green-700 transition-colors"
                    >
                        View All →
                    </Link>
                </div>
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">📸</div>
                    <h3 className="text-xl font-PoppinsBold text-gray-900 mb-2">Gallery coming soon</h3>
                    <p className="text-gray-600">Check back for beautiful camping photos!</p>
                </div>
            </section>
        );
    }

    return (
        <section className="container mx-auto my-20">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-PoppinsBold">Our Gallery</h2>
                <Link
                    to="/gallery"
                    className="text-primaryGreen font-PoppinsMedium hover:text-green-700 transition-colors"
                >
                    View All →
                </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.slice(0, 8).map((image, idx) => (
                    <div key={image.id || idx} className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                        <img
                            src={image.imageUrl}
                            alt={image.title || `Gallery ${idx + 1}`}
                            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-end">
                            <div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <h3 className="font-PoppinsBold text-sm mb-1">{image.title}</h3>
                                <p className="text-xs opacity-90 line-clamp-2">{image.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default GallerySection; 