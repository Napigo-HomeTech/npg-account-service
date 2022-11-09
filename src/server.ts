import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import koaHelmet from 'koa-helmet';
import { IPort } from 'src/interfaces/IPort';
import { logger } from './lib/npg-logger';
import serviceRoutes from './routes/service.routes';
import jwtRoutes from './routes/jwt.routes';
import { AppConfig } from './configs/app-config';

export class Server implements IPort {
    /**
     *
     */
    run() {
        const app = new Koa();

        app.use(bodyParser());
        app.use(koaHelmet());

        /**
         * Register all group of routes
         */
        this._addRoutes(app, serviceRoutes);
        this._addRoutes(app, jwtRoutes);

        const servicePort = AppConfig.SERVICE.port;
        const serviceName = AppConfig.SERVICE.name;

        app.listen(servicePort).addListener('listening', () => {
            logger.info(`${serviceName} - REST listening on port : ${servicePort}`);
        });
    }

    /**
     * internal helper function to add routes modules to the koa app
     * @param app
     * @param router
     */
    _addRoutes(app: Koa, router: Router) {
        app.use(router.routes());
        router.stack.forEach((r: Router.Layer) => {
            logger.http(`Added rest route: [${r.methods}] ${r.path}`);
        });
    }
}
