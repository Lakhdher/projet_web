import { IsEmail, IsNotEmpty, ValidationArguments } from "class-validator";
import { RequiredFieldErrorMessage } from "src/common/errors";


export class loginCredentialsDto {
    @IsNotEmpty(RequiredFieldErrorMessage({targetName: 'email'} as ValidationArguments))
    @IsEmail()
    email: string;

    @IsNotEmpty(RequiredFieldErrorMessage({targetName: 'password'} as ValidationArguments))
    password: string;
}