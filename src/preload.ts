import { init, logger } from './lib/npg-logger';

const _setupServerEnvironment = async () => {
    init();
    logger.info('Logger setup is done');
};

export const preload = async () => {
    await _setupServerEnvironment();
};
