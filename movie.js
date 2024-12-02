import pool from './db.js';

class Movie {
    static async getMovieById(id) {
        const query = {
            text: 'SELECT * FROM movies WHERE id = $1',
            values: [id],
        };

        try {
            const result = await pool.query(query);
            return result.rows[0];
        } catch (err) {
            throw err;
        }
    }

    static async addRating(movieId, userId, rating) {
        const query = {
            text: 'INSERT INTO ratings (movie_id, user_id, rating) VALUES ($1, $2, $3) RETURNING *',
            values: [movieId, userId, rating],
        };

        try {
            const result = await pool.query(query);
            return result.rows[0];
        } catch (err) {
            throw err;
        }
    }

    static async addComment(movieId, userId, comment) {
        const query = {
            text: 'INSERT INTO comments (movie_id, user_id, comment) VALUES ($1, $2, $3) RETURNING *',
            values: [movieId, userId, comment],
        };

        try {
            const result = await pool.query(query);
            return result.rows[0];
        } catch (err) {
            throw err;
        }
    }

    static async getRatingsByMovieId(movieId) {
        const query = {
            text: 'SELECT rating FROM ratings WHERE movie_id = $1',
            values: [movieId],
        };

        try {
            const result = await pool.query(query);
            return result.rows;
        } catch (err) {
            throw err;
        }
    }

    static async getCommentsByMovieId(movieId) {
        const query = {
            text: 'SELECT comment FROM comments WHERE movie_id = $1',
            values: [movieId],
        };

        try {
            const result = await pool.query(query);
            return result.rows;
        } catch (err) {
            throw err;
        }
    }
}

export default Movie;