import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDTO } from './dto';
import { JwtAuthGuard } from '../../guards/jwt-guard';
import { Role } from '../../common/enum/auth';
import { Roles } from '../../decorators/roles.decorator';
import { RolesGuard } from '../../guards/roles.guard';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('create-default-category')
    createDefaultCategory() {
        return this.categoryService.createDefaultCategory();
    }

    @UseGuards(JwtAuthGuard)
    @Post('create-category')
    createCategory(@Body() dto: CreateCategoryDTO, @Req() request) {
        const user = request.user;
        return this.categoryService.createCategory(dto, user);
    }
}
