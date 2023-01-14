import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from '../user/dto';
import { CreateUserResponse } from '../user/response';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(@Body() dto: CreateUserDto): Promise<CreateUserResponse> {
        return this.authService.register(dto);
    }

    @Post('login')
    login(@Body() dto: LoginUserDto): Promise<CreateUserResponse> {
        return this.authService.login(dto);
    }
}
