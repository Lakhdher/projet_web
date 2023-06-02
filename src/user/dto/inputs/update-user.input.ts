import { Field, InputType, Int } from "@nestjs/graphql";
import { IsEmail, IsEnum, IsNumber, IsString, Length, Max, MaxLength, Min, MinLength } from "class-validator";
import { LengthErrorMessage } from "src/common/errors";
import { Sections } from "src/common/section.enum";

@InputType()
export class UpdateUserInput {

    @Field(()=>String, {nullable: true})
    @IsString()
    @MinLength(3,LengthErrorMessage(true,3))
    @MaxLength(10, LengthErrorMessage(false,10))  
    firstname: string;

    @Field(()=>String, {nullable: true})
    @IsString()
    @MinLength(3,LengthErrorMessage(true,3))
    @MaxLength(10, LengthErrorMessage(false,10))  
    lastname: string;

    @Field(()=>String, {nullable: true})
    @IsString()
    @Length(7,7,{message: 'enroll_num must be 7 characters'})
    enroll_num: string;

    @Field(()=>String, {nullable: true})
    @IsString()
    @Length(8,8,{message: 'cin must be 8 characters'})
    cin: string;

    @Field(()=>String, {nullable: true})
    @IsEmail()
    email: string;

    @Field(()=>String, {nullable: true})
    @IsString()
    phone: string;

    @Field(()=>String, {nullable: true})
    @IsString()
    @IsEnum(Sections,{message: 'section must be one of these values: IIA, GL, IMI, RT, BIO, CH, MPI, CBA'})
    section: string;

    @Field(()=>Int, {nullable: true})
    @IsNumber()
    @Min(1, {message: 'level must be greater than 0'})
    @Max(5, {message: 'level must be less than 6'})
    level: number;
}