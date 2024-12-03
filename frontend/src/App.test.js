import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect'; // Import this to use toBeInTheDocument
import userEvent from '@testing-library/user-event';
import App from './App';

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
                <MemoryRouter initialEntries={['/login']}>
                    <App />
                </MemoryRouter>
            );
        });
        const headingElement = screen.getByRole('heading', { name: /Login/i });
        expect(headingElement).toBeInTheDocument();
    });
});

describe('App Functionality', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
        global.fetch = jest.fn((url) => {
            if (url.includes('/login')) {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({ token: 'dummy-token' }),
                });
            }
            if (url.includes('/register')) {
                return Promise.resolve({ ok: true });
            }
            if (url.includes('/api/content')) {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({
                        movies: [
                            { id: 1, title: 'Inception' },
                            { id: 2, title: 'The Dark Knight' },
                        ],
                    }),
                });
            }
            if (url.includes('/api/movies/1')) {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({
                        id: 1,
                        title: 'Inception',
                        description: 'A mind-bending thriller',
                        releaseDate: '2010-07-16',
                        rating: 5,
                        comments: [{ userId: 1, comment: 'Great movie!' }],
                    }),
                });
            }
            return Promise.reject(new Error('Not Found'));
        });
    });

    test('allows user to logout from Dashboard', async () => {
        localStorage.setItem('token', 'dummy-token');
        act(() => {
            render(
                <MemoryRouter initialEntries={['/dashboard']}>
                    <App />
                </MemoryRouter>
            );
        });

        const logoutButton = await screen.findByRole('button', { name: /Logout/i });
        await userEvent.click(logoutButton);

        await waitFor(() => {
            expect(localStorage.getItem('token')).toBeNull();
            expect(screen.getByRole('heading', { name: /Login/i })).toBeInTheDocument();
        });
    });

    test('displays movie details correctly', async () => {
        act(() => {
            render(
                <MemoryRouter initialEntries={['/details/movie/1']}>
                    <App />
                </MemoryRouter>
            );
        });

        await waitFor(() => {
            expect(screen.getByText('Inception')).toBeInTheDocument();
            expect(screen.getByText('A mind-bending thriller')).toBeInTheDocument();
            expect(screen.getByText('Release Date: 2010-07-16')).toBeInTheDocument();
        });
    });

    test('register page renders and handles form submission', async () => {
        act(() => {
            render(
                <MemoryRouter initialEntries={['/register']}>
                    <App />
                </MemoryRouter>
            );
        });

        expect(await screen.findByText('Welcome to the app test')).toBeInTheDocument();

        await userEvent.type(screen.getByLabelText(/Username/i), 'newuser');
        await userEvent.type(screen.getByLabelText(/Password/i), 'newpass');
        await userEvent.click(screen.getByRole('button', { name: /Register/i }));

        await waitFor(() => {
            expect(screen.getByRole('heading', { name: /Login/i })).toBeInTheDocument();
        });
    });

    test('interacts on MovieDetails page (rating and commenting)', async () => {
        localStorage.setItem('token', 'dummy-token');
        act(() => {
            render(
                <MemoryRouter initialEntries={['/details/movie/1']}>
                    <App />
                </MemoryRouter>
            );
        });

        await waitFor(() => {
            expect(screen.getByText('Inception')).toBeInTheDocument();
        });

        const ratingInput = screen.getByLabelText(/Rate this movie:/i);
        const commentInput = screen.getByLabelText(/Add a comment:/i);
        const submitButton = screen.getByRole('button', { name: /Submit/i });

        await userEvent.type(ratingInput, '4');
        await userEvent.type(commentInput, 'Amazing movie!');
        await userEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Amazing movie!')).toBeInTheDocument();
        });
    });
});
