import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserEntity } from "./entities/user.entity";
import { UserService } from "./user.service";
import { ClubEntity } from "src/club/entities/club.entity";
import { Req, UseGuards } from "@nestjs/common";
import { CreateUserInput } from "./dto/inputs/create-user.input";
import { UpdateUserInput } from "./dto/inputs/update-user.input";
import { GQLJwtAuthGuard } from "src/authentication/guards/gql.jwt.guard";
import { GQLreq } from "src/authentication/decorators/user.decorator";

@Resolver(() => UserEntity)
export class UserResolver {
    constructor(
        private readonly userService: UserService,
    ) {}

    // get all users
    @Query(() => [UserEntity])
    async users() {
        return await this.userService.findAll();
    }

    // get user clubs
    @Query(() => [ClubEntity])
    @UseGuards(GQLJwtAuthGuard)
    async myClubs(
        @GQLreq() req : Request
    ) {
        return await this.userService.getMyClubs(req["user"]);
    }

    // get user info
    @Query(() => UserEntity)
    @UseGuards(GQLJwtAuthGuard)
    async myInfo(
        @GQLreq() req : Request
    ) {
        return await this.userService.getMyInfo(req["user"]);
    }

    // join club
    @Query(() => UserEntity)
    @UseGuards(GQLJwtAuthGuard)
    async joinClub(
        @GQLreq() req : Request,
        @Args('clubId',{type: ()=> Int}) clubId: number,
    ) {
        return await this.userService.joinClub(req["user"], clubId);
    }

    // get user by id
    @Query(() => UserEntity)
    async user(
        @Args('id',{type: ()=> Int}) id: number,
    ) {
        return await this.userService.findById(id);
    }

    // create user
    @Mutation(() => UserEntity)
    async createUser(
        @Args('createUserInput') createUserInput: CreateUserInput
    ){
        return await this.userService.create_v2(createUserInput);
    }

    // update user
    @Mutation(() => UserEntity)
    async updateUser(
        @Args('updateUserInput') updateUserInput: UpdateUserInput,
        @Args('id',{type: ()=> Int}) id: number
    ){
        return await this.userService.update(id, updateUserInput);
    }

    // delete user
    @Mutation(() => UserEntity)
    async deleteUser(
        @Args('id',{type: ()=> Int}) id: number
    ){
        return await this.userService.delete(id);
    }

    
}