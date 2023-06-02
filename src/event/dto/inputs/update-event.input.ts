import { Field, InputType } from "@nestjs/graphql";
import { IsString } from "class-validator";

@InputType()
export class UpdateEventInput {
    
    @Field(()=>String)
    @IsString()
    title: string;

    @Field(()=>String)
    @IsString()
    description: string;

    @Field(()=>[String], {nullable: true})
    clubs: string[];
}
