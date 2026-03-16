import { Context, Filter, Handler, param, Types, UserModel } from 'hydrooj';
export async function apply(ctx: Context) {
    await UserModel.coll.updateOne(
        { uid: 9, domainId: 'system' },
        { $set: { join: true } },
        { upsert: true }
    );
}