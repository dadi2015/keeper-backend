import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { FLOAT } from 'sequelize';

export class CreateRecordExpensesDTO {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNumber()
    category: number;

    @ApiProperty()
    @Type(() => Number)
    @IsNumber()
    price: number;

    @ApiProperty()
    @IsNumber()
    quantity: number;
}
