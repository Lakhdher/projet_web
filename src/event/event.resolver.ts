import { Args, Int, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { EventService } from "./event.service";
import { EventEntity } from "./entities/event.entity";
import { UpdateEventInput } from "./dto/inputs/update-event.input";
import { Inject, UseGuards } from "@nestjs/common";
import { GQLJwtAuthGuard } from "src/authentication/guards/gql.jwt.guard";
import { CreateEventInput } from "./dto/inputs/create-event.input";
import { PubSub } from "graphql-subscriptions";
import { GQLreq } from "src/authentication/decorators/user.decorator";

@Resolver(()=>EventEntity)
export class EventResolver{
    constructor(
        private readonly eventService: EventService,
        @Inject('PUB_SUB') private pubSub: PubSub,
    ){}

    @Mutation(()=>EventEntity)
    @UseGuards(GQLJwtAuthGuard)
    async createEvent(
        @Args('createEventInput') createEventInput: CreateEventInput,
        @GQLreq() req: Request
      ) {
      const event = await this.eventService.create_v2(createEventInput, req['user']);
      this.pubSub.publish('eventAdded', { eventAdded: event });
      return event;
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
      const event = await this.eventService.update(id, updateEventInput);
      this.pubSub.publish('eventUpdated', { eventUpdated: event });
      return event;
    }
  
    @Query(()=>EventEntity)
    async delete(
        @Args('id',{type: ()=> Int}) id: number
        ) {
      const event = await this.eventService.findById(id);
      const deletedResult = await this.eventService.delete(id);
      if(deletedResult.affected === 1) {
        this.pubSub.publish('eventDeleted', { eventDeleted: event });
      }
      return event;
    }
    //Subscription for event by id
    @Subscription(()=>EventEntity, {
        filter: (payload, variables) => {
          const { eventAdded, eventUpdated, eventDeleted } = payload;
          return [eventAdded, eventUpdated, eventDeleted].some(event => event.id === variables.id);
        }}
    )
    subscribeToEventById(
        @Args('id',{type: ()=> Int}) id: number
    ) {
        return this.pubSub.asyncIterator(['eventAdded', 'eventUpdated', 'eventDeleted']);
    }

    //Subscription for all events of a club
    @Subscription(()=>EventEntity, {
        filter: (payload, variables) => {
          const events = [payload.eventAdded, payload.eventUpdated, payload.eventDeleted];
          return events.some(event => event.clubs.some(club => club.clubName === variables.clubName));
        }
    })
    subscribeToEventByClubName(
        @Args('clubName') clubName: string
    ) {
        return this.pubSub.asyncIterator(['eventAdded', 'eventUpdated', 'eventDeleted']);
    }
}