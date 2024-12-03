import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import App from './App';

describe('Detailed App Functionality Tests', () => {
    test('Dashboard navigation and movie item clicks', async () => {
        const user = userEvent.setup();
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );
        // Assume token is set for simplicity
        localStorage.setItem('token', 'dummy-token');
        await user.click(screen.getByText('The Dark Knight'));
        expect(screen.getByText('Details for The Dark Knight')).toBeInTheDocument();
    });

    test('Error handling on Details page', async () => {
        // Mock fetch to simulate an error
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve({ error: "Failed to fetch details" }),
            })
        );
        render(
            <MemoryRouter initialEntries={['/details/movie/1']}>
                <App />
            </MemoryRouter>
        );
        expect(await screen.findByText(/Error: Failed to fetch details/i)).toBeInTheDocument();
    });

    test('Successful login', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ token: "dummy-token" }),
            })
        );
        render(
            <MemoryRouter initialEntries={['/login']}>
                <App />
            </MemoryRouter>
        );
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'user' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'pass' } });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));
        expect(localStorage.getItem('token')).toBe('dummy-token');
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });

    test('Unsuccessful login', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve({ error: 'Invalid credentials' }),
            })
        );
        render(
            <MemoryRouter initialEntries={['/login']}>
                <App />
            </MemoryRouter>
        );
        fireEvent.submit(screen.getByRole('button', { name: /login/i }));
        expect(await screen.findByText(/Invalid credentials/i)).toBeInTheDocument();
    });
});

