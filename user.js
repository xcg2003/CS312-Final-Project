import pool from './db.js'
const bcrypt = await import('bcrypt');

class User {
    
    static async register(username, email, password) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const query = {
            text: `
                INSERT INTO users (username, email, password)
                VALUES ($1, $2, $3)
                RETURNING *;
            `,
            values: [username, email, hashedPassword],
        };

        try {
        const result = await pool.query(query);
        return result.rows[0];
        } catch (err) {
        throw err;
        }
    }

    static async login(username, password) {
        const query = {
            text: `
                SELECT * FROM users
                WHERE username = $1;
            `,
            values: [username],
        };

        try {
            const result = await pool.query(query);
            const user = result.rows[0];

            if (user && await bcrypt.compare(password, user.password)) {
                return user;
            } else {
                throw new Error('Invalid username or password');
            }
        } catch (err) {
            throw err;
        }
    }
}

export default User;