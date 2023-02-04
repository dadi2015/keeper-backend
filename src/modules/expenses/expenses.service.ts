import { Injectable } from '@nestjs/common';
import { Expenses } from './models/expenses.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRecordExpensesDTO } from './dto';
import { User } from '../user/models/user.model';
import { CategoryService } from '../category/category.service';

@Injectable()
export class ExpensesService {
    constructor(
        @InjectModel(Expenses)
        private readonly expensesRepository: typeof Expenses,
        private readonly categoryService: CategoryService,
    ) {}

    async createRecord(dto: CreateRecordExpensesDTO, user: User) {
        const record = {
            name: dto.name,
            category: dto.category,
            price: dto.price,
            quantity: dto.quantity,
            sum_total: dto.price * dto.quantity,
            user: user.id,
        };
        return this.expensesRepository.create(record);
    }

    async getCategory(category) {
        return new Promise((resolve, reject) => {
            const result = this.categoryService.findCategoryRecord(category);
            resolve(result);
        });
    }

    async getExpensesRecord(user: User) {
        return this.expensesRepository.findAll({
            where: { user: user.id },
        });
    }
}
