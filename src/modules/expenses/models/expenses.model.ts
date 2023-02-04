import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Category } from '../../category/models/category.model';
import { User } from '../../user/models/user.model';
import { DataTypes } from 'sequelize';

@Table
export class Expenses extends Model {
    @Column
    name: string;

    @Column({ type: DataTypes.DOUBLE || DataTypes.INTEGER })
    price: number;

    @Column
    quantity: number;

    @Column
    sum_total: number;

    @ForeignKey(() => Category)
    category: unknown;

    @ForeignKey(() => User)
    user: User;
}
