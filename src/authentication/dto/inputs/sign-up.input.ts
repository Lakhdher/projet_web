import { Field, InputType } from "@nestjs/graphql";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { clubs } from "src/common/clubs.enum";
import { UserRole } from "src/common/user-role.enum";
import { CreateUserInput } from "src/user/dto/inputs/create-user.input";

@InputType()
export class UserSubscribeInput extends CreateUserInput{
    
    @Field(()=>String)
    @IsNotEmpty()
    password: string;

    @Field(()=>String,{nullable: true})
    @IsOptional()
    @IsEnum(UserRole, {message: 'Invalid role'})
    role: UserRole;

    @Field(()=>String,{nullable: true})
    @IsOptional()
    @IsString()
    @IsEnum(clubs, {message: 'Invalid club'})
    club: string;

    @Field(()=>String,{nullable: true})
    @IsOptional()
    @IsString()
    event: string;

    @Field(()=>String,{nullable: true})
    @IsOptional()
    @IsString()
    post: string;
}