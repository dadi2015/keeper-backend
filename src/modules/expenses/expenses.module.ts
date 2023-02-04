import { Module } from '@nestjs/common';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Expenses } from './models/expenses.model';

@Module({
    imports: [SequelizeModule.forFeature([Expenses])],
    controllers: [ExpensesController],
    providers: [ExpensesService],
})
export class ExpensesModule {}
