// TODO: Import necessary React hooks (useState, useCallback, useRef, useEffect) for API logic.
import { useState, useEffect, useCallback, useRef } from 'react';

// TODO: Define and export the useApi custom hook.
export default function useApi(url, method = 'GET', initialData = null, options = {}) {
    // TODO: Define state for data, loading, and error.
    const [data, setData] = useState(initialData);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // Initial loading state should be false

    // TODO: Use useRef to track the latest request for race condition handling.
    const abortControllerRef = useRef(null);

    // TODO: Define the execute function for making API requests (GET, POST, PUT, PATCH, DELETE).
    // TODO: Use useCallback to memoize the execute function.
    const execute = useCallback(async (payload = null, overrideOptions = {}) => {
        // Abort any ongoing request to prevent race conditions
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        // Create new abort controller for this request
        abortControllerRef.current = new AbortController();

        setLoading(true);
        setError(null);
        // Only clear data for non-GET methods to prevent flicker on re-fetches
        if (method !== 'GET') {
            setData(null);
        }

        const finalUrl = overrideOptions.url || url;
        if (!finalUrl) {
            const missingUrlError = new Error('URL is required for API Call. Provide it to useApi or as overrideOptions.url.');
            setError(missingUrlError);
            setLoading(false);
            throw missingUrlError;
        }

        const fetchConfig = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers, // Merge user-provided headers from useApi call
                ...(overrideOptions.fetchOptions && overrideOptions.fetchOptions.headers), // Merge dynamic headers from execute call
            },
            signal: abortControllerRef.current.signal, // Add abort signal
            ...options, // Merge other user-provided options from useApi call
            ...overrideOptions.fetchOptions, // Merge dynamic options from execute call
        };

        if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
            if (payload) {
                fetchConfig.body = JSON.stringify(payload);
            } else if (method !== 'PATCH') {
                console.warn(`Method ${method} typically requires a payload, but none was provided.`);
            }
        } else if (method === 'DELETE') {
            if (payload) {
                console.warn("DELETE method usually does not send a body. Payload will be ignored.");
            }
            // For DELETE, Content-Type header is often not needed as there's no body
            delete fetchConfig.headers['Content-Type'];
        }
        // GET method does not need a body

        try {
            const response = await fetch(finalUrl, fetchConfig);

            if (!response.ok) {
                let errorData = null;
                try {
                    // Attempt to parse JSON error details from the response body
                    errorData = await response.json();
                } catch (parseError) {
                    // Fallback to status text if JSON parsing fails
                    errorData = response.statusText || `HTTP error! Status: ${response.status}`;
                }
                const apiError = new Error(errorData?.message || errorData?.detail || `API Error: ${errorData}`);
                setError(apiError);
                throw apiError;
            }

            // Handle successful responses that might not have content (e.g., 204 No Content for DELETE/PUT)
            if (response.status === 204 || response.headers.get('Content-Length') === '0') {
                setData(null); // Indicate success with no content
                return null;
            }

            // Parse and set the data for successful responses with content
            const result = await response.json();
            setData(result);
            return result;

        } catch (err) {
            // Don't set error if request was aborted
            if (err.name === 'AbortError') {
                return;
            }
            console.error("API call failed:", err);
            setError(err); // Set the error state
            throw err; // Re-throw to propagate to calling component
        } finally {
            setLoading(false); // Always set loading to false when the request is done
        }

    }, [url, method, options]); // Dependencies for useCallback

    // TODO: Use useEffect for any cleanup if needed.
    useEffect(() => {
        // Cleanup function to abort ongoing requests when component unmounts
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    // TODO: Return the state and execute function from the hook.
    return {
        data,
        loading,
        error,
        execute,
    };
}