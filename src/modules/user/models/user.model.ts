import { Column, Default, HasMany, Model, Table } from 'sequelize-typescript';
import { Category } from '../../category/models/category.model';
import { Expenses } from '../../expenses/models/expenses.model';

@Table
export class User extends Model {
    @Column
    firstName: string;

    @Column
    lastName: string;

    @Column
    email: string;

    @Column
    password: string;

    @Default(null)
    @Column
    salt: number;

    @Column
    country: string;

    @Column
    city: string;

    @Column
    avatar: string;

    @Default('user')
    @Column
    role: string;

    @HasMany(() => Expenses)
    expenses: Expenses;

    @HasMany(() => Category)
    category: Category;
}
