const client = require('../lib/client');
// import our seed data:
const todos = require('./todos');
const users = require('./users');

run();

async function run() {

    try {
        await client.connect();

        const UserInfo = await Promise.all(
            users.map(async user => {
                const result = await client.query(`
            INSET INTO users (id)
            VALUES ($1)
            RETURNING *;
            `,
                [user]);
                return result.rows[0];
        
            })
        );

        await Promise.all(
            todos.map(todo => {
                const user = UserInfo.find(user => {
                    return user.id === todo.id;
                });
                const userId = user.id;
                return client.query(`
                    INSERT INTO todos ( task, complete, user_id)
                    VALUES ($1, $2, $3);
                `,
                [todo.task, todo.complete, userId]);
            })
        );

        console.log('seed data load complete');
    }
    catch (err) {
        console.log(err);
    }
    finally {
        client.end();
    }
    
}
