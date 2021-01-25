import { User } from "../entities/User"
import { MyContex } from "../MyContex"
import {Resolver, InputType, Field, Mutation, Arg, Ctx, ObjectType, Query} from "type-graphql"
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
        @Ctx() {req,em}:MyContex
    ): Promise<UserResponse> {

        if(options.username.length <=2){
            return { errors:[{ field:"username",message:" Username Length must be greater than 2 "}]}
        }

        if(options.password.length <=6){
            return { errors:[{ field:"password",message:" Password Length must be greater than 6 "}]}
        }
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
        try {
            await em.persistAndFlush(hashedUser)
        }
        catch(err){
            return {
                errors:[{ field:"",message:`${err.message}`}]
            }
        }
        // Auto Login 
        req.session.userId = hashedUser.id
        return {
            message:`${options.username} created`,
            user:hashedUser
        }
    }

    @Mutation(()=> UserResponse)
    async login(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() {em, req }:MyContex
    ): Promise<UserResponse> {
        const user = await em.findOne(User, { username:options.username.toLowerCase()})
        if(!user){
            return{
                errors: [{
                    field:"username",
                    message:" Username doesn't exists "
                }]
            }
        }
        const valid = await argon.verify(user.password, options.password);
        if(!valid){
            return{
                errors:[
                    {
                        field:"password",
                        message:" Incorrect Password "
                    }
                ]
            }
        }
        req.session.userId = user.id
        return {user}
    }

    @Query(()=>[User],{nullable: true})
    listUsers(
        @Ctx() {em}:MyContex
    ) : Promise<User[]>{
        return em.find(User,{})
    }

    @Query(()=>User)
    async me(@Ctx(){req,em}:MyContex){
     if(!req.session.userId){
         return null;
     }
     const user = await em.findOne(User,{id:req.session.userId})
     return user;
    }

    }
