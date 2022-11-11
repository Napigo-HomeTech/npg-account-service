import Router from 'koa-router';
import { jwtController } from '../controllers/jwt.controller';

const router = new Router({ prefix: '/jwt' });
/**
 * Use this endpoint only for dev testing purpose !!!
 */
router.get('/create-dev/:userId', jwtController);

export default router;
