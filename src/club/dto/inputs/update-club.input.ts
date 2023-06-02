import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsOptional, IsString } from "class-validator";

@InputType()
export class UpdateClubInput {

    @Field(() => String, { nullable: true })
    @IsEmail()
    @IsOptional()
    email: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    description: string;
}