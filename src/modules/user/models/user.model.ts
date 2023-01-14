import { Column, Default, Model, Table } from 'sequelize-typescript';

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
}
