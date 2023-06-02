import { ArgsType, Field, Int } from "@nestjs/graphql";
import { IsEnum, IsOptional } from "class-validator";
import { clubs } from "src/common/clubs.enum";

@ArgsType()
export class GetClubArgs {
    @Field(() => Int,{nullable: true})
    @IsOptional()
    id: number;

    @Field(() => String,{nullable: true})
    @IsEnum(clubs,{message: 'wrong club name'})
    @IsOptional()
    clubName: string;
}