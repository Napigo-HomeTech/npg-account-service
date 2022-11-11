import { RouterContext } from 'koa-router';
import { httpError, HTTP_STATUS } from '../lib/npg-errors';
import { ICSRFQuery } from '../interfaces/ICSRFQuery';
import { auth } from '../lib/npg-firebase';
import { logger } from '../lib/npg-logger';
import { createCSRFToken } from '../services/csrf.service';

const crsfController = async (ctx: RouterContext) => {
    const { id_token } = ctx.request.body as ICSRFQuery;
    try {
        const result = await auth.verifyIdToken(id_token, true);
        const csrfToken = createCSRFToken(result);
        ctx.body = {
            csrfToken
        };
    } catch (err: any) {
        logger.error(err);
        httpError(ctx, HTTP_STATUS.StatusUnauthorized, 'invalid id token');
    }
};

export { crsfController };
