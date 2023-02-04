import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async createJwtToken(payload): Promise<string> {
        return this.jwtService.sign(payload, {
            secret: this.configService.get('secret'),
            expiresIn: this.configService.get<string>('expireJwt'),
        });
    }
}
