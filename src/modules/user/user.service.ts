import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { User } from './models/user.model';
import { LoginUserDto } from './dto';
import { CreateUserResponse } from './response';
import { AppErrors } from '../../common/errors';
import { TokenService } from '../token/token.service';
import { Role } from '../../common/enum/auth';
import { Category } from '../category/models/category.model';
import { Expenses } from '../expenses/models/expenses.model';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private readonly userRepository: typeof User,
        private readonly tokenService: TokenService,
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
        if (!dto.role) dto.role = Role.User;
        await this.userRepository.create(dto);
        return this.publicUser(dto);
    }

    async loginUser(dto: LoginUserDto): Promise<CreateUserResponse> {
        const existUser = await this.userRepository.findOne({
            where: { email: dto.email },
            attributes: { exclude: ['password', 'salt'] },
        });
        if (!existUser) throw new ConflictException(AppErrors.USER_NOT_FOUND);
        return this.publicUser(dto);
    }

    async publicUser(dto): Promise<CreateUserResponse> {
        const user = await this.userRepository.findOne({
            where: { email: dto.email },
            attributes: { exclude: ['password', 'salt'] },
            include: [
                {
                    model: Category,
                    required: false,
                },
                {
                    model: Expenses,
                    required: false,
                },
            ],
        });
        if (!user) throw new ConflictException(AppErrors.USER_NOT_FOUND);
        delete dto.password;
        delete dto.salt;

        const publicData = {
            id: user.id,
            role: user.role,
            name: user.firstName,
            email: user.email,
        };
        const token = await this.tokenService.createJwtToken(publicData);
        return { user, token };
    }
}
