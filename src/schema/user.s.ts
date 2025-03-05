import { t } from "elysia";

export const userSchema = {
    POST: t.Object({
        username: t.String(),
        password: t.String()
    })
}