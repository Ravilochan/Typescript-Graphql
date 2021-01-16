import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM} from "@mikro-orm/core"
import path from "path"
import { User } from "./entities/User";

export default {
    entities:[Post,User],
    migrations:{
        path: path.join(__dirname, './migrations'),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
        // dbName:"lubfnnat",
        // password:"XQeOCvUrWIIqa79Osbm1LtfGn4PhOm5y",
        // clientUrl:"postgres://lubfnnat:XQeOCvUrWIIqa79Osbm1LtfGn4PhOm5y@john.db.elephantsql.com:5432/lubfnnat",
        dbName:"lireddit",
        password:"Pass2020!",
        type:"postgresql",
        debug:!__prod__,
} as Parameters<typeof MikroORM.init>[0]