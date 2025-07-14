// App.jsx
import React, { useState, useEffect, useRef } from 'react';
import SearchBar from './components/SearchBar';
import DataDisplay from './components/DataDisplay';
import PostDataForm from './components/PostDataForm'; // TODO: Ensure this import exists
import EditDataForm from './components/EditDataForm'; // TODO: Add this import for the Edit/Update functionality
import useApi from './hooks/useApi'; // Your custom API hook
import { RESOURCE_TYPES } from './constants/resourceTypes';

function App() {
    // TODO: Define state for the current URL input (from SearchBar)
    const [currentUrl, setCurrentUrl] = useState('');

    // TODO: Utilize the useApi hook to manage data fetching state (data, loading, error)
    const { data, loading, error, execute } = useApi(currentUrl, 'GET');
    
    // TODO: Add state to manage which item is currently being edited (for EditDataForm)
    const [editingItem, setEditingItem] = useState(null);
    // TODO: Add state to control visibility of the EditDataForm
    const [showEditForm, setShowEditForm] = useState(false);

    // Use ref to track previous URL and prevent infinite loops
    const previousUrlRef = useRef('');

    // TODO: Implement a useEffect hook to trigger API calls whenever the currentUrl changes.
    // Remember to include 'execute' from useApi in the dependency array.
    useEffect(() => {
        if (currentUrl && currentUrl !== previousUrlRef.current) {
            previousUrlRef.current = currentUrl;
            // Manually trigger the API call when URL changes
            execute();
        }
    }, [currentUrl]); // Removed execute from dependencies

    // TODO: Define the handleSearch function to update the currentUrl state based on SearchBar input.
    // TODO: In handleSearch, also reset any edit mode states.
    const handleSearch = (url) => {
        setCurrentUrl(url);
        setEditingItem(null);
        setShowEditForm(false);
    };

    // TODO: Define the handleEdit callback for when an item is selected for editing from DataDisplay.
    const handleEdit = (item) => {
        console.log('handleEdit called with item:', item);
        setEditingItem(item);
        setShowEditForm(true);
    };

    // TODO: Define the handleDelete callback for handling deletion of an item from DataDisplay.
    // This should include a confirmation dialog, calling useApi's execute for DELETE, and updating UI.
    const handleDelete = async (itemId, resourceType) => {
        console.log('handleDelete called with itemId:', itemId, 'resourceType:', resourceType);
        
        if (!window.confirm(`Are you sure you want to delete this ${resourceType.slice(0, -1)}?`)) {
            return;
        }

        try {
            // Construct the correct delete URL
            let deleteUrl;
            if (currentUrl.endsWith('/')) {
                deleteUrl = `${currentUrl}${itemId}`;
            } else if (currentUrl.includes('/' + itemId)) {
                // If we're already viewing a single item, use the current URL
                deleteUrl = currentUrl;
            } else {
                deleteUrl = `${currentUrl}/${itemId}`;
            }

            console.log('Attempting to delete from URL:', deleteUrl);

            await execute(null, { 
                url: deleteUrl, 
                fetchOptions: { method: 'DELETE' } 
            });
            
            // Show success message (JSONPlaceholder doesn't actually delete)
            alert(`Delete request sent successfully! Note: JSONPlaceholder is a fake API, so the item will still appear in the list.`);
            
            // Refresh the data after successful deletion
            if (currentUrl) {
                execute();
            }
        } catch (err) {
            console.error('Delete failed:', err);
            alert('Failed to delete item. Please try again.');
        }
    };

    // TODO: Define handleEditComplete callback for when EditDataForm finishes.
    const handleEditComplete = () => {
        setEditingItem(null);
        setShowEditForm(false);
        // Show success message (JSONPlaceholder doesn't actually persist changes)
        alert('Edit request sent successfully! Note: JSONPlaceholder is a fake API, so changes will not persist.');
        // Refresh the data after successful edit
        if (currentUrl) {
            execute();
        }
    };

    // TODO: Define handleEditCancel callback for when EditDataForm is cancelled.
    const handleEditCancel = () => {
        setEditingItem(null);
        setShowEditForm(false);
    };

    // Helper function to get resource type from URL
    const getResourceType = (url) => {
        if (!url) return RESOURCE_TYPES.UNKNOWN;
        const resourceTypes = Object.values(RESOURCE_TYPES).filter(
            type => type !== RESOURCE_TYPES.UNKNOWN
        );
        for (const type of resourceTypes) {
            if (url.toLowerCase().includes(type)) {
                return type;
            }
        }
        return RESOURCE_TYPES.UNKNOWN;
    };

    // Helper function to create edit API execute function
    const createEditExecute = (item) => {
        return async (formData) => {
            // Construct the correct edit URL
            let editUrl;
            if (currentUrl.endsWith('/')) {
                editUrl = `${currentUrl}${item.id}`;
            } else if (currentUrl.includes('/' + item.id)) {
                // If we're already viewing a single item, use the current URL
                editUrl = currentUrl;
            } else {
                editUrl = `${currentUrl}/${item.id}`;
            }
            
            return execute(formData, { 
                url: editUrl, 
                fetchOptions: { method: 'PUT' } 
            });
        };
    };

    return (
        // TODO: Build the overall application structure using basic HTML elements.
        // TODO: Apply Tailwind CSS classes for layout, spacing, and dark theme aesthetics.
        // TODO: Render the main title (e.g., "React REST Navigator").
        // TODO: Render the SearchBar component, passing necessary props (onSearch, loading).
        // TODO: Implement Quick-Load Buttons, passing predefined URLs to handleSearch, and apply Tailwind CSS.
        // TODO: Render a separator (e.g., <hr>).
        // TODO: Render the DataDisplay component, passing necessary props (data, loading, error, url, onEdit, onDelete).
        // TODO: Render another separator.
        // TODO: Render the PostDataForm component, passing necessary props (execute).
        // TODO: Conditionally render the EditDataForm component based on edit mode state, passing all required props.
        // TODO: Render final separators or other structural elements.
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        Data Fetch Central
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        A powerful REST API navigator and data management tool
                    </p>
                </div>

                {/* Search Bar */}
                <SearchBar onSearch={handleSearch} loading={loading} />

                {/* Quick Load Buttons */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Quick Load Examples
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => handleSearch('https://jsonplaceholder.typicode.com/posts')}
                            disabled={loading}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 transition-colors"
                        >
                            Load Posts
                        </button>
                        <button
                            onClick={() => handleSearch('https://jsonplaceholder.typicode.com/users')}
                            disabled={loading}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
                        >
                            Load Users
                        </button>
                        <button
                            onClick={() => handleSearch('https://jsonplaceholder.typicode.com/todos')}
                            disabled={loading}
                            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-gray-400 transition-colors"
                        >
                            Load Todos
                        </button>
                        <button
                            onClick={() => handleSearch('https://jsonplaceholder.typicode.com/posts/1')}
                            disabled={loading}
                            className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:bg-gray-400 transition-colors"
                        >
                            Single Post
                        </button>
                    </div>
                </div>

                <hr className="border-gray-300 dark:border-gray-600 mb-6" />

                {/* Data Display */}
                <div className="mb-8">
                    <DataDisplay 
                        data={data} 
                        loading={loading} 
                        error={error} 
                        url={currentUrl} 
                        onEdit={handleEdit} 
                        onDelete={handleDelete} 
                    />
                </div>

                <hr className="border-gray-300 dark:border-gray-600 mb-6" />

                {/* Post Data Form */}
                <div className="mb-8">
                    <PostDataForm execute={execute} />
                </div>

                {/* Edit Data Form - Conditionally Rendered */}
                {showEditForm && editingItem && (
                    <>
                        <hr className="border-gray-300 dark:border-gray-600 mb-6" />
                        <div className="mb-8">
                            <EditDataForm 
                                item={editingItem}
                                resourceType={getResourceType(currentUrl)}
                                execute={createEditExecute(editingItem)}
                                onEditComplete={handleEditComplete}
                                onCancel={handleEditCancel}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default App;