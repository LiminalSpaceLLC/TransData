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