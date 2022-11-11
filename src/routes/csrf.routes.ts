import Router from 'koa-router';
import { crsfController } from '../controllers/csrf.controller';

const router = new Router({ prefix: '/csrf' });

router.post('/', crsfController);

export default router;
