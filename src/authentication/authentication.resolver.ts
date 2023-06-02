import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthenticationService } from "./authentication.service";
import { LoginCredentialsArgs } from "./dto/args/login-credentials.args";
import { CredentialsOutput } from "./dto/outputs/credentials.output";
import { UserEntity } from "src/user/entities/user.entity";
import { UserSubscribeInput } from "./dto/inputs/sign-up.input";

@Resolver()
export class AuthenticationResolver{
    constructor(
        private readonly authenticationService : AuthenticationService
    ) {}
    
    @Query(()=>CredentialsOutput)
    async login(
        @Args() loginCredentialsArgs : LoginCredentialsArgs
    ){
        return this.authenticationService.login(loginCredentialsArgs);
    }

    @Mutation(()=> UserEntity)
    async register(
        @Args('userSubscribeInput') userSubscribeInput: UserSubscribeInput
    ){
        return this.authenticationService.register(userSubscribeInput);
    }
}