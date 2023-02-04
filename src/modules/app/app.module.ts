import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../../config/configuration';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../user/models/user.model';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { TokenModule } from '../token/token.module';
import { JwtStrategy } from '../../strategy';
import { CategoryModule } from '../category/category.module';
import { Category } from '../category/models/category.model';
import { Expenses } from '../expenses/models/expenses.model';
import { ExpensesModule } from '../expenses/expenses.module';
import { DefaultCategory } from '../category/models/default-category.model';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { AppSeedModule } from '../seeder/seeder.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        SeederModule.forRoot({
            isGlobal: true,
            logging: true,
            disabled: false,
            runOnlyIfTableIsEmpty: false,
            connection: 'default',
            autoIdFieldName: 'id',
            disableEveryOne: false,
            enableAutoId: true,
            foreignDelay: 2000, // 2 seconds
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
                models: [User, Category, DefaultCategory, Expenses],
            }),
            inject: [ConfigService],
        }),
        UserModule,
        AuthModule,
        TokenModule,
        CategoryModule,
        ExpensesModule,
        AppSeedModule,
    ],
    controllers: [],
    providers: [JwtStrategy],
})
export class AppModule {}
