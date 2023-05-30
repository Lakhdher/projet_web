import { IsNotEmpty, IsNumber, IsString, Max, MaxLength, MinLength, ValidationArguments } from "class-validator";
import { LengthErrorMessage, RequiredFieldErrorMessage } from "src/common/errors";


export class CreateCommiteePostDto {
    
    @IsNotEmpty(RequiredFieldErrorMessage({targetName: "title"} as ValidationArguments))
    @MinLength(5, LengthErrorMessage(true, 3))
    @MaxLength(100, LengthErrorMessage(false, 100))
    @IsString()
    title: string;

    @IsNumber()
    committeeId: number;

    @IsNumber()
    clubId: number;
}
