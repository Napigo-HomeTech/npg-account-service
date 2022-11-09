import { logger } from './lib/npg-logger';
import { Server } from './server';
import Db from './lib/npg-mongo';

export const init = async () => {
    await Db.init();

    /**
     * rest http api
     */
    const server = new Server();
    server.run();
};

/**
 *
 * @param eventType
 */
const cleanupResources = (eventType: string) => {
    logger.warn('Cleaning up resources before existing...');
    switch (eventType) {
        case 'uncaughtException':
            process.exit(99);
        default:
            process.exit(1);
    }
};

/**
 *  handlers for each exiting events
 */
[`SIGINT`, 'uncaughtException'].forEach((eventType) => {
    process.on(eventType, (e) => {
        cleanupResources(eventType);
    });
});
