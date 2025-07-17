import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useRef, useState } from "react";
import { FaFilter, FaMapMarkerAlt, FaSearch, FaUsers } from "react-icons/fa";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useSearchParams } from "react-router-dom";
import { useGetCampingSitesQuery } from "../api/api";

const types = ["All", "tent", "cabin", "caravan", "glamp", "camper"];

const getMapCenter = (sites) => {
    if (!sites || sites.length === 0) return [51.505, -0.09];
    const validSites = sites.filter(s => s.latitude && s.longitude);
    if (validSites.length === 0) return [51.505, -0.09];
    const avgLat = validSites.reduce((sum, s) => sum + s.latitude, 0) / validSites.length;
    const avgLng = validSites.reduce((sum, s) => sum + s.longitude, 0) / validSites.length;
    return [avgLat, avgLng];
};

const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [type, setType] = useState("All");
    const [price, setPrice] = useState(3000);
    const [search, setSearch] = useState("");
    const [checkin, setCheckin] = useState("");
    const [checkout, setCheckout] = useState("");
    const [guests, setGuests] = useState("");
    const filterRef = useRef(null);
    const [filterHeight, setFilterHeight] = useState(0);

    // Get URL parameters
    const urlCheckin = searchParams.get('checkin');
    const urlCheckout = searchParams.get('checkout');
    const urlGuests = searchParams.get('guests');
    const urlType = searchParams.get('type');

    // Initialize state from URL params
    useEffect(() => {
        if (urlCheckin) setCheckin(urlCheckin);
        if (urlCheckout) setCheckout(urlCheckout);
        if (urlGuests) setGuests(urlGuests);
        if (urlType) setType(urlType);
    }, [urlCheckin, urlCheckout, urlGuests, urlType]);

    // Fetch camping sites with filters
    const { data: sitesData, isLoading, error } = useGetCampingSitesQuery({
        checkin,
        checkout,
        guests: guests ? parseInt(guests) : undefined,
        type: type !== "All" ? type : undefined,
        search,
        maxPrice: price
    });

    useEffect(() => {
        if (filterRef.current) {
            setFilterHeight(filterRef.current.offsetHeight);
        }
        const handleResize = () => {
            if (filterRef.current) {
                setFilterHeight(filterRef.current.offsetHeight);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (checkin) params.append('checkin', checkin);
        if (checkout) params.append('checkout', checkout);
        if (guests) params.append('guests', guests);
        if (type !== "All") params.append('type', type);
        if (search) params.append('search', search);

        setSearchParams(params);
    };

    const clearFilters = () => {
        setType("All");
        setPrice(3000);
        setSearch("");
        setCheckin("");
        setCheckout("");
        setGuests("");
        setSearchParams({});
    };

    const sites = sitesData || [];

    // Loading skeleton
    const LoadingSkeleton = () => (
        <div className="space-y-8">
            {[1, 2, 3].map((i) => (
                <div key={i} className="bg-[#F5F3E9] rounded-xl shadow flex flex-col md:flex-row overflow-hidden border border-gray-200 animate-pulse">
                    <div className="w-full md:w-1/3 h-56 bg-gray-300"></div>
                    <div className="flex-1 flex flex-col p-6">
                        <div className="h-8 bg-gray-300 rounded mb-4"></div>
                        <div className="h-4 bg-gray-300 rounded mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded mb-6 w-3/4"></div>
                        <div className="flex justify-between items-center mt-auto">
                            <div className="h-6 bg-gray-300 rounded w-24"></div>
                            <div className="h-10 bg-gray-300 rounded w-32"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    // Custom marker icon
    const customMarker = new L.Icon({
        iconUrl: markerIconPng,
        iconSize: [32, 48],
        iconAnchor: [16, 48],
        popupAnchor: [0, -48],
    });

    return (
        <div className="min-h-screen bg-defaultbg">
            <div className="container mx-auto px-4 sm:px-6 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-PoppinsBold text-gray-900 mb-4">
                        Find Your Perfect Camping Site
                    </h1>
                    <p className="text-gray-600 font-PoppinsRegular max-w-2xl mx-auto">
                        Search through our collection of camping sites and find the perfect spot for your next adventure.
                    </p>
                </div>

                {/* Search Filters */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 mb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-end">
                        {/* Search Input */}
                        <div className="lg:col-span-2">
                            <label className="block font-PoppinsMedium mb-1 text-gray-700 text-xs">Search</label>
                            <div className="relative">
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                                <input
                                    type="text"
                                    placeholder="Search by name, location..."
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 font-PoppinsRegular focus:outline-none focus:ring-2 focus:ring-primaryGreen focus:border-transparent bg-gray-50"
                                />
                            </div>
                        </div>

                        {/* Type Filter */}
                        <div>
                            <label className="block font-PoppinsMedium mb-1 text-gray-700 text-xs">Type</label>
                            <select
                                value={type}
                                onChange={e => setType(e.target.value)}
                                className="w-full px-3 py-2.5 rounded-lg border border-gray-300 font-PoppinsRegular focus:outline-none focus:ring-2 focus:ring-primaryGreen focus:border-transparent bg-gray-50"
                            >
                                {types.map(t => (
                                    <option key={t} value={t}>
                                        {t === "All" ? "All Types" : t.charAt(0).toUpperCase() + t.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Price Range */}
                        <div className="flex flex-col justify-center">
                            <label className="block font-PoppinsMedium mb-1 text-gray-700 text-xs">Max Price: <span className="text-primaryGreen font-bold">${price}</span></label>
                            <input
                                type="range"
                                min={50}
                                max={5000}
                                value={price}
                                onChange={e => setPrice(Number(e.target.value))}
                                className="w-full accent-primaryGreen"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 lg:col-span-2 xl:col-span-1">
                            <button
                                onClick={handleSearch}
                                className="flex-1 bg-primaryGreen text-white px-4 py-2.5 rounded-lg font-PoppinsBold hover:bg-green-700 transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm"
                            >
                                <FaSearch className="text-sm" />
                                Search
                            </button>
                            <button
                                onClick={clearFilters}
                                className="flex-1 bg-gray-200 text-gray-700 px-4 py-2.5 rounded-lg font-PoppinsBold hover:bg-gray-300 transition-colors shadow flex items-center justify-center gap-2 text-sm border border-gray-300"
                            >
                                <FaFilter className="text-sm" />
                                Clear
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                    {/* Cards Column */}
                    <div className="w-full lg:w-1/2 xl:w-2/5 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 280px)' }}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-PoppinsBold text-gray-900">Results ({sites.length})</h2>
                            {isLoading && (
                                <div className="flex items-center gap-2 text-primaryGreen">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primaryGreen"></div>
                                    <span className="text-sm font-PoppinsMedium">Loading...</span>
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            {isLoading ? (
                                <LoadingSkeleton />
                            ) : error ? (
                                <div className="text-center py-8">
                                    <div className="text-red-500 text-lg mb-2">Error loading sites</div>
                                    <div className="text-gray-600">Please try again later</div>
                                </div>
                            ) : sites.length === 0 ? (
                                <div className="text-center py-8">
                                    <div className="text-6xl mb-4">🏕️</div>
                                    <h3 className="text-xl font-PoppinsBold text-gray-900 mb-2">No sites found</h3>
                                    <p className="text-gray-600 mb-4">Try adjusting your search criteria</p>
                                    <button
                                        onClick={clearFilters}
                                        className="bg-primaryGreen text-white px-6 py-3 rounded-xl font-PoppinsBold hover:bg-green-700 transition-colors"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            ) : (
                                sites.map(site => (
                                    <div key={site.id} className="bg-white rounded-xl shadow-md flex flex-col md:flex-row overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow group h-full">
                                        <img
                                            src={site.images?.[0] || "/assets/images/campingtentimage.png"}
                                            alt={site.name}
                                            className="w-full md:w-1/3 h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="flex-1 flex flex-col p-4">
                                            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2 gap-2">
                                                <h3 className="font-PoppinsBold text-lg text-primaryGreen line-clamp-1">{site.name}</h3>
                                                <div className="flex gap-4 text-gray-700 font-PoppinsMedium text-xs">
                                                    <span className="flex items-center gap-1">
                                                        <FaUsers className="text-primaryGreen flex-shrink-0" />
                                                        {site.capacity}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <FaMapMarkerAlt className="text-primaryGreen flex-shrink-0" />
                                                        <span className="line-clamp-1">{site.location}</span>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-1 mb-2">
                                                <span className="bg-primaryGreen/10 text-primaryGreen px-2 py-1 rounded-full text-xs font-PoppinsMedium capitalize">{site.type}</span>
                                                {site.amenities?.slice(0, 2).map((a, i) => (
                                                    <span key={i} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-PoppinsRegular">{a}</span>
                                                ))}
                                                {site.amenities?.length > 2 && <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-PoppinsRegular">+{site.amenities.length - 2}</span>}
                                            </div>
                                            <p className="font-PoppinsRegular text-gray-700 mb-4 text-sm line-clamp-2 flex-1">
                                                {site.description}
                                            </p>
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-auto gap-3">
                                                <div className="flex items-center gap-3">
                                                    <span className="font-PoppinsBold text-primaryGreen text-base">${site.price}/night</span>
                                                    <span className="text-xs text-gray-600 font-PoppinsMedium capitalize">
                                                        {site.type}
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={() => window.location.href = `/camping/${site.id}`}
                                                    className="bg-primaryGreen text-white px-4 py-2 rounded-lg font-PoppinsBold text-sm hover:bg-green-700 transition-colors w-full sm:w-auto shadow-md hover:shadow-lg"
                                                >
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Map Column */}
                    <div className="hidden lg:block w-1/2 xl:w-[60%] h-[calc(100vh-280px)]">
                        <div className="w-full h-full">
                            <MapContainer
                                center={getMapCenter(sites)}
                                zoom={sites.length > 0 ? 10 : 2}
                                scrollWheelZoom={false}
                                className="w-full h-full rounded-xl shadow-lg border border-gray-200"
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {sites.map(site => (
                                    <Marker key={site.id} position={[site.latitude || 51.505, site.longitude || -0.09]} icon={customMarker}>
                                        <Popup>
                                            <div className="font-PoppinsBold text-primaryGreen text-sm">{site.name}</div>
                                            <div className="font-PoppinsRegular capitalize text-xs">{site.type}</div>
                                            <div className="font-PoppinsBold text-sm">${site.price}/night</div>
                                            <button
                                                onClick={() => window.location.href = `/camping/${site.id}`}
                                                className="mt-2 bg-primaryGreen text-white px-3 py-1 rounded-lg font-PoppinsBold text-xs hover:bg-green-700 transition-colors"
                                            >
                                                View Details
                                            </button>
                                        </Popup>
                                    </Marker>
                                ))}
                            </MapContainer>
                        </div>
                    </div>

                    {/* Mobile Map */}
                    <div className="block lg:hidden w-full h-80 mt-4">
                        <MapContainer
                            center={getMapCenter(sites)}
                            zoom={sites.length > 0 ? 10 : 2}
                            scrollWheelZoom={false}
                            className="w-full h-full rounded-xl overflow-hidden shadow-lg border border-gray-200"
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {sites.map(site => (
                                <Marker key={site.id} position={[site.latitude || 51.505, site.longitude || -0.09]} icon={customMarker}>
                                    <Popup>
                                        <div className="font-PoppinsBold text-primaryGreen text-sm">{site.name}</div>
                                        <div className="font-PoppinsRegular capitalize text-xs">{site.type}</div>
                                        <div className="font-PoppinsBold text-sm">${site.price}/night</div>
                                        <button
                                            onClick={() => window.location.href = `/camping/${site.id}`}
                                            className="mt-2 bg-primaryGreen text-white px-3 py-1 rounded-lg font-PoppinsBold text-xs hover:bg-green-700 transition-colors"
                                        >
                                            View Details
                                        </button>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchPage; 