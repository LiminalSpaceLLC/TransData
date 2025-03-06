import { jwtexec } from "@misc/helper";
import { User } from "@misc/type";
import { userSchema } from "@schema/user.s";
import { db } from "src";
import { Sch2Ts } from "urn-development-pack";

export const userModel = {
    userSession: {
        post: async (req: Sch2Ts<typeof userSchema.userSession.post>) => {
            // Fetch according to username
            const dbResp = (await db.get<User>('User', { username: req.username }))[0]
            if (!dbResp) throw new Error("User not found");
            // Bump rotate counter
            const bumpResp = await db.upd('User', dbResp._id, {
                protected: {
                    ...dbResp.protected,
                    rotate: dbResp.protected.rotate + 1
                }
            })
            if (bumpResp.modifiedCount<=0) throw new Error("Unable to rotate the counter");
            // Sign token
            return jwtexec.sign( { uid: dbResp._id.toString(), rotate: dbResp.protected.rotate + 1 } )
        }
    }
}