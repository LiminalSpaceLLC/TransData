import { t } from "elysia";

const passwordAndUsername = {
    username: t.String(),
    password: t.String()
}

export const userSchema = {
    userObject: {
        post: t.Object(passwordAndUsername)
    },
    userSession: {
        post: t.Object(passwordAndUsername)
    }
}