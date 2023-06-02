import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { EventService } from "./event.service";
import { EventEntity } from "./entities/event.entity";
import { UpdateEventInput } from "./dto/inputs/update-event.input";
import { Req, UseGuards } from "@nestjs/common";
import { GQLJwtAuthGuard } from "src/authentication/guards/gql.jwt.guard";
import { CreateEventInput } from "./dto/inputs/create-event.input";

@Resolver(()=>EventEntity)
export class EventResolver{
    constructor(
        private readonly eventService: EventService
    ){}

    @Mutation(()=>EventEntity)
    @UseGuards(GQLJwtAuthGuard)
    async create(
        @Args('createEventInput') createEventInput: CreateEventInput,
        @Req() req: Request
      ) {
      return await this.eventService.create_v2(createEventInput, req['user']);
    }
  
    @Query(()=>[EventEntity])
    async events( 
    ) {
      return await this.eventService.getAll();
    }
    
    @Query(()=>EventEntity)
    async findOne(
        @Args('id',{type: ()=> Int}) id: number
        ) {
      return await this.eventService.findById(id);
    }
  
    @Query(()=>EventEntity)
    async update(
        @Args('id',{type: ()=> Int}) id: number,
        @Args('updateEventInput') updateEventInput: UpdateEventInput
        ) {
      return await this.eventService.update(id, updateEventInput);
    }
  
    @Query(()=>EventEntity)
    async delete(
        @Args('id',{type: ()=> Int}) id: number
        ) {
      return await this.eventService.delete(id);
    }
}