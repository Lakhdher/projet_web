import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { clubs } from "src/common/clubs.enum";
import { UserRole } from "src/common/user-role.enum";
import { CreateUserDto } from "src/user/dto/create-user.dto";


export class userSubscribeDto extends CreateUserDto{
    @IsNotEmpty()
    password: string;

    @IsOptional()
    @IsEnum(UserRole, {message: 'Invalid role'})
    role: UserRole;

    @IsOptional()
    @IsString()
    @IsEnum(clubs, {message: 'Invalid club'})
    club: string;

    @IsOptional()
    @IsString()
    event: string;

    @IsOptional()
    @IsString()
    post: string;
}