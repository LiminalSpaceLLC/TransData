import { db } from "src"
import { dbCollections } from "./vars"

export const dbInit = async () => {
    dbCollections.forEach(async col => {
        await db.createCollection(col)
    })

    console.log(`Init-ed! Please remove the env and start again`)
    process.exit(0)
}

export const dbCheck = async () => {
    const collections = (await db.getCollection()).map(col => col.name )
    dbCollections.forEach(col => {
        if (!collections.includes(col)) throw new Error(`Preflight: Collection ${col} is missing, considering contact tech support.
        Otherwise dump the whole database then re-init with env DBINIT=1`);
    })
}