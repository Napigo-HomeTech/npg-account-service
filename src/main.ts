import 'dotenv/config';
import { init } from './initializer';
import { preload } from './preload';

preload()
    .then(async () => {
        await init();
    })
    .catch((err: Error) => {
        console.error(err);
    });
