import L from 'leaflet';
import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaTimes, FaTrash, FaUpload } from 'react-icons/fa';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { useCreateCampingSiteAdminMutation, useUpdateCampingSiteAdminMutation } from '../../api/api';
import '../../components/admin/AdminStyles.css';

// Fix for Leaflet marker icons in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Location Picker Component
const LocationPicker = ({ onLocationSelect, initialPosition }) => {
    const [position, setPosition] = useState(initialPosition || [27.7172, 85.3240]); // Kathmandu coordinates

    function LocationMarker() {
        useMapEvents({
            click(e) {
                setPosition([e.latlng.lat, e.latlng.lng]);
                onLocationSelect(e.latlng.lat, e.latlng.lng);
            },
        });

        return position ? <Marker position={position} /> : null;
    }

    return (
        <MapContainer
            center={position}
            zoom={10}
            style={{ height: '400px', width: '100%' }}
            className="rounded-lg"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
        </MapContainer>
    );
};

const AddSiteAdmin = ({ isOpen, onClose, onSubmit, editingSite }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        location: '',
        latitude: null,
        longitude: null,
        type: '',
        price: '',
        capacity: '',
        size: '',
        amenities: [],
        images: [],
        status: 'available'
    });

    const [showLocationPicker, setShowLocationPicker] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [imageFiles, setImageFiles] = useState([]); // Store actual file objects
    const [deletedImages, setDeletedImages] = useState([]); // Track deleted images for updates

    const [createCampingSite, { isLoading: isCreating }] = useCreateCampingSiteAdminMutation();
    const [updateCampingSite, { isLoading: isUpdating }] = useUpdateCampingSiteAdminMutation();

    const typeOptions = [
        { value: 'tent', label: 'Tent' },
        { value: 'glamping', label: 'Glamping' },
        { value: 'caravan', label: 'Caravan' },
        { value: 'cabin', label: 'Cabin' },
        { value: 'camper', label: 'Camper' }
    ];

    const amenitiesOptions = [
        { value: 'wifi', label: 'Wi-Fi' },
        { value: 'shower', label: 'Hot Shower' },
        { value: 'parking', label: 'Parking' },
        { value: 'bonfire', label: 'Bonfire Area' },
        { value: 'electricity', label: 'Electricity' },
        { value: 'water', label: 'Water Access' },
        { value: 'toilet', label: 'Toilet' },
        { value: 'kitchen', label: 'Kitchen' },
        { value: 'bbq', label: 'BBQ Grill' },
        { value: 'playground', label: 'Playground' }
    ];

    const statusOptions = [
        { value: 'available', label: 'Available' },
        { value: 'unavailable', label: 'Unavailable' }
    ];

    useEffect(() => {
        if (editingSite) {
            setFormData({
                name: editingSite.name || '',
                description: editingSite.description || '',
                location: editingSite.location || '',
                latitude: editingSite.latitude || null,
                longitude: editingSite.longitude || null,
                type: editingSite.type || '',
                price: editingSite.price || '',
                capacity: editingSite.capacity || '',
                size: editingSite.size || '',
                amenities: editingSite.amenities || [],
                images: editingSite.images || [],
                status: editingSite.status || 'available'
            });
            if (editingSite.latitude && editingSite.longitude) {
                setSelectedLocation([editingSite.latitude, editingSite.longitude]);
            }
            setImageFiles([]); // Reset new image files
            setDeletedImages([]); // Reset deleted images
        } else {
            setFormData({
                name: '',
                description: '',
                location: '',
                latitude: null,
                longitude: null,
                type: '',
                price: '',
                capacity: '',
                size: '',
                amenities: [],
                images: [],
                status: 'available'
            });
            setSelectedLocation(null);
            setImageFiles([]);
            setDeletedImages([]);
        }
    }, [editingSite]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSelectChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleMultiSelectChange = (name, selectedOptions) => {
        setFormData(prev => ({
            ...prev,
            [name]: selectedOptions.map(option => option.value)
        }));
    };

    const handleLocationSelect = (lat, lng) => {
        setSelectedLocation([lat, lng]);
        setFormData(prev => ({
            ...prev,
            latitude: lat,
            longitude: lng
        }));
    };

    const handleLocationInput = () => {
        setShowLocationPicker(true);
    };

    const confirmLocation = () => {
        if (selectedLocation) {
            // Reverse geocode to get location name (simplified)
            const locationName = `${selectedLocation[0].toFixed(4)}, ${selectedLocation[1].toFixed(4)}`;
            setFormData(prev => ({
                ...prev,
                location: locationName
            }));
        }
        setShowLocationPicker(false);
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setImageFiles(prev => [...prev, ...files]);
    };

    const removeImage = (index, isExisting = false) => {
        if (isExisting) {
            // Remove existing image and track for deletion
            const imageToDelete = formData.images[index];
            setDeletedImages(prev => [...prev, imageToDelete]);
            setFormData(prev => ({
                ...prev,
                images: prev.images.filter((_, i) => i !== index)
            }));
        } else {
            // Remove new image file
            setImageFiles(prev => prev.filter((_, i) => i !== index));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.type || !formData.price || !formData.location) {
            toast.error('Please fill in all required fields including location');
            return;
        }

        try {
            // Create FormData for file upload
            const submitData = new FormData();

            // Add all form fields
            submitData.append('name', formData.name);
            submitData.append('description', formData.description);
            submitData.append('location', formData.location);
            submitData.append('type', formData.type);
            submitData.append('price', formData.price);
            submitData.append('capacity', formData.capacity);
            submitData.append('size', formData.size);
            submitData.append('status', formData.status);
            submitData.append('amenities', JSON.stringify(formData.amenities));

            if (formData.latitude) submitData.append('latitude', formData.latitude);
            if (formData.longitude) submitData.append('longitude', formData.longitude);

            // Add new image files
            imageFiles.forEach((file, index) => {
                submitData.append('images', file);
            });

            // Add deleted images info for updates
            if (editingSite && deletedImages.length > 0) {
                submitData.append('deletedFiles', JSON.stringify(deletedImages));
            }

            if (editingSite) {
                await updateCampingSite({ id: editingSite.id, data: submitData }).unwrap();
                toast.success('Camping site updated successfully!');
            } else {
                await createCampingSite(submitData).unwrap();
                toast.success('Camping site created successfully!');
            }
            onClose();
        } catch (error) {
            toast.error(editingSite ? 'Failed to update camping site' : 'Failed to create camping site');
            console.error('Error:', error);
        }
    };

    if (!isOpen) return null;

    const isLoading = isCreating || isUpdating;

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 lg:p-6 border-b">
                        <h2 className="text-xl lg:text-2xl font-PoppinsBold text-primaryGreen">
                            {editingSite ? 'Edit Camping Site' : 'Add New Camping Site'}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition p-2"
                        >
                            <FaTimes size={20} />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-4 lg:p-6 space-y-4 lg:space-y-6">
                        {/* Basic Information */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                            <div>
                                <label className="block font-PoppinsMedium mb-2 text-sm lg:text-base">Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 lg:py-3 border border-gray-300 rounded-lg font-PoppinsRegular text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-primaryGreen"
                                    placeholder="Enter site name"
                                />
                            </div>

                            <div>
                                <label className="block font-PoppinsMedium mb-2 text-sm lg:text-base">Type *</label>
                                <Select
                                    value={typeOptions.find(option => option.value === formData.type)}
                                    onChange={(option) => handleSelectChange('type', option.value)}
                                    options={typeOptions}
                                    placeholder="Select type"
                                    className="text-sm lg:text-base"
                                    styles={{
                                        control: (provided) => ({
                                            ...provided,
                                            minHeight: '40px',
                                            fontSize: '14px',
                                        }),
                                        option: (provided) => ({
                                            ...provided,
                                            fontSize: '14px',
                                        }),
                                    }}
                                />
                            </div>

                            <div>
                                <label className="block font-PoppinsMedium mb-2 text-sm lg:text-base">Price per Night *</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 lg:py-3 border border-gray-300 rounded-lg font-PoppinsRegular text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-primaryGreen"
                                    placeholder="Enter price"
                                />
                            </div>

                            <div>
                                <label className="block font-PoppinsMedium mb-2 text-sm lg:text-base">Capacity</label>
                                <input
                                    type="number"
                                    name="capacity"
                                    value={formData.capacity}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 lg:py-3 border border-gray-300 rounded-lg font-PoppinsRegular text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-primaryGreen"
                                    placeholder="Number of guests"
                                />
                            </div>

                            <div>
                                <label className="block font-PoppinsMedium mb-2 text-sm lg:text-base">Size</label>
                                <input
                                    type="text"
                                    name="size"
                                    value={formData.size}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 lg:py-3 border border-gray-300 rounded-lg font-PoppinsRegular text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-primaryGreen"
                                    placeholder="e.g., 15m²"
                                />
                            </div>

                            <div>
                                <label className="block font-PoppinsMedium mb-2 text-sm lg:text-base">Status</label>
                                <Select
                                    value={statusOptions.find(option => option.value === formData.status)}
                                    onChange={(option) => handleSelectChange('status', option.value)}
                                    options={statusOptions}
                                    className="text-sm lg:text-base"
                                    styles={{
                                        control: (provided) => ({
                                            ...provided,
                                            minHeight: '40px',
                                            fontSize: '14px',
                                        }),
                                        option: (provided) => ({
                                            ...provided,
                                            fontSize: '14px',
                                        }),
                                    }}
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block font-PoppinsMedium mb-2 text-sm lg:text-base">Description *</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows={3}
                                className="w-full px-3 py-2 lg:py-3 border border-gray-300 rounded-lg font-PoppinsRegular text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-primaryGreen"
                                placeholder="Describe the camping site..."
                            />
                        </div>

                        {/* Location Picker */}
                        <div>
                            <label className="block font-PoppinsMedium mb-2 text-sm lg:text-base">Location *</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    className="flex-1 px-3 py-2 lg:py-3 border border-gray-300 rounded-lg font-PoppinsRegular text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-primaryGreen"
                                    placeholder="Enter location or pick from map"
                                    readOnly
                                />
                                <button
                                    type="button"
                                    onClick={handleLocationInput}
                                    className="px-4 py-2 lg:py-3 bg-primaryGreen text-white rounded-lg font-PoppinsMedium hover:bg-green-700 transition-colors flex items-center gap-2"
                                >
                                    <FaMapMarkerAlt />
                                    Pick Location
                                </button>
                            </div>
                            {selectedLocation && (
                                <div className="mt-2 text-sm text-gray-600">
                                    Selected: {selectedLocation[0].toFixed(4)}, {selectedLocation[1].toFixed(4)}
                                </div>
                            )}
                        </div>

                        {/* Amenities */}
                        <div>
                            <label className="block font-PoppinsMedium mb-2 text-sm lg:text-base">Amenities</label>
                            <Select
                                isMulti
                                value={amenitiesOptions.filter(option => formData.amenities.includes(option.value))}
                                onChange={(selectedOptions) => handleMultiSelectChange('amenities', selectedOptions)}
                                options={amenitiesOptions}
                                placeholder="Select amenities"
                                className="text-sm lg:text-base"
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        minHeight: '40px',
                                        fontSize: '14px',
                                    }),
                                    option: (provided) => ({
                                        ...provided,
                                        fontSize: '14px',
                                    }),
                                }}
                            />
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block font-PoppinsMedium mb-2 text-sm lg:text-base">Images</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 lg:p-6 text-center">
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    id="image-upload"
                                />
                                <label htmlFor="image-upload" className="cursor-pointer">
                                    <FaUpload className="mx-auto text-gray-400 text-2xl lg:text-3xl mb-2" />
                                    <p className="text-gray-600 font-PoppinsMedium text-sm lg:text-base">
                                        Click to upload images or drag and drop
                                    </p>
                                </label>
                            </div>

                            {/* Image Previews */}
                            {(formData.images.length > 0 || imageFiles.length > 0) && (
                                <div className="mt-4">
                                    <h4 className="text-sm font-PoppinsMedium text-gray-700 mb-3">Image Previews</h4>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                                        {/* Existing Images */}
                                        {formData.images.map((image, index) => (
                                            <div key={`existing-${index}`} className="relative group">
                                                <img
                                                    src={image}
                                                    alt={`Existing ${index + 1}`}
                                                    className="w-full h-24 lg:h-32 object-cover rounded-lg"
                                                />
                                                <div className="absolute top-1 left-1 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                                                    Existing
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index, true)}
                                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <FaTrash size={12} />
                                                </button>
                                            </div>
                                        ))}

                                        {/* New Image Files */}
                                        {imageFiles.map((file, index) => (
                                            <div key={`new-${index}`} className="relative group">
                                                <img
                                                    src={URL.createObjectURL(file)}
                                                    alt={`New ${index + 1}`}
                                                    className="w-full h-24 lg:h-32 object-cover rounded-lg"
                                                />
                                                <div className="absolute top-1 left-1 bg-green-500 text-white text-xs px-2 py-1 rounded">
                                                    New
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index, false)}
                                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <FaTrash size={12} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-xl font-PoppinsMedium transition-colors border border-gray-200"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex-1 px-6 py-3 bg-primaryGreen text-white rounded-xl font-PoppinsBold hover:bg-green-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Saving...' : (editingSite ? 'Update Site' : 'Create Site')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Location Picker Modal */}
            {showLocationPicker && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-4 lg:p-6 border-b">
                            <h2 className="text-xl lg:text-2xl font-PoppinsBold text-primaryGreen">
                                Pick Location
                            </h2>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setShowLocationPicker(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-PoppinsMedium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmLocation}
                                    className="px-4 py-2 bg-primaryGreen text-white rounded-lg font-PoppinsMedium hover:bg-green-700 transition-colors"
                                >
                                    Confirm Location
                                </button>
                            </div>
                        </div>
                        <div className="p-4 lg:p-6">
                            <LocationPicker
                                onLocationSelect={handleLocationSelect}
                                initialPosition={selectedLocation || [27.7172, 85.3240]}
                            />
                            <div className="mt-4 text-sm text-gray-600">
                                Click on the map to select a location. The coordinates will be automatically captured.
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddSiteAdmin; 