import gateway from "@misc/gateway";
import Elysia from "elysia";

export const userController = new Elysia({ prefix: '/user' })
    .guard({
        tags: ['User']
    }, app =>
        app
            // For logined user
            .guard(app =>
                app.use(gateway())
            )
    )