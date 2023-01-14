import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { User } from './models/user.model';
import { CreateUserDto, LoginUserDto } from './dto';
import { CreateUserResponse } from './response';
import { AppErrors } from '../../common/errors';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private readonly userRepository: typeof User,
    ) {}

    async hashPassword(password: string, salt: number) {
        return bcrypt.hash(password, salt);
    }

    async createUser(dto): Promise<CreateUserResponse> {
        const existUser = await this.userRepository.findOne({
            where: { email: dto.email },
        });
        if (existUser) throw new ConflictException(AppErrors.USER_EXIST);
        const salt = Math.floor(Math.random() * 10) + 1;
        dto.password = await this.hashPassword(dto.password, salt);
        dto.salt = salt;
        await this.userRepository.create(dto);
        return this.publicUser(dto.email);
    }

    async loginUser(dto: LoginUserDto): Promise<CreateUserResponse> {
        const existUser = await this.userRepository.findOne({
            where: { email: dto.email },
            attributes: { exclude: ['password', 'salt'] },
        });
        if (!existUser) throw new ConflictException(AppErrors.USER_NOT_FOUND);
        return this.publicUser(dto.email);
    }

    async publicUser(email: string): Promise<CreateUserResponse> {
        const existUser = await this.userRepository.findOne({
            where: { email },
            attributes: { exclude: ['password', 'salt'] },
        });
        if (!existUser) throw new ConflictException(AppErrors.USER_NOT_FOUND);
        return existUser;
    }
}
