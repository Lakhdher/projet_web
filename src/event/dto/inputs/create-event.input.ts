import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, ValidationArguments } from "class-validator";
import { RequiredFieldErrorMessage } from "src/common/errors";

@InputType()
export class CreateEventInput {
    
    @Field(()=>String)
    @IsString()
    @IsNotEmpty(RequiredFieldErrorMessage({targetName: "title"} as ValidationArguments))
    title: string;

    @Field(()=>String)
    @IsString()
    @IsNotEmpty(RequiredFieldErrorMessage({targetName: "description"} as ValidationArguments))
    description: string;

    @Field(()=>[String])
    @IsNotEmpty(RequiredFieldErrorMessage({targetName: "clubs"} as ValidationArguments))
    clubs: string[];
}
