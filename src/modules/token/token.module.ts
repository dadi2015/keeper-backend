import { Module } from '@nestjs/common';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: 'jwt',
            property: 'user',
            session: false,
        }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('secret'),
                signOptions: {
                    expiresIn: configService.get<string>('expireJwt'),
                },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [TokenController],
    providers: [TokenService, JwtService],
    exports: [TokenService],
})
export class TokenModule {}
