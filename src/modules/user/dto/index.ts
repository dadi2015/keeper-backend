import { IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsString()
    country: string;

    @IsString()
    city: string;

    @IsString()
    avatar: string;
}

export class LoginUserDto {
    @IsString()
    email: string;

    @IsString()
    password: string;
}
