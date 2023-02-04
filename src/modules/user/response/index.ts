import { IsString } from 'class-validator';

export class CreateUserResponse {
    user: User;

    @IsString()
    token: string;
}

class User {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    email: string;

    @IsString()
    country: string;

    @IsString()
    city: string;

    @IsString()
    avatar: string;
}
