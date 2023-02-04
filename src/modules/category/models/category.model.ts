import {
    Column,
    ForeignKey,
    HasMany,
    Model,
    Table,
} from 'sequelize-typescript';
import { Expenses } from '../../expenses/models/expenses.model';
import { User } from '../../user/models/user.model';

@Table
export class Category extends Model {
    @Column
    name: string;

    @Column
    icon: string;

    @HasMany(() => Expenses)
    expenses: Expenses;

    @ForeignKey(() => User)
    user: User;
}
