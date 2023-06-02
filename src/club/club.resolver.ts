import { ClubEntity } from "./entities/club.entity";
import { Query, Resolver } from "@nestjs/graphql";
import { ClubService } from "./club.service";
@Resolver(()=>ClubEntity)
export class ClubResolver {

    constructor(private readonly clubService: ClubService) {}

    @Query(()=>[ClubEntity])
    async clubs(){
        return this.clubService.findAllWithEvents();
    }
}

