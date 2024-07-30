// errorHandler.js

export class AppError extends Error {
    constructor(message, type = 'General') {
        super(message);
        this.type = type;
        this.name = 'AppError';
    }
}

export function displayError(error, elementId = 'error-message') {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = error.message;
        errorElement.style.display = 'block';
        setTimeout(() => {
            errorElement.style.display = 'none';
        }, 5000);
    } else {
        console.error('Error:', error.message);
    }
}

export async function handleApiCall(apiFunction, ...args) {
    try {
        return await apiFunction(...args);
    } catch (error) {
        if (error instanceof AppError) {
            displayError(error);
        } else {
            displayError(new AppError('An unexpected error occurred. Please try again.'));
        }
        throw error;
    }
}