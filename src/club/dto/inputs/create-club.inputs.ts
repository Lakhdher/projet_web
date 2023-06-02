import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, ValidationArguments } from "class-validator";
import { clubs } from "src/common/clubs.enum";
import { RequiredFieldErrorMessage } from "src/common/errors";

@InputType()
export class CreateClubInput {
    
    @Field(() => String)
    @IsEnum(clubs,{message: 'wrong club name'})
    @IsNotEmpty(RequiredFieldErrorMessage({targetName: 'clubName'} as ValidationArguments))
    clubName: string;

    @Field(() => String)
    @IsEmail()
    @IsNotEmpty(RequiredFieldErrorMessage({targetName: 'email'} as ValidationArguments))
    email: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    description: string;
}