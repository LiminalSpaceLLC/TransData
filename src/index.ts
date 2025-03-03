import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { Logestic } from "logestic";
import cfgRaw from '../config.toml'
import { Config } from "@misc/type";
import { connectDatabase, Dbi } from "databridge-pack";
import { dbCheck, dbInit } from "@misc/helper";

/**
 * 
 * Preflight Stage
 * Checking for System Status
 * 
 */

const cfg = cfgRaw as Config
const env = Bun.env


if (cfg.system.debug) console.log(cfgRaw);
if (cfg.system.debug) console.log(env);

export const db = new Dbi(cfg.database.dbName, await connectDatabase(cfg.database.mongodb))

if (env.DBINIT === '1') await dbInit()

await dbCheck()


const app = new Elysia()
  .use(swagger())
  .onError(({ error, set }) => {
    if (set.status === 500) {
      return `${error}`
    }
    return {
      //@ts-ignore
      status: error.status,
      msg: `${error}`
    }
  })
  .mapResponse(({ response, set, path }) => {
    if (path.includes('/swagger')) return;
    return new Response(
      JSON.stringify({
        status: set.status,
        ...(set.status !== 500 ? { data: response } : { msg: response })
      }),
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }
    )
  })
  .guard((app) =>
    app
      .use(Logestic.preset('fancy'))
  )
  .listen(cfg.server)

console.log(
  `TransData is running at ${app.server?.hostname}:${app.server?.port}

----------------------------------------------------------------------
| A LiminalSpace Inc. Product // Contact us at (zh.)liminalspace.top |
|                       Made In Quảng Châu                           |
----------------------------------------------------------------------

Swagger: http://${app.server?.hostname}:${app.server?.port}/swagger
API: http://${app.server?.hostname}:${app.server?.port}`
);
