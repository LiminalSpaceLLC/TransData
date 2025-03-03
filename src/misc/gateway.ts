import { Elysia } from 'elysia'

export const gateway = () =>
    new Elysia({
        name: '@elysiajs/bearer'
    }).derive({ as: 'scoped' }, async ({ headers }) => {
        const auth = headers['authorization']
        const token = auth?.startsWith('Bearer ') ? auth.slice(7) : null
        if (!token) throw new Error("Invaild Auth");
    })

export default gateway