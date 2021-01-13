import { User } from "../entities/User"
import { MyContex } from "../MyContex"
import {Resolver, InputType, Field, Mutation, Arg, Ctx, ObjectType} from "type-graphql"
import argon from "argon2"

@InputType()
class UsernamePasswordInput{
    @Field()
    username:string
    @Field()
    password:string
}

@ObjectType()
class UserResponse{
    @Field(()=>[FieldError], { nullable:true})
    errors?: FieldError[]
    @Field(()=> User, { nullable:true})
    user?:User
    @Field(()=> String , { nullable: true})
    message?:String
}

@ObjectType()
class FieldError {
    @Field()
    field:String;
    @Field()
    message:string;
}

@Resolver()
export class UserResolver {
    @Mutation(()=> UserResponse)
    async register(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() {em}:MyContex
    ): Promise<UserResponse> {
        const user = await em.findOne(User, { username:options.username.toLowerCase()})
        if(user){
            return{
                errors: [{
                    field:'username',
                    message:" Username already taken "
                }]
            }
        }
        const hashedPassword = await argon.hash(options.password)
        const hashedUser = em.create(User, { username:options.username.toLowerCase(),password:hashedPassword})
        await em.persistAndFlush(hashedUser)
        return {
            message:`${options.username} created`,
            user:hashedUser
    }
    }
    @Mutation(()=> UserResponse)
    async login(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() {em}:MyContex
    ): Promise<UserResponse> {
        const user = await em.findOne(User, { username:options.username.toLowerCase()})
        if(!user){
            return{
                errors: [{
                    field:"username",
                    message:" Username doesn't exits "
                }]
            }
        }
        const validy = await argon.verify(user.password, options.password);
        if(validy){
            return{
                errors:[
                    {
                        field:"password",
                        message:" Incorrect Password "
                    }
                ]
            }
        }
        return {user}
    }
    }
