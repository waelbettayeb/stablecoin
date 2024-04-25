import { Module } from '@nestjs/common';
import { TransactionsController } from './controller';
import { TransactionsService } from './service';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
