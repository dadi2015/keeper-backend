import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DefaultCategory } from './models/default-category.model';
import { CreateCategoryDTO } from './dto';
import { Category } from './models/category.model';
import { User } from '../user/models/user.model';
import { defaultCategoryData } from '../../common/moks/category';
import { AppMessage } from '../../common/constants/messages';
import { AppErrors } from '../../common/errors';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(DefaultCategory)
        private readonly defaultCategoryRepository: typeof DefaultCategory,
        @InjectModel(Category)
        private readonly categoryRepository: typeof Category,
        private readonly logger: Logger,
    ) {}

    async createDefaultCategory() {
        const defaultCategory = await this.defaultCategoryRepository.findAll();
        const filteredDefaultCategoryData = defaultCategoryData.filter(
            ({ name: nameOne }) =>
                !defaultCategory.some(
                    ({ name: nameTwo }) => nameTwo === nameOne,
                ),
        );
        filteredDefaultCategoryData.forEach((element) => {
            return this.defaultCategoryRepository.create(element);
        });
        this.logger.debug(AppMessage.DefaultCategoryCreated);
        return filteredDefaultCategoryData;
    }

    async createCategory(
        dto: CreateCategoryDTO,
        user: User,
    ): Promise<CreateCategoryDTO> {
        const existCategory = await this.categoryRepository.findOne({
            where: { name: dto.name, user: user.id },
        });
        if (existCategory)
            throw new ConflictException(AppErrors.CATEGORY_EXIST);
        const categoryData = {
            name: dto.name,
            icon: dto.icon,
            user: user.id,
        };
        return this.categoryRepository.create(categoryData);
    }
}
