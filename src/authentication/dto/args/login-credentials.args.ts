import { ArgsType, Field } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, ValidationArguments } from "class-validator";
import { RequiredFieldErrorMessage } from "src/common/errors";

@ArgsType()
export class LoginCredentialsArgs {
    @Field(()=>String)
    @IsNotEmpty(RequiredFieldErrorMessage({targetName: 'email'} as ValidationArguments))
    @IsEmail()
    email: string;

    @Field(()=>String)
    @IsNotEmpty(RequiredFieldErrorMessage({targetName: 'password'} as ValidationArguments))
    password: string;
}