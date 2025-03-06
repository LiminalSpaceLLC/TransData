import gateway from "@misc/gateway";
import { userModel } from "@model/user.m";
import { userSchema } from "@schema/user.s";
import Elysia from "elysia";

export const userController = new Elysia({ prefix: '/user' })
    .guard({
        detail: {
            tags: ['User'],
            permission: 0
        }
    }, app =>
        app
            // For logined user
            .guard(app =>
                app
                    .use(gateway())
            )
            // Guest
            .post('/session', async (req) => userModel.userSession.post(req.body), {
                body: userSchema.userSession.post
            })
    )