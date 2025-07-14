// components/DataDisplay.jsx (Renamed for clarity, or keep DynamicDataDisplay)
import React, { useState } from 'react';
import { RESOURCE_TYPES, TODO_LABELS, USER_LABELS, POST_LABELS } from '../constants/resourceTypes'; // Import constants

// TODO: Receive 'data', 'loading', 'error', 'url', 'onEdit', and 'onDelete' as props from App.jsx.
export default function DataDisplay({ data, loading, error, url, onEdit, onDelete }) {
    // TODO: Implement local state for client-side search/filter term.
    const [searchTerm, setSearchTerm] = useState('');
    // TODO: Implement state for "View Raw JSON" toggle.
    const [showRaw, setShowRaw] = useState(false);
    
    // TODO: Define a helper function to determine resource type based on the URL.
    function getResourceType(url){
        if(!url) return RESOURCE_TYPES.UNKNOWN;
        const ResourceTypes = Object.values(RESOURCE_TYPES).filter(
            type => type !== RESOURCE_TYPES.UNKNOWN
        );
        for (const type of ResourceTypes){
            if(url.toLowerCase().includes(type)){
                return type;
            }
        }
        return RESOURCE_TYPES.UNKNOWN;
    }

    // TODO: Implement conditional rendering for Loading, Error, and Initial States.
    // Apply Tailwind CSS for visual feedback.
    if(loading === true){
        return(
            <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-blue-600 dark:text-blue-400">Loading...</span>
            </div>
        );
    }else if (error){
        return(
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4 mb-4">
                <h2 className="text-red-800 dark:text-red-200 font-medium">Error</h2>
                <p className="text-red-600 dark:text-red-300">{error.message}</p>
            </div>
        );
    }else if (!data){
        return(
            <div className="text-center py-8">
                <h2 className="text-gray-600 dark:text-gray-300 text-lg">No data found. Enter a URL above to fetch data.</h2>
            </div>
        );
    }  

    // TODO: Define a helper function (renderItem) for rendering individual items based on resource type.
    // This function should use switch/case for different RESOURCE_TYPES.
    // Inside renderItem, apply Tailwind CSS for item display.
    // Inside renderItem, add "Edit" and "Delete" buttons, calling onEdit(item) and onDelete(item.id, type).
    function renderItem(item, index){
        const resourceType = getResourceType(url);
        const handleEdit = () => {
            console.log('Edit button clicked for item:', item);
            onEdit(item);
        };
        const handleDelete = () => {
            console.log('Delete button clicked for item ID:', item.id, 'resource type:', resourceType);
            onDelete(item.id, resourceType);
        };
        
        switch (resourceType){
            case RESOURCE_TYPES.USERS:
                return(
                    <div key={item.id || index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4 shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{item.name}</h3>
                                <ul className="space-y-1 text-sm">
                                    <li><span className="font-medium text-gray-700 dark:text-gray-300">{USER_LABELS.ID}:</span> <span className="text-gray-900 dark:text-white">{item.id}</span></li>
                                    <li><span className="font-medium text-gray-700 dark:text-gray-300">{USER_LABELS.USERNAME}:</span> <span className="text-gray-900 dark:text-white">{item.username}</span></li>
                                    <li><span className="font-medium text-gray-700 dark:text-gray-300">{USER_LABELS.EMAIL}:</span> <span className="text-gray-900 dark:text-white">{item.email}</span></li>
                                    <li><span className="font-medium text-gray-700 dark:text-gray-300">{USER_LABELS.PHONE}:</span> <span className="text-gray-900 dark:text-white">{item.phone}</span></li>
                                    <li><span className="font-medium text-gray-700 dark:text-gray-300">{USER_LABELS.WEBSITE}:</span> <span className="text-gray-900 dark:text-white">{item.website}</span></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Company & Address</h4>
                                <ul className="space-y-1 text-sm">
                                    <li><span className="font-medium text-gray-700 dark:text-gray-300">{USER_LABELS.COMPANY}:</span> <span className="text-gray-900 dark:text-white">{item.company?.name}</span></li>
                                    <li><span className="font-medium text-gray-700 dark:text-gray-300">{USER_LABELS.ADDRESS}:</span> <span className="text-gray-900 dark:text-white">{item.address?.street}, {item.address?.suite}</span></li>
                                    <li><span className="font-medium text-gray-700 dark:text-gray-300">City:</span> <span className="text-gray-900 dark:text-white">{item.address?.city}</span></li>
                                    <li><span className="font-medium text-gray-700 dark:text-gray-300">Zipcode:</span> <span className="text-gray-900 dark:text-white">{item.address?.zipcode}</span></li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex space-x-2 mt-4">
                            <button 
                                onClick={handleEdit}
                                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                            >
                                Edit
                            </button>
                            <button 
                                onClick={handleDelete}
                                className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                );
            case RESOURCE_TYPES.TODOS:
                return(
                    <div key={item.id || index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                                <ul className="space-y-1 text-sm">
                                    <li><span className="font-medium text-gray-700 dark:text-gray-300">{TODO_LABELS.ID}:</span> <span className="text-gray-900 dark:text-white">{item.id}</span></li>
                                    <li><span className="font-medium text-gray-700 dark:text-gray-300">{TODO_LABELS.USER_ID}:</span> <span className="text-gray-900 dark:text-white">{item.userId}</span></li>
                                    <li className="flex items-center">
                                        <span className="font-medium text-gray-700 dark:text-gray-300">{TODO_LABELS.COMPLETED}:</span>
                                        <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                                            item.completed 
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                        }`}>
                                            {item.completed ? 'Completed' : 'Pending'}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex space-x-2 ml-4">
                                <button 
                                    onClick={handleEdit}
                                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                                >
                                    Edit
                                </button>
                                <button 
                                    onClick={handleDelete}
                                    className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                );
            case RESOURCE_TYPES.POSTS:
                return(
                    <div key={item.id || index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{item.body}</p>
                                <ul className="space-y-1 text-sm">
                                    <li><span className="font-medium text-gray-700 dark:text-gray-300">{POST_LABELS.ID}:</span> <span className="text-gray-900 dark:text-white">{item.id}</span></li>
                                    <li><span className="font-medium text-gray-700 dark:text-gray-300">{POST_LABELS.USER_ID}:</span> <span className="text-gray-900 dark:text-white">{item.userId}</span></li>
                                </ul>
                            </div>
                            <div className="flex space-x-2 ml-4">
                                <button 
                                    onClick={handleEdit}
                                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                                >
                                    Edit
                                </button>
                                <button 
                                    onClick={handleDelete}
                                    className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                );
            default:
                return(
                    <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4 shadow-sm">
                        <pre className="text-sm overflow-x-auto text-gray-900 dark:text-white">{JSON.stringify(item, null, 2)}</pre>
                    </div>
                );
        }
    }

    // TODO: Implement Client-Side Filtering logic using the 'searchTerm' state and Array.filter().
    const filteredData = Array.isArray(data) 
        ? data.filter(item => {
            if (!searchTerm) return true;
            const searchLower = searchTerm.toLowerCase();
            return Object.values(item).some(value => 
                String(value).toLowerCase().includes(searchLower)
            );
        })
        : data;

    // TODO: Determine the dynamic title for the display based on resource type.
    const resourceType = getResourceType(url);
    const getTitle = () => {
        switch (resourceType) {
            case RESOURCE_TYPES.USERS: return 'Users';
            case RESOURCE_TYPES.TODOS: return 'Todos';
            case RESOURCE_TYPES.POSTS: return 'Posts';
            default: return 'Data';
        }
    };

    return (
        // TODO: Build the main container for DataDisplay.
        // TODO: Apply Tailwind CSS for the container and section title.
        // TODO: Add an input field for client-side filtering, rendered conditionally if data is an array.
        // TODO: Add a "View Raw JSON" button/toggle, rendered conditionally if data exists.
        // TODO: Conditionally render raw JSON or the formatted data based on the toggle.
        // TODO: For lists (arrays), map over filteredData and render each item using renderItem.
        // TODO: For single objects, render the item using renderItem.
        // TODO: Add specific details for nested objects (e.g., address/company for users) if not handled by renderItem.
        // TODO: Apply Tailwind CSS classes throughout all elements.
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {getTitle()} {Array.isArray(data) && `(${filteredData.length} items)`}
                </h2>
                <div className="flex space-x-2">
                    {Array.isArray(data) && (
                        <input
                            type="text"
                            placeholder="Filter data..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                        />
                    )}
                    <button
                        onClick={() => setShowRaw(!showRaw)}
                        className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
                    >
                        {showRaw ? 'View Formatted' : 'View Raw JSON'}
                    </button>
                </div>
            </div>

            {showRaw ? (
                <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200">
                        {JSON.stringify(data, null, 2)}
                    </pre>
                </div>
            ) : (
                <div>
                    {Array.isArray(filteredData) ? (
                        filteredData.map((item, index) => renderItem(item, index))
                    ) : (
                        renderItem(filteredData, 0)
                    )}
                </div>
            )}
        </div>
    );
}
