import Router from 'koa-router';
import { initSessionController } from '../controllers/user.controller';

const router = new Router({ prefix: '/user' });

router.get('/init-session', initSessionController);

export default router;
