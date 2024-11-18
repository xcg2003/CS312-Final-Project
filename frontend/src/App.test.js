import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect'; // Import this to use toBeInTheDocument
import App from './App';

// ...existing code...

describe('App Initialization', () => {
    test('app starts up without crashing', () => {
        act(() => {
            render(
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            );
        });
    });

    test('renders Login page', () => {
        act(() => {
            render(
                <BrowserRouter initialEntries={['/login']}>
                    <App />
                </BrowserRouter>
            );
        });
        const headingElement = screen.getByRole('heading', { name: /Login/i });
        expect(headingElement).toBeInTheDocument();
    });
});






