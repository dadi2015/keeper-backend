import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto, LoginUserDto } from '../user/dto';
import { CreateUserResponse } from '../user/response';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    register(dto: CreateUserDto): Promise<CreateUserResponse> {
        return this.userService.createUser(dto);
    }

    login(dto: LoginUserDto): Promise<CreateUserResponse> {
        return this.userService.loginUser(dto);
    }
}
