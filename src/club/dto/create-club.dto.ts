import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, ValidationArguments } from "class-validator";
import { clubs } from "src/common/clubs.enum";
import { RequiredFieldErrorMessage } from "src/common/errors";

export class CreateClubDto {

    @IsEnum(clubs,{message: 'wrong club name'})
    @IsNotEmpty(RequiredFieldErrorMessage({targetName: 'clubName'} as ValidationArguments))
    clubName: string;

    @IsEmail()
    @IsNotEmpty(RequiredFieldErrorMessage({targetName: 'email'} as ValidationArguments))
    email: string;

    @IsString()
    @IsOptional()
    description: string;

}
