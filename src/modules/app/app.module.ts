import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../../config/configuration';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../user/models/user.model';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        SequelizeModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                dialect: 'postgres',
                host: configService.get<string>('db_host'),
                port: configService.get<number>('db_port'),
                username: configService.get<string>('db_user'),
                password: configService.get<string>('db_password'),
                database: configService.get<string>('db_name'),
                synchronize: true,
                autoLoadModels: true,
                models: [User],
            }),
            inject: [ConfigService],
        }),
        UserModule,
        AuthModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
