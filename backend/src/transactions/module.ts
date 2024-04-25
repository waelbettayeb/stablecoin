import { Module } from '@nestjs/common';
import { TransactionsController } from './controller';
import { UsersModule } from 'src/users/module';

@Module({
  imports: [UsersModule],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
