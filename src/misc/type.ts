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
    security: {
        jwtsecret: string
    }
    email: {
        smtp: {
            host: string
            port: number
            username: string
            password: string
            sender: string
        }
    }
}

/**
 * 
 * Runtime interfaces sit here
 * 
 */

export interface Model {
    permission: number,
    func: ((...args: any) => Promise<any>)
}

/**
 * User
 */

interface UserProtectedContact {
    str: string
    verified: boolean
}

export interface User extends Sch2Ts<typeof userSchema.userObject.post> {
    protected: {
        rotate: number,
        contact?: Record<string, UserProtectedContact> & {
            email: UserProtectedContact
        }
    },
    instance: null // Unfinished ProtoSchema
    balance: number
    permission: number // Depends on modules
    status: number // 0: normal, 1: banned 
}