import { Logger, Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './models/category.model';
import { DefaultCategory } from './models/default-category.model';

@Module({
    imports: [SequelizeModule.forFeature([Category, DefaultCategory])],
    controllers: [CategoryController],
    providers: [CategoryService, Logger],
    exports: [CategoryService],
})
export class CategoryModule {}
