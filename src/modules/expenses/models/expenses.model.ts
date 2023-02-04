import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Category } from '../../category/models/category.model';
import { User } from '../../user/models/user.model';

@Table
export class Expenses extends Model {
    @Column
    name: string;

    @ForeignKey(() => Category)
    category: Category;

    @ForeignKey(() => User)
    user: User;
}
