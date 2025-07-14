// components/SearchBar.jsx
import React, { useState } from 'react';

// TODO: Receive 'onSearch' callback and 'loading' boolean as props from App.jsx.
export default function SearchBar({ onSearch, loading }) {
    // TODO: Define local state for the input field's value.
    const [inputValue, setInputValue] = useState('');

    // TODO: Implement handleInputChange function to update local state.
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    // TODO: Implement handleSubmit function for form submission.
    // This should prevent default, validate input, and call the 'onSearch' prop.
    // TODO: Optionally clear the input field after submission.
    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            onSearch(inputValue.trim());
            setInputValue(''); // Clear input after submission
        }
    };

    return (
        // TODO: Build the form structure (e.g., <form onSubmit={handleSubmit}>).
        // TODO: Add a label for the input field.
        // TODO: Add the input field, binding its value and onChange.
        // TODO: Apply the 'disabled' attribute based on the 'loading' prop.
        // TODO: Add a submit button.
        // TODO: Apply the 'disabled' attribute to the button based on the 'loading' prop.
        // TODO: Apply Tailwind CSS classes for all elements (form, label, input, button).
        <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex flex-col space-y-2">
                <label htmlFor="api-url" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    API URL
                </label>
                <div className="flex space-x-2">
                    <input
                        id="api-url"
                        type="url"
                        value={inputValue}
                        onChange={handleInputChange}
                        disabled={loading}
                        placeholder="https://jsonplaceholder.typicode.com/posts"
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    />
                    <button
                        type="submit"
                        disabled={loading || !inputValue.trim()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? 'Loading...' : 'Fetch'}
                    </button>
                </div>
            </div>
        </form>
    );
}