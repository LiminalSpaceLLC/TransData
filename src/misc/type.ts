import { userSchema } from "@schema/user.s"
import { Sch2Ts } from "urn-development-pack"

export interface Config {
    system: {
        debug: boolean
    }
    database: {
        mongodb: string
        dbName: string
    }
    server: {
        hostname: string
        listen: number
    }
}

interface UserProtectedContact {
    str: string
    verified: boolean
}

export interface User extends Sch2Ts<typeof userSchema.POST> {
    protected: {
        rotate: number,
        contact?: Record<string, UserProtectedContact> & {
            email: UserProtectedContact
        }
    },
    instance: null, // Unfinished ProtoSchema
    balance: number
}