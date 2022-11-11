import { RouterContext } from 'koa-router';

export const initSessionController = (ctx: RouterContext) => {
    ctx.body = {
        message: 'hello'
    };
};
