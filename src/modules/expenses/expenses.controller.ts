import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { JwtAuthGuard } from '../../guards/jwt-guard';
import { CreateRecordExpensesDTO } from './dto';

@Controller('expenses')
export class ExpensesController {
    constructor(private readonly expensesService: ExpensesService) {}

    @UseGuards(JwtAuthGuard)
    @Post('create-expenses')
    createExpensesRecord(@Body() dto: CreateRecordExpensesDTO, @Req() request) {
        const user = request.user;
        return this.expensesService.createRecord(dto, user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-expenses')
    getExpensesRecords(@Req() request) {
        const user = request.user;
        return this.expensesService.getExpensesRecord(user);
    }
}
