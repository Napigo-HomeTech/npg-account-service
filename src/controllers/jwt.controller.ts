import { RouterContext } from 'koa-router';
import { isEmpty } from 'lodash';
import { createJWTDevToken } from '../services/jwt.service';
import { httpError, HTTP_STATUS } from '../lib/npg-errors';

/**
 *
 * @param ctx
 */
export const jwtController = async (ctx: RouterContext) => {
    const { userId } = ctx.params;

    if (isEmpty(userId)) {
        httpError(ctx, HTTP_STATUS.StatusBadRequest, 'User ID is required');
        return;
    }
    const token = await createJWTDevToken(userId);
    ctx.body = {
        token
    };
};
