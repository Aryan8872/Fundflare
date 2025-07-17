import React, { useState } from 'react';
import { FaEdit, FaEye, FaPlus, FaTimes, FaTrash, FaUpload } from 'react-icons/fa';
import Select from 'react-select';
import { toast } from 'react-toastify';
import {
    useCreateGalleryImageMutation,
    useDeleteGalleryImageMutation,
    useGetAllCampingSitesAdminQuery,
    useGetGalleryImagesQuery,
    useUpdateGalleryImageMutation
} from '../../api/api';

const GalleryAdmin = () => {
    const [showModal, setShowModal] = useState(false);
    const [editingImage, setEditingImage] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        imageUrl: '',
        category: 'tent',
        campingSiteId: ''
    });

    const { data: galleryData, isLoading, refetch } = useGetGalleryImagesQuery();
    const { data: sitesData, isLoading: sitesLoading } = useGetAllCampingSitesAdminQuery();
    const [createImage, { isLoading: creating }] = useCreateGalleryImageMutation();
    const [updateImage, { isLoading: updating }] = useUpdateGalleryImageMutation();
    const [deleteImage, { isLoading: deleting }] = useDeleteGalleryImageMutation();

    const images = galleryData?.images || [];
    const sites = sitesData?.campingSites || [];

    // Convert sites to React Select options
    const siteOptions = sites.map(site => ({
        value: site.id,
        label: `${site.name} - ${site.location}`,
        site: site
    }));

    const categories = [
        { value: 'tent', label: 'Tent' },
        { value: 'cabin', label: 'Cabin' },
        { value: 'caravan', label: 'Caravan' },
        { value: 'glamp', label: 'Glamping' },
        { value: 'camper', label: 'Camper' },
        { value: 'nature', label: 'Nature' },
        { value: 'activities', label: 'Activities' }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSelectChange = (name, selectedOption) => {
        setFormData(prev => ({
            ...prev,
            [name]: selectedOption ? selectedOption.value : ''
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.imageUrl) {
            toast.error('Please fill in all required fields');
            return;
        }

        try {
            if (editingImage) {
                await updateImage({ id: editingImage.id, data: formData }).unwrap();
                toast.success('Gallery image updated successfully');
            } else {
                await createImage(formData).unwrap();
                toast.success('Gallery image created successfully');
            }

            setShowModal(false);
            setEditingImage(null);
            resetForm();
            refetch();
        } catch (error) {
            toast.error(error.data?.message || 'Operation failed');
        }
    };

    const handleEdit = (image) => {
        setEditingImage(image);
        setFormData({
            title: image.title,
            description: image.description || '',
            imageUrl: image.imageUrl,
            category: image.category,
            campingSiteId: image.campingSiteId || ''
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this image?')) {
            try {
                await deleteImage(id).unwrap();
                toast.success('Gallery image deleted successfully');
                refetch();
            } catch (error) {
                toast.error('Failed to delete image');
            }
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            imageUrl: '',
            category: 'tent',
            campingSiteId: ''
        });
    };

    const openAddModal = () => {
        setEditingImage(null);
        resetForm();
        setShowModal(true);
    };

    // React Select styles
    const selectStyles = {
        control: (provided) => ({
            ...provided,
            minHeight: '48px',
            fontSize: '14px',
            border: '1px solid #d1d5db',
            borderRadius: '12px',
            boxShadow: 'none',
            '&:hover': {
                border: '1px solid #9ca3af',
            },
            '&:focus-within': {
                border: '2px solid #10b981',
                boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)',
            },
        }),
        option: (provided, state) => ({
            ...provided,
            fontSize: '14px',
            backgroundColor: state.isSelected ? '#10b981' : state.isFocused ? '#f3f4f6' : 'white',
            color: state.isSelected ? 'white' : '#374151',
            '&:hover': {
                backgroundColor: state.isSelected ? '#10b981' : '#f3f4f6',
            },
        }),
        menu: (provided) => ({
            ...provided,
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#9ca3af',
        }),
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-PoppinsBold text-gray-900 mb-2">Gallery Management</h1>
                    <p className="text-gray-600 font-PoppinsRegular">Manage your camping site gallery images</p>
                </div>
                <button
                    onClick={openAddModal}
                    className="bg-primaryGreen text-white px-6 py-3 rounded-xl font-PoppinsBold hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                    <FaPlus />
                    Add Image
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-blue-100 font-PoppinsMedium">Total Images</p>
                            <p className="text-3xl font-PoppinsBold">{images.length}</p>
                        </div>
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                            <FaEye className="text-2xl" />
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-green-100 font-PoppinsMedium">Active Images</p>
                            <p className="text-3xl font-PoppinsBold">{images.filter(img => img.status === 'active').length}</p>
                        </div>
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                            <FaUpload className="text-2xl" />
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-purple-100 font-PoppinsMedium">Categories</p>
                            <p className="text-3xl font-PoppinsBold">{categories.length}</p>
                        </div>
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                            <FaEdit className="text-2xl" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Images Grid */}
            {isLoading ? (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primaryGreen mx-auto mb-4"></div>
                    <p className="text-gray-600 font-PoppinsMedium">Loading gallery images...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {images.map((image) => (
                        <div key={image.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
                            <div className="relative">
                                <img
                                    src={image.imageUrl}
                                    alt={image.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-primaryGreen text-white px-3 py-1 rounded-full text-xs font-PoppinsMedium">
                                        {image.category.charAt(0).toUpperCase() + image.category.slice(1)}
                                    </span>
                                </div>
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <button
                                        onClick={() => handleEdit(image)}
                                        className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                                    >
                                        <FaEdit className="text-gray-600 hover:text-blue-500" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(image.id)}
                                        className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                                    >
                                        <FaTrash className="text-gray-600 hover:text-red-500" />
                                    </button>
                                </div>
                            </div>

                            <div className="p-4">
                                <h3 className="font-PoppinsBold text-lg text-gray-900 mb-2 line-clamp-1">
                                    {image.title}
                                </h3>
                                {image.description && (
                                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                        {image.description}
                                    </p>
                                )}
                                {image.campingSite && (
                                    <div className="text-sm text-gray-500 mb-2">
                                        <span className="font-PoppinsMedium">Site:</span> {image.campingSite.name}
                                    </div>
                                )}
                                <div className="text-xs text-gray-400">
                                    Added: {new Date(image.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-2xl mx-4 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-PoppinsBold text-gray-900">
                                {editingImage ? 'Edit Gallery Image' : 'Add Gallery Image'}
                            </h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-PoppinsMedium text-gray-700 mb-2">
                                    Title *
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryGreen font-PoppinsRegular"
                                    placeholder="Enter image title"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-PoppinsMedium text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryGreen font-PoppinsRegular resize-none"
                                    placeholder="Enter image description"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-PoppinsMedium text-gray-700 mb-2">
                                    Image URL *
                                </label>
                                <input
                                    type="url"
                                    name="imageUrl"
                                    value={formData.imageUrl}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryGreen font-PoppinsRegular"
                                    placeholder="Enter image URL"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-PoppinsMedium text-gray-700 mb-2">
                                    Category *
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryGreen font-PoppinsRegular"
                                    required
                                >
                                    {categories.map(cat => (
                                        <option key={cat.value} value={cat.value}>
                                            {cat.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-PoppinsMedium text-gray-700 mb-2">
                                    Associated Camping Site (Optional)
                                </label>
                                {sitesLoading ? (
                                    <div className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-500">
                                        Loading camping sites...
                                    </div>
                                ) : (
                                    <Select
                                        value={siteOptions.find(option => option.value === formData.campingSiteId)}
                                        onChange={(selectedOption) => handleSelectChange('campingSiteId', selectedOption)}
                                        options={siteOptions}
                                        placeholder="Search and select a camping site..."
                                        isClearable
                                        isSearchable
                                        styles={selectStyles}
                                        noOptionsMessage={() => "No camping sites found"}
                                        loadingMessage={() => "Loading camping sites..."}
                                    />
                                )}
                            </div>

                            {formData.imageUrl && (
                                <div>
                                    <label className="block text-sm font-PoppinsMedium text-gray-700 mb-2">
                                        Image Preview
                                    </label>
                                    <img
                                        src={formData.imageUrl}
                                        alt="Preview"
                                        className="w-full h-48 object-cover rounded-xl border border-gray-300"
                                        onError={(e) => {
                                            e.target.src = '/assets/images/campingtentimage.png';
                                        }}
                                    />
                                </div>
                            )}

                            <div className="flex gap-3 justify-end pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-xl font-PoppinsMedium transition-colors border border-gray-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={creating || updating}
                                    className="px-6 py-3 bg-primaryGreen text-white rounded-xl font-PoppinsBold hover:bg-green-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {creating || updating ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            {editingImage ? 'Updating...' : 'Creating...'}
                                        </>
                                    ) : (
                                        <>
                                            {editingImage ? 'Update Image' : 'Create Image'}
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GalleryAdmin; 