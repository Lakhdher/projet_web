import { ClubEntity } from "./entities/club.entity";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ClubService } from "./club.service";
// import { GQLUser } from "src/authentication/decorators/user.decorator";
import { GQLJwtAuthGuard } from "src/authentication/guards/gql.jwt.guard";
import { Req, UseGuards } from "@nestjs/common";
import { GetClubArgs } from "./dto/args/get-club.args";
import { UserEntity } from "src/user/entities/user.entity";
import { CreateClubInput } from "./dto/inputs/create-club.inputs";
import { UpdateClubInput } from "./dto/inputs/update-club.input";
import { GQLreq } from "src/authentication/decorators/user.decorator";
@Resolver(()=>ClubEntity)
export class ClubResolver {

    constructor(private readonly clubService: ClubService) {}
    
    // Get all clubs with events
    @Query(()=>[ClubEntity])
    async clubs(){
        return this.clubService.findAllWithEvents();
    }

    // Get all clubs of a user
    @UseGuards(GQLJwtAuthGuard)
    @Query(()=>[ClubEntity])
    async getMyClubs(
        @GQLreq() req
    ){
        return this.clubService.getMyClubs(req.user.userId);
    }

    // Get a club by name
    @Query(()=>ClubEntity)
    async findClubByName(@Args() getClubArgs: GetClubArgs){
        return this.clubService.findByName(getClubArgs.clubName);
    }

    // Get a club by id
    @Query(()=>ClubEntity)
    async findClubById(@Args() getClubArgs: GetClubArgs){
        return this.clubService.findById(getClubArgs.id);
    }

    // Get all members of a club
    @Query(()=>[UserEntity])
    @UseGuards(GQLJwtAuthGuard)
    async getAllMembers(
        @Args() getClubArgs: GetClubArgs,
        @GQLreq() req: Request
        ){
        let club;
        if (getClubArgs.id === undefined){
            club = await this.clubService.findByName(getClubArgs.clubName);
        }else{
            club = await this.clubService.findById(getClubArgs.id);
        }
        return this.clubService.getAllMembers(club.id, req['user']);
    }

    // create a club
    @Mutation(()=>ClubEntity)
    async createClub(@Args('createClubInput') createClubInput: CreateClubInput){
        return this.clubService.create(createClubInput);
    }

    // update a club
    @Mutation(()=>ClubEntity)
    async updateClub(
        @Args() getClubArgs: GetClubArgs,
        @Args('updateClubInput') updateClubInput: UpdateClubInput)
    {
        return this.clubService.update(getClubArgs.id, updateClubInput);
    }

    // delete a club    
    @Mutation(()=>ClubEntity)
    async deleteClub(@Args() getClubArgs: GetClubArgs){
        return this.clubService.delete(getClubArgs.id);
    }

    // remove a member from a club
    @Mutation(()=>ClubEntity)
    @UseGuards(GQLJwtAuthGuard)
    async removeMember(
        @Args() getClubArgs: GetClubArgs,
        @Args('email') email: string,
        @GQLreq() req: Request
        ){
        return this.clubService.removeMember(getClubArgs.id, email, req['user']);
    }

}

