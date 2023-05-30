import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, Length, Max, MaxLength, Min, MinLength, Validate, ValidationArguments, min } from "class-validator";
import { LengthErrorMessage, RequiredFieldErrorMessage } from "src/common/errors";
import { Sections } from "src/common/section.enum";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty(RequiredFieldErrorMessage({targetName: 'firstname'} as ValidationArguments))
    @MinLength(3,LengthErrorMessage(true,3))
    @MaxLength(10, LengthErrorMessage(false,10))  
    firstname: string;

    @IsString()
    @IsNotEmpty(RequiredFieldErrorMessage({targetName: 'lastname'} as ValidationArguments))
    @MinLength(3,LengthErrorMessage(true,3))
    @MaxLength(10, LengthErrorMessage(false,10))  
    lastname: string;

    @IsString()
    @IsNotEmpty(RequiredFieldErrorMessage({targetName: 'enroll_num'} as ValidationArguments))
    @Length(7,7,{message: 'enroll_num must be 7 characters'})
    enroll_num: string;

    @IsString()
    @IsNotEmpty(RequiredFieldErrorMessage({targetName: 'cin'} as ValidationArguments))
    @Length(8,8,{message: 'cin must be 8 characters'})
    cin: string;

    @IsEmail()
    @IsNotEmpty(RequiredFieldErrorMessage({targetName: 'email'} as ValidationArguments))
    email: string;

    @IsString()
    @IsNotEmpty(RequiredFieldErrorMessage({targetName: 'phone'} as ValidationArguments))
    phone: string;

    @IsString()
    @IsNotEmpty(RequiredFieldErrorMessage({targetName: 'section'} as ValidationArguments))
    @IsEnum(Sections,{message: 'section must be one of these values: IIA, GL, IMI, RT, BIO, CH, MPI, CBA'})
    section: string;

    @IsNumber()
    @IsNotEmpty(RequiredFieldErrorMessage({targetName: 'level'} as ValidationArguments))
    @Min(1, {message: 'level must be greater than 0'})
    @Max(5, {message: 'level must be less than 6'})
    level: number;
    
}