import { Module } from '@nestjs/common';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { SeedUser } from './services/seed-admin-user';

@Module({
    imports: [SeederModule.forFeature([SeedUser])],
})
export class AppSeedModule {}
