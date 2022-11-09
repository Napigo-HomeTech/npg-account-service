import { MongoClient } from 'mongodb';
import 'dotenv/config';
import { logger } from '../npg-logger';

/**
 * The Mongo client container for the entire services
 */
var client: MongoClient;

const init = async () => {
    const URI = process.env.DATABASE_URI || 'mongodb://localhost:27017';
    const DATABASE = process.env.DATABASE_NAME || 'npg-account-db';

    client = new MongoClient(URI);
    try {
        const doc = await client.db(DATABASE).command({ ping: 1 });
        logger.info(`Connected successfully to ${DATABASE} database with response : ${JSON.stringify(doc)}`);
    } finally {
        await client.close();
    }
};

const teardown = async () => {
    await client.close();
};
const getDB = async (): Promise<MongoClient> => {
    if (client) {
        return Promise.resolve(client);
    }
    await init();
    return client;
};

export default {
    init,
    teardown,
    getDB
};
