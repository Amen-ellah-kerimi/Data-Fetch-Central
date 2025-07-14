import React, { useState } from 'react';

// TODO: Receive 'execute' function as a prop from App.jsx.
export default function PostDataForm({ execute }) {
    // TODO: Define state variables for your form inputs (e.g., title, body).
    const [formData, setFormData] = useState({
        title: '',
        body: '',
        userId: 1
    });
    // TODO: Define local state for loading, error, and success messages specific to this form.
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // TODO: Implement the handleSubmit function for the form submission.
    // This function should be async and use the 'execute' prop to make the POST request.
    // TODO: Include client-side validation, payload construction, API call, and state updates.
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Client-side validation
        if (!formData.title.trim() || !formData.body.trim()) {
            setError('Title and body are required');
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const result = await execute(formData);
            setSuccess('Data posted successfully!');
            setFormData({ title: '', body: '', userId: 1 }); // Reset form
        } catch (err) {
            setError(err.message || 'Failed to post data');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        // TODO: Build the form structure (e.g., <form onSubmit={handleSubmit}>).
        // TODO: Add input fields for title and body.
        // TODO: Add a submit button.
        // TODO: Display loading, error, and success messages conditionally.
        // TODO: Apply Tailwind CSS classes for all elements.
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create New Post</h3>
            
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-700 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    placeholder="Enter post title"
                />
            </div>

            <div>
                <label htmlFor="body" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Body
                </label>
                <textarea
                    id="body"
                    name="body"
                    value={formData.body}
                    onChange={handleInputChange}
                    disabled={loading}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-700 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    placeholder="Enter post content"
                />
            </div>

            <div>
                <label htmlFor="userId" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    User ID
                </label>
                <input
                    type="number"
                    id="userId"
                    name="userId"
                    value={formData.userId}
                    onChange={handleInputChange}
                    disabled={loading}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-700 dark:bg-gray-700 dark:text-white"
                />
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

            <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
            >
                {loading ? 'Posting...' : 'Create Post'}
            </button>
        </form>
    );
} 