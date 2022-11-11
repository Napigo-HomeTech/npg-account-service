import { Next } from 'koa';
import { RouterContext } from 'koa-router';
import { httpError, HTTP_STATUS } from 'src/lib/npg-errors';
import { logger } from 'src/lib/npg-logger';
import { applicationDefault } from 'firebase-admin/app';

/**
 * This middleware extract the token issued by firebase to verify its validity,
 * will then ...
 * @param ctx
 * @param next
 */
export const authVerify = (ctx: RouterContext, next: Next) => {
    try {
        const authHeaderValue = ctx.header.authorization;
    } catch (err: any) {
        logger.error(err);
        httpError(ctx, HTTP_STATUS.StatusUnauthorized, 'missing authorization bearer token');
    }
};
