import { db, glo } from "src"
import { dbCollections } from "./vars"
import { jwt } from "urn-development-pack"
import { getConfig } from "./config"
import { User } from "./type"

export const dbInit = async () => {
    dbCollections.forEach(async col => {
        await db.createCollection(col)
    })
    const adminLoginDetails = {
        username: (Bun.randomUUIDv7().split('-'))[0],
        password: Bun.randomUUIDv7()
    }
    // Write admin account
    const adminObj: User = {
        protected: {
            rotate: 0
        },
        instance: null,
        balance: 0,
        permission: 12000, // Supreme leader 
        status: 0, // 0: normal, 1: banned
        ...adminLoginDetails
    }

    const dbResp = await db.add('User', adminObj)
    if (!dbResp.insertedId) throw new Error("Error when trying to write admin account please figure out what's wrong, then nuke your database and try this command again");
    console.log(`Init-ed! Please remove the env and start again`)
    console.log(`
Username: ${adminLoginDetails.username}
Password: ${adminLoginDetails.password}`)
    process.exit(0)
}

export const dbCheck = async () => {
    const collections = (await db.getCollection()).map(col => col.name)
    dbCollections.forEach(col => {
        if (!collections.includes(col)) throw new Error(`Preflight: Collection ${col} is missing, considering contact tech support.
        Otherwise dump the whole database then re-init with env DBINIT=1`);
    })
}

const cfg = getConfig().cfg

const jwtInstance = jwt({
    secret: cfg.security.jwtsecret,
})

export const jwtexec = jwtInstance['decorator']['jwt']