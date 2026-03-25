import { Context, Filter, Handler, param, Types, UserModel } from 'hydrooj';

export async function apply(ctx: Context) {
    ctx.injectUI('Nav', 'docs', (handler: Handler) => ({
        icon: 'info',
        displayName: '程設班官網',
        link: '/homepage/',
    }));
}