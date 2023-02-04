import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class DefaultCategory extends Model {
    @Column
    name: string;

    @Column
    icon: string;
}
