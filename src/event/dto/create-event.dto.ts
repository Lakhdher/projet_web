import { IsNotEmpty, IsString, ValidationArguments } from "class-validator";
import { RequiredFieldErrorMessage } from "src/common/errors";
import { Entity } from "typeorm";

@Entity("event")
export class CreateEventDto {
    
    @IsString()
    @IsNotEmpty(RequiredFieldErrorMessage({targetName: "title"} as ValidationArguments))
    title: string;

    @IsString()
    @IsNotEmpty(RequiredFieldErrorMessage({targetName: "description"} as ValidationArguments))
    description: string;

    @IsNotEmpty(RequiredFieldErrorMessage({targetName: "clubs"} as ValidationArguments))
    clubs: string[];
}
