import React, { useState, useEffect } from 'react';
// TODO: Import RESOURCE_TYPES if needed for dynamic field rendering.
import { RESOURCE_TYPES, TODO_LABELS, USER_LABELS, POST_LABELS } from '../constants/resourceTypes';

export default function EditDataForm({ item, resourceType, execute, onEditComplete, onCancel }) {
    // 'item': The data object of the item to be edited.
    // 'resourceType': The type of resource (e.g., 'todos', 'posts').
    // 'execute': The API execution function from useApi.
    // 'onEditComplete': Callback to inform parent when edit is done.
    // 'onCancel': Callback to close the edit form.

    // TODO: Define state for form inputs, initialized with the 'item' prop's values.
    const [formData, setFormData] = useState({});
    // TODO: Use useEffect to update formData when the 'item' prop changes.
    useEffect(() => {
        if (item) {
            setFormData({ ...item });
        }
    }, [item]);
    
    // TODO: Define local state for loading, error, and success messages.
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // TODO: Implement generic input change handler for form fields.
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // TODO: Implement the handleSubmit function for updating data.
    // This should be async and use the 'execute' prop for PUT/PATCH request.
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            await execute(formData);
            setSuccess('Data updated successfully!');
            setTimeout(() => {
                onEditComplete();
            }, 1000);
        } catch (err) {
            setError(err.message || 'Failed to update data');
        } finally {
            setLoading(false);
        }
    };

    // TODO: Render a message if no item is selected for edit.
    if (!item) {
        return (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-4">
                <p className="text-yellow-800 dark:text-yellow-200">No item selected for editing.</p>
            </div>
        );
    }

    // Helper function to render form fields based on resource type
    const renderFormFields = () => {
        switch (resourceType) {
            case RESOURCE_TYPES.USERS:
                return (
                    <>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                {USER_LABELS.NAME}
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name || ''}
                                onChange={handleInputChange}
                                disabled={loading}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-700 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                            />
                        </div>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                {USER_LABELS.USERNAME}
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username || ''}
                                onChange={handleInputChange}
                                disabled={loading}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-700 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                {USER_LABELS.EMAIL}
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email || ''}
                                onChange={handleInputChange}
                                disabled={loading}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-700 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                {USER_LABELS.PHONE}
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone || ''}
                                onChange={handleInputChange}
                                disabled={loading}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-700 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                            />
                        </div>
                        <div>
                            <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                {USER_LABELS.WEBSITE}
                            </label>
                            <input
                                type="url"
                                id="website"
                                name="website"
                                value={formData.website || ''}
                                onChange={handleInputChange}
                                disabled={loading}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-700 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                            />
                        </div>
                    </>
                );
            case RESOURCE_TYPES.TODOS:
                return (
                    <>
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                {TODO_LABELS.TITLE}
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title || ''}
                                onChange={handleInputChange}
                                disabled={loading}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-700 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                            />
                        </div>
                        <div>
                            <label htmlFor="userId" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                {TODO_LABELS.USER_ID}
                            </label>
                            <input
                                type="number"
                                id="userId"
                                name="userId"
                                value={formData.userId || ''}
                                onChange={handleInputChange}
                                disabled={loading}
                                min="1"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-700 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="completed"
                                name="completed"
                                checked={formData.completed || false}
                                onChange={handleInputChange}
                                disabled={loading}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="completed" className="ml-2 block text-sm text-gray-700 dark:text-gray-200">
                                {TODO_LABELS.COMPLETED}
                            </label>
                        </div>
                    </>
                );
            case RESOURCE_TYPES.POSTS:
                return (
                    <>
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                {POST_LABELS.TITLE}
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title || ''}
                                onChange={handleInputChange}
                                disabled={loading}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-700 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                            />
                        </div>
                        <div>
                            <label htmlFor="body" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                {POST_LABELS.BODY}
                            </label>
                            <textarea
                                id="body"
                                name="body"
                                value={formData.body || ''}
                                onChange={handleInputChange}
                                disabled={loading}
                                rows="4"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-700 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                            />
                        </div>
                        <div>
                            <label htmlFor="userId" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                {POST_LABELS.USER_ID}
                            </label>
                            <input
                                type="number"
                                id="userId"
                                name="userId"
                                value={formData.userId || ''}
                                onChange={handleInputChange}
                                disabled={loading}
                                min="1"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-700 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                    </>
                );
            default:
                return (
                    <div className="text-center py-4">
                        <p className="text-gray-500 dark:text-gray-400">Unknown resource type for editing.</p>
                    </div>
                );
        }
    };

    return (
        // TODO: Build the form structure (e.g., <form onSubmit={handleSubmit}>).
        // TODO: Dynamically render form fields based on 'resourceType' and 'formData'.
        // TODO: Add action buttons (Save Changes, Cancel).
        // TODO: Display loading, error, and success messages conditionally.
        // TODO: Apply Tailwind CSS classes for all elements.
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Edit {resourceType?.charAt(0).toUpperCase() + resourceType?.slice(1, -1)} #{item.id}
                </h3>
                <button
                    type="button"
                    onClick={onCancel}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                    ✕
                </button>
            </div>

            <div className="space-y-4">
                {renderFormFields()}
            </div>

            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
                    <p className="text-red-600 dark:text-red-300 text-sm">{error}</p>
                </div>
            )}

            {success && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-3">
                    <p className="text-green-600 dark:text-green-300 text-sm">{success}</p>
                </div>
            )}

            <div className="flex space-x-3">
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                >
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:bg-gray-200 dark:disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
} 