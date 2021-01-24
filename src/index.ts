import {MikroORM} from '@mikro-orm/core'
import { __prod__ } from './constants'
import mikroOrmConfig from './mikro-orm.config'
import express from 'express'
import {ApolloServer} from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { HelloResolver } from './resolvers/hello'
import { PostResolver } from './resolvers/post'
import {UserResolver} from './resolvers/user'
import redis from "redis"
import session from "express-session"
import connectRedis from 'connect-redis'
import { MyContex } from './MyContex'
import cors from "cors"

const main = async () =>{
    const orm = await MikroORM.init(mikroOrmConfig)
    const app = express()
    const RedisStore = connectRedis(session)
    const redisClient = redis.createClient({host:'redis-19932.c212.ap-south-1-1.ec2.cloud.redislabs.com', port:19932, password:'Or6ZDgAAaQwL7UhZvovjC22TMU69HEgd'})
    app.use(
        cors({
            origin:"http://localhost:3000",
            credentials:true
        }))
    app.use(
        session({
          name:"quid",  
          store: new RedisStore({ client: redisClient,disableTouch:true }),
          secret: 'keyboard cat',
          saveUninitialized:false,
          resave: false,
          cookie:{
              maxAge:1000*60*60*24*365, // 1 Year Age
              httpOnly:true,
              sameSite:"lax", //CSRF
              secure:__prod__ // Cookie only works in HTTPS
          }
        })
      )
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers:[HelloResolver,PostResolver, UserResolver],
            validate:false
        }),
        context:({req,res}):MyContex=>({em:orm.em,req,res})
    })
    apolloServer.applyMiddleware({app,cors:false})
    app.listen(4000, ()=> console.log(`🥳 Server Started Listening 🚀 Graphql Ready`))
}

main().catch((err)=>console.log(err))