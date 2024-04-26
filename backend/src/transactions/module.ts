import { Module } from '@nestjs/common';
import { TransactionsController } from './controller';
import { UsersModule } from 'src/users/module';
import { Transaction } from './transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), UsersModule],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
