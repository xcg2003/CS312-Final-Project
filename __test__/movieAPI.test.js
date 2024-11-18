import { searchMovieDatabase, popularMovies, popularTVShows } from './movieDbFunctions';

global.fetch = jest.fn();

describe('MovieDB API Functions', () => {
  beforeEach(() => {
    fetch.mockClear(); // Clear the mock for each test
  });

  test('searchMovieDatabase should return a list of search results', async () => {
    const mockResults = [
      { id: 1, title: 'Movie 1', media_type: 'movie' },
      { id: 2, title: 'TV Show 1', media_type: 'tv' },
    ];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({ results: mockResults }),
    });

    const results = await searchMovieDatabase('Movie 1');
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('https://api.themoviedb.org/3/search/multi'),
      expect.objectContaining({ method: 'GET' })
    );
    expect(results).toEqual(mockResults);
  });

  test('popularMovies should return a list of popular movies', async () => {
    const mockResults = [
      { id: 1, title: 'Popular Movie 1' },
      { id: 2, title: 'Popular Movie 2' },
    ];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({ results: mockResults }),
    });

    const results = await popularMovies();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('https://api.themoviedb.org/3/movie/popular'),
      expect.objectContaining({ method: 'GET' })
    );
    expect(results).toEqual(mockResults);
  });

  test('popularTVShows should return a list of popular TV shows', async () => {
    const mockResults = [
      { id: 1, name: 'Popular TV Show 1' },
      { id: 2, name: 'Popular TV Show 2' },
    ];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({ results: mockResults }),
    });

    const results = await popularTVShows();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('https://api.themoviedb.org/3/tv/popular'),
      expect.objectContaining({ method: 'GET' })
    );
    expect(results).toEqual(mockResults);
  });

  test('should handle API errors gracefully', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    const results = await searchMovieDatabase('Invalid Query');
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(results).toBeUndefined(); // Function returns nothing on error
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Response Status: 500'));
    consoleSpy.mockRestore();
  });
});
