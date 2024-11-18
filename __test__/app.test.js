import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect'; // For better assertions
import App from './App';

describe('App Functionality and Routing', () => {
    test('App initializes without crashing', () => {
        act(() => {
            render(
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            );
        });
        const navbar = screen.getByRole('navigation'); // Example: Check for a navigation element
        expect(navbar).toBeInTheDocument();
    });

    test('renders Login page', () => {
        act(() => {
            render(
                <BrowserRouter initialEntries={['/login']}>
                    <App />
                </BrowserRouter>
            );
        });
        const loginHeading = screen.getByRole('heading', { name: /Login/i });
        expect(loginHeading).toBeInTheDocument();
    });

    test('renders Register page', () => {
        act(() => {
            render(
                <BrowserRouter initialEntries={['/register']}>
                    <App />
                </BrowserRouter>
            );
        });
        const registerHeading = screen.getByRole('heading', { name: /Register/i });
        expect(registerHeading).toBeInTheDocument();
    });

    test('shows 404 page for undefined routes', () => {
        act(() => {
            render(
                <BrowserRouter initialEntries={['/undefined-route']}>
                    <App />
                </BrowserRouter>
            );
        });
        const notFoundText = screen.getByText(/404 - Page Not Found/i);
        expect(notFoundText).toBeInTheDocument();
    });
});
