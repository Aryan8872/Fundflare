import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaMapMarkerAlt, FaUsers, FaStar, FaTimes } from 'react-icons/fa';
import { useGetGalleryImagesQuery } from '../api/api';

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [filters, setFilters] = useState({
        search: '',
        category: 'All'
    });

    const { data: galleryData, isLoading, error } = useGetGalleryImagesQuery({
        search: filters.search,
        category: filters.category !== 'All' ? filters.category : undefined
    });

    const images = galleryData?.images || [];

    const categories = ["All", "tent", "cabin", "caravan", "glamp", "camper", "nature", "activities"];

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const clearFilters = () => {
        setFilters({
            search: '',
            category: 'All'
        });
    };

    // Loading skeleton
    const LoadingSkeleton = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-pulse">
                    <div className="h-64 bg-gray-300"></div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-PoppinsBold mb-6">Photo Gallery</h1>
                    <p className="text-xl md:text-2xl font-PoppinsRegular max-w-3xl mx-auto">
                        Explore our stunning camping sites and outdoor adventures through beautiful photography
                    </p>
                </div>
            </div>

            {/* Filters Section */}
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4 md:items-end">
                        <div className="flex-1">
                            <label className="block text-sm font-PoppinsMedium text-gray-700 mb-2">Search</label>
                            <div className="relative">
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search by title, description..."
                                    value={filters.search}
                                    onChange={(e) => handleFilterChange('search', e.target.value)}
                                    className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-300 font-PoppinsRegular focus:outline-none focus:ring-2 focus:ring-primaryGreen"
                                />
                            </div>
                        </div>

                        <div className="flex-1">
                            <label className="block text-sm font-PoppinsMedium text-gray-700 mb-2">Category</label>
                            <select
                                value={filters.category}
                                onChange={(e) => handleFilterChange('category', e.target.value)}
                                className="w-full px-3 py-3 rounded-xl border border-gray-300 font-PoppinsRegular focus:outline-none focus:ring-2 focus:ring-primaryGreen"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>
                                        {cat === "All" ? "All Categories" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <button
                                onClick={clearFilters}
                                className="bg-gray-500 text-white px-6 py-3 rounded-xl font-PoppinsBold hover:bg-gray-600 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
                            >
                                <FaFilter />
                                Clear
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-PoppinsBold text-gray-900">
                        {isLoading ? 'Loading...' : `${images.length} Images Found`}
                    </h2>
                    {isLoading && (
                        <div className="flex items-center gap-2 text-primaryGreen">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primaryGreen"></div>
                            <span className="text-sm font-PoppinsMedium">Loading...</span>
                        </div>
                    )}
                </div>

                {/* Gallery Grid */}
                <div className="mb-12">
                    {isLoading ? (
                        <LoadingSkeleton />
                    ) : error ? (
                        <div className="text-center py-12">
                            <div className="text-red-500 text-lg mb-2">Error loading gallery</div>
                            <div className="text-gray-600">Please try again later</div>
                        </div>
                    ) : images.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📸</div>
                            <h3 className="text-xl font-PoppinsBold text-gray-900 mb-2">No images found</h3>
                            <p className="text-gray-600 mb-4">Try adjusting your search criteria</p>
                            <button
                                onClick={clearFilters}
                                className="bg-primaryGreen text-white px-6 py-3 rounded-xl font-PoppinsBold hover:bg-green-700 transition-colors"
                            >
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {images.map(image => (
                                <div 
                                    key={image.id} 
                                    className="group relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                                    onClick={() => setSelectedImage(image)}
                                >
                                    <img 
                                        src={image.imageUrl} 
                                        alt={image.title} 
                                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    
                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-end">
                                        <div className="p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                            <h3 className="text-lg font-PoppinsBold mb-2">{image.title}</h3>
                                            <p className="text-sm font-PoppinsRegular mb-3 opacity-90 line-clamp-2">
                                                {image.description}
                                            </p>
                                            
                                            {image.campingSite && (
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <FaMapMarkerAlt className="text-primaryGreen" />
                                                        <span>{image.campingSite.location}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <FaUsers className="text-primaryGreen" />
                                                        <span>{image.campingSite.capacity} guests</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <FaStar className="text-yellow-500" />
                                                        <span>${image.campingSite.price}/night</span>
                                                    </div>
                                                </div>
                                            )}
                                            
                                            <div className="mt-3">
                                                <span className="inline-block bg-primaryGreen text-white px-3 py-1 rounded-full text-xs font-PoppinsMedium">
                                                    {image.category.charAt(0).toUpperCase() + image.category.slice(1)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Image Modal */}
            {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                        <div className="relative">
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                            >
                                <FaTimes className="text-gray-600" />
                            </button>
                            <img 
                                src={selectedImage.imageUrl} 
                                alt={selectedImage.title} 
                                className="w-full h-96 object-cover"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-PoppinsBold text-gray-900 mb-3">{selectedImage.title}</h3>
                            <p className="text-gray-600 font-PoppinsRegular mb-4">{selectedImage.description}</p>
                            
                            {selectedImage.campingSite && (
                                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                                    <h4 className="text-lg font-PoppinsBold text-gray-900 mb-3">Camping Site Details</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center gap-2">
                                            <FaMapMarkerAlt className="text-primaryGreen" />
                                            <span className="font-PoppinsMedium">{selectedImage.campingSite.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaUsers className="text-primaryGreen" />
                                            <span className="font-PoppinsMedium">{selectedImage.campingSite.capacity} guests</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaStar className="text-yellow-500" />
                                            <span className="font-PoppinsMedium">${selectedImage.campingSite.price}/night</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-PoppinsMedium text-primaryGreen">
                                                {selectedImage.campingSite.type.charAt(0).toUpperCase() + selectedImage.campingSite.type.slice(1)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            <div className="flex items-center justify-between">
                                <span className="inline-block bg-primaryGreen text-white px-4 py-2 rounded-full text-sm font-PoppinsMedium">
                                    {selectedImage.category.charAt(0).toUpperCase() + selectedImage.category.slice(1)}
                                </span>
                                <span className="text-sm text-gray-500 font-PoppinsRegular">
                                    Added on {new Date(selectedImage.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery; 